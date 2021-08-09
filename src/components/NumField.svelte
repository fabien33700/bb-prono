<script type="ts">
  // Properties
  /**
   * The current number value
   */
  export let value: number

  /**
   * The width of the input element
   */
  export let width = ''

  /**
   * The minimum value
   */
  export let min = -Infinity

  /**
   * The maximum value
   */
  export let max = +Infinity

  // Event handlers
  const increment = () => value += 1
  const decrement = () => value -= 1

  /**
   * Prevent user from typing non numeric caracter in input
   * @param e The key event
   */
  function keyPressHandler(e: KeyboardEvent) {
    const digits = Array.from('0123456789')
    if (!digits.includes(e.key))
      e.preventDefault()
  }

  // Ensure that the current number value is between min and max
  $: {
    if (value > max) value = max
    if (value < min) value = min
  }
</script>

<div class="block">
  <div class="flex flex-row justify-around text-gray-700 bg-white font-bold text-xl mb-2 m-5 text-center shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
    <button disabled="{value <= min}" on:click={decrement}>&minus;</button>
    <input
      on:keypress={keyPressHandler}
      style="width: {width}"
      type="number" {min} {max} bind:value={value}>
    <button disabled="{value >= max}" on:click={increment}>&plus;</button>
  </div>
</div>

<style lang="postcss">
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    @apply m-0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
    @apply font-bold text-center;
  }

  button:disabled {
    @apply text-gray-300;
  }
</style>
