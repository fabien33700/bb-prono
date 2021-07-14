<script type="ts">
  export let selected: number
  export let items = []
</script>

<div class="block">
  <label class="flex flex-row justify-around text-gray-700 bg-white font-bold text-xl mb-2 m-5 text-center shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
    <select class="form-select mt-1 block w-full font-bold" bind:value={selected}>
        {#each items as item, i (i)}
          <option value={i}>{item}</option>
        {/each}
      </select>
    </label>
</div>
