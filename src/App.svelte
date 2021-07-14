<script lang="ts">
  import Tailwind from './Tailwind.svelte'
  import Accordion from './components/Accordion.svelte'

  import Prenoms from './views/Prenoms.svelte'
  import DateHeureNaissance from './views/DateHeureNaissance.svelte'
  import TaillePoids from './views/TaillePoids.svelte'

  const Sections = { Prenoms, DateHeureNaissance, TaillePoids }
  
  import prono from './stores/pronostics'
</script>

<Tailwind/>

<main>
  <div class="w-full md:w-3/5 mx-auto p-8">
    <div class="shadow-md">
      <Accordion expanded={true}>
        <h1 slot="title">Prénoms</h1>
        <Sections.Prenoms bind:prenoms={$prono.prenoms} />
      </Accordion>
      <Accordion>
        <h1 slot="title">Date & Heure de naissance</h1>
        <Sections.DateHeureNaissance bind:dateHeure={$prono.dateHeureNaissance} />
      </Accordion>
      <Accordion>
        <h1 slot="title">Taille & Poids</h1>
        <Sections.TaillePoids 
          bind:poids={$prono.poids}
          bind:taille={$prono.taille} />
      </Accordion>
    </div>
  </div>
</main>

<pre>{ JSON.stringify($prono, null, 2) }</pre>

<style>
</style>
