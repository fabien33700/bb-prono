<script type="ts">
  import TextField from "../components/TextField.svelte"

  export let prenoms = [null, null, null]
  const labels = ['Premier', 'Deuxième', 'Troisième']
</script>

<h2>Prénoms :</h2>
<div class="flex flex-row justify-between">
  {#each prenoms as prenom, i}
    <TextField
      placeholder="{labels[i]} prono"
      bind:value={prenom} />
  {/each}
</div>
