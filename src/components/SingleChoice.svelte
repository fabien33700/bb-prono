<script type="ts">
  // Properties

  /**
   * The array containing all the items
   */
  export let items: string[] = []

  /**
   * The selected item
   */
  export let selected: string = null

  // Internal state
  let position: number = items.indexOf(selected)
  let empty: boolean
  let atBegin: boolean
  let atEnd: boolean

  function nextItem() {
    if (!atEnd) selected = items[++position]
  }

  function previousItem() {
    if (!atBegin) selected = items[--position]
  }

  // Reactive state
  $: {
    empty = !items?.length
    atBegin = !empty && position === 0
    atEnd = !empty && position === items.length - 1
  }
</script>

<div class="block">
  <div class="flex flex-row justify-around text-gray-700 bg-white font-bold text-xl mb-2 m-5 text-center shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
    <button disabled="{atBegin}" on:click={previousItem}>&lt;</button>
    <input
      readonly
      type="text" value={selected} />
    <button disabled="{atEnd}" on:click={nextItem}>&gt;</button>
  </div>
</div>

<style lang="postcss">
  input[type="text"] {
    @apply font-bold text-center;
    width: 125px;
  }

  button:disabled {
    @apply text-gray-300;
  }
</style>
