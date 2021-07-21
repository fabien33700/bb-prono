<script lang="ts">
  import Accordion from './components/Accordion.svelte'

  import Prenoms from './views/Prenoms.svelte'
  import DateHeureNaissance from './views/DateHeureNaissance.svelte'
  import Taille from './views/Taille.svelte'
  import Poids from './views/Poids.svelte'

  import prono from './stores/pronostics'
</script>

<div class="shadow-md">
  <Accordion>
    <h1 slot="title">💬 Prénoms</h1>
    <Prenoms bind:prenoms={$prono.prenoms} />
  </Accordion>
  <Accordion>
    <h1 slot="title">📆 Date & Heure de naissance</h1>
    <DateHeureNaissance bind:dateHeure={$prono.dateHeureNaissance} />
  </Accordion>
  <Accordion expanded={true}>
    <h1 slot="title">⚖️ Poids</h1>
    <Poids bind:poids={$prono.poids} />
  </Accordion>
  <Accordion expanded={true}>
    <h1 slot="title">📏 Taille</h1>
    <Taille bind:taille={$prono.taille} />
  </Accordion>
</div>
