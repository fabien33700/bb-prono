<script type="ts">
  // Components
  import Accordion from '../components/Accordion.svelte'
  import TextField from '../components/TextField.svelte'

  // Libraries
  import { formatFirstNames } from '../lib/FormatUtils';

  // Stores
  import { firstNames, selectedPage } from '../stores'

  $firstNames = ['', '', '']
  const pageIndex = 0
</script>

<Accordion
  expanded={$selectedPage === pageIndex}
  on:expand={() => $selectedPage = pageIndex}
  >
  <h1 slot="title">💬 Prénoms</h1>
  <h2 slot="description" class="text-sm italic text-gray-500">{@html formatFirstNames($firstNames)}</h2>
  <div class="flex flex-row justify-between">
    {#each $firstNames as firstName, i}
      <TextField
        placeholder="{i+1}{i == 0 ? 're' : 'è'} proposition"
        bind:value={firstName} />
    {/each}
  </div>
</Accordion>

