<script lang="ts">
  import Accordion from './components/Accordion.svelte'
  import * as Sections from './views'
  import prono from './stores/pronostics'



 // const Sections = { Prenoms, DateHeureNaissance, TaillePoids }


</script>

<div class="w-full md:w-3/5 mx-auto p-8">
  <div class="shadow-md">
    <Accordion>
      <h1 slot="title">Prénoms</h1>
      <Sections.Prenoms bind:prenoms={$prono.prenoms} />
    </Accordion>
    <Accordion>
      <h1 slot="title">Date & Heure de naissance</h1>
      <Sections.DateHeureNaissance bind:dateHeure={$prono.dateHeureNaissance} />
    </Accordion>
    <Accordion expanded={true}>
      <h1 slot="title">Taille & Poids</h1>
      <!-- <Sections.TaillePoids /> -->
    </Accordion>
  </div>
</div>

