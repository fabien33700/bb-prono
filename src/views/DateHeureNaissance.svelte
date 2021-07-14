<script lang="ts">
  import Select from '../components/Select.svelte'
  import NumField from '../components/NumField.svelte'
  
  import { getNbreJour, nomsMois } from '../lib/date-utils'

  let jour = 1
  let mois = 1
  let annee = new Date().getUTCFullYear()
  let heure = 0
  let minutes = 0
  let nombreJours: number

  export let dateHeure: Date

  $: nombreJours = getNbreJour(mois, annee)
  $: dateHeure = new Date(Date.UTC(annee, mois, jour, heure, minutes))

</script>

<div class="flex flex-row items-center">
  <!-- Jour du mois -->
  <h3>Jour</h3>
  <NumField 
    bind:value={jour} 
    bind:max={nombreJours}
    width={"50px"}
    min={1}
  />
  <!-- Mois de l'année -->
  <h3>Mois</h3>
  <Select 
    bind:selected={mois}
    items={nomsMois}
  /> 
  <!-- Année -->
  <h3>Année</h3>
  <NumField 
    bind:value={annee} 
    width="100px"
    min={1900}
    max={new Date().getUTCFullYear() + 1}
  />
</div>

<div class="flex flex-row items-center">
  <!-- Heure -->
  <h3>Heure</h3>
  <NumField 
    bind:value={heure} 
    width={"50px"}
    min={0}
    max={23}
  />
  <!-- Minutes -->
  <h3>Minutes</h3>
  <NumField 
    bind:value={minutes} 
    width={"50px"}
    min={0}
    max={59}
  />
</div>

<style>
 
</style>
