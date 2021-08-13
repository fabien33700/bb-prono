<script type="ts">
  import type { Prognostic } from 'src/model/prognostic'

  import MarkedText from 'components/MarkedText.svelte'

  // Libraries - Utils
  import {
    formatFirstNames,
    formatSizeRange,
    formatWeightRange,
  } from 'lib/FormatUtils'

  import {
    formatLongDateTime,
    parseISODateTime
  } from 'lib/DateUtils'

  export let prognostic: Prognostic
</script>

<tr class="border-b border-gray-200 hover:bg-gray-100">
  <td class="py-3 px-6 text-left whitespace-nowrap">
    {prognostic.author} le <em>{formatLongDateTime(parseISODateTime(prognostic.submitDate))}</em>
  </td>
  <td class="py-3 px-6 text-center">
    {#if prognostic?.firstNames}
      {@html formatFirstNames(prognostic.firstNames)}
    {/if}
  </td>
  <td class="py-3 px-6 text-center">
    {#if prognostic?.birthDateTime}
      {@html formatLongDateTime(parseISODateTime(prognostic.birthDateTime))}
    {/if}
  </td>
  <td class="py-3 px-6 text-center">
    {#if prognostic?.weight}
      {@html formatWeightRange(prognostic.weight)}
    {/if}
  </td>
  <td class="py-3 px-6 text-center">
    {#if prognostic?.size}
      {@html formatSizeRange(prognostic.size)}
    {/if}
  </td>
  <td class="py-3 px-6 text-center">
    <MarkedText
      text={prognostic?.messageText ?? ''}
      readonly
    />
  </td>
</tr>
