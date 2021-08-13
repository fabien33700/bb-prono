<script lang="ts">
  import axios from 'axios'
  import type { Prognostic } from 'src/model/prognostic'
  import { formatFirstNames, formatSizeRange, formatWeightRange } from 'lib/FormatUtils'
  import { formatLongDateTime, parseISODateTime } from 'lib/DateUtils'
  import { onMount } from 'svelte';

  let promise: Promise<Prognostic[]> = Promise.resolve(null)

  onMount(() => {
    promise = fetchPrognostics()
  })

  async function fetchPrognostics(): Promise<Prognostic[]> {
    const response = await axios.get('/prognostics')
    const parsedata = response.data.map((p) => ({
      ...p,
      birthDateTime: parseISODateTime(p.birthDateTime),
      submitDate: parseISODateTime(p.submitDate),
    }) as Prognostic)
    console.log(parsedata);
    return parsedata
  }

</script>

<table class="table table-auto w-full">
  <thead>
    <tr>
      <th>Auteur</th>
      <th>Prénom(s)</th>
      <th>Date/Heure de naissance</th>
      <th>Poids</th>
      <th>Taille</th>
      <th>Message laissé</th>
    </tr>
  </thead>
  <tbody>
    {#await promise}
      <tr>
        <td colspan="6">
          <em>Chargement en cours ...</em>
        </td>
      </tr>
    {:then prognostics}
      {#if prognostics?.length > 0}
        {#each prognostics as p}
        <tr>
          <td>
            {p.author} le <em>{formatLongDateTime(p.submitDate)}</em>
          </td>
          <td>
            {#if p?.firstNames}
              {@html formatFirstNames(p.firstNames)}
            {/if}
          </td>
          <td>
            {#if p?.birthDateTime}
              {@html formatLongDateTime(p.birthDateTime)}
            {/if}
          </td>
          <td>
            {#if p?.weight}
              {@html formatWeightRange(p.weight)}
            {/if}
          </td>
          <td>
            {#if p?.size}
              {@html formatSizeRange(p.size)}
            {/if}
          </td>
          <td>
            {p?.messageText ?? ''}
          </td>
        </tr>
        {/each}
      {:else}
        <tr>
          <td colspan="6">
            <em>Aucun résultat pour l'instant</em>
          </td>
        </tr>
      {/if}
    {/await}

  </tbody>
</table>
