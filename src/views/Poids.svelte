<script type="ts">
  // Components
  import RangeSlider from 'svelte-range-slider-pips'
  import Accordion from '../components/Accordion.svelte'

  // Librairies
  import type { Range } from '../lib/number-utils'
  import { formatNumber, round } from '../lib/number-utils'
  import { formatWeight, formatWeightRange } from '../lib/format-utils'

  // Stores
  import { weight, selectedPage } from '../stores'

  // Default values and settings
  const pageIndex = 2
  const weightBounds: Range = [2500, 4500]
  const maximumRange: number = 500

  const sliderOpts = {
    min: weightBounds[0],
    max: weightBounds[1],
    range: true,
    step: 25,
    float: true,
    pips: true,
    pipstep: 4,
    all: 'label',
    formatter: (v: number) => formatNumber(round(v / 1000, 2)),
    handleFormatter: formatWeight,
  }

  const middle = weightBounds[0] + (weightBounds[1] - weightBounds[0]) / 2
  // Internal state
  $weight = [
    middle - (maximumRange / 2),
    middle + (maximumRange / 2),
  ]

  // Reactive state
  $: valid = !maximumRange || ($weight[1] - $weight[0] <= maximumRange)
  $: lightColor = valid ? 'hsl(134, 61%, 50%)' : 'hsl(0, 61%, 50%)'
  $: darkColor = valid ? 'hsl(134, 61%, 35%)' : 'hsl(0, 61%, 35%)'

</script>

<Accordion
  expanded={$selectedPage === pageIndex}
  on:expand={() => $selectedPage = pageIndex}
  >
  <h1 slot="title">⚖️ Poids</h1>
  <h2 slot="description" class="text-sm italic text-gray-500">{@html formatWeightRange($weight)}</h2>

  <div class="flex flex-row w-full items-center">
    <div class="w-full mt-2" style="--range-range: {lightColor}; --range-handle: {darkColor}; --range-handle-focus: {darkColor}; --range-float: {darkColor}">
      <RangeSlider
        bind:values={$weight}
        {...sliderOpts}
      />
    </div>
    <span class="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none">kg</span>
  </div>

  {#if (!valid)}
  <div class="text-red-700 italic text-sm">
    ⚠️ La fourchette de poids ne peut pas excéder {formatWeight(maximumRange)}.
  </div>
  {/if}
</Accordion>
