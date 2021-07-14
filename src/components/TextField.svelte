<script type="ts">
  export let value
  export let placeholder = ''
</script>

<label class="block text-gray-700 text-sm font-bold mb-2 m-5">
  <input 
      class="text-center shadow appearance-none border rounded w-full text-xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      type="text" bind:value={value} placeholder="{placeholder}"
  >
</label>

<style>
  input::placeholder {
    font-style: italic;
    font-weight: normal;
  }

  input {
    font-weight: bold;
  }
</style>
