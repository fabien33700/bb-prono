<script type="ts">
  import TextField from "../components/TextField.svelte"

  export let prenoms = [null, null, null]
  const labels = ['Premier', 'Deuxième', 'Troisième']
</script>

<h1 class="mb-5">Pronostics sur le ou les prénoms</h1>
<blockquote class="border-l-2 border-blue-600 bg-white p-2 mb-2 border-rad text-justify italic rounded">
  Ici, vous allez pouvoir établir vos pronostics sur le prénom du futur bébé, et si vous le souhaitez, sur un éventuel deuxième ou troisième prénom.
  Bien évidemment, un prévision juste sur le prénom remporte plus de points que pour un deuxième ou troisième prénom.
  Pour chaque prénom, vous pouvez faire jusqu'à 3 propositions, mais sachez que n'en faire qu'une rapporte plus de point en cas de victoire.
</blockquote>

<h2>Prénom :</h2>
<div class="flex flex-row justify-between">
  {#each prenoms as prenom, i}
    <TextField 
      placeholder="{labels[i]} prono"
      bind:value={prenom} />
  {/each}
</div>
