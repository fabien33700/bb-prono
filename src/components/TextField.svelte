<script type="ts">
  // Properties
  /**
   * The textfield value
   */
  export let value: string = null

  /**
   * The textfield placeholder
   */
  export let placeholder = ''

  /**
   * The textfield width (with unit)
   */
  export let width: string = '250px'
</script>

<label
  class="block text-gray-700 text-sm font-bold mb-2 m-5 mx-auto"
  style="width: {width}">
  <input
    class="text-center w-full text-black shadow appearance-none border rounded text-sm py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
    type="text" bind:value={value} placeholder="{placeholder}"
  >
</label>

<style>
  input::placeholder {
    font-style: italic;
    font-weight: normal;
  }
</style>
