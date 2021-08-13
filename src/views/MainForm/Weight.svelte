<script type="ts">
  // Components
  import RangeSlider from 'svelte-range-slider-pips'
  import Accordion from 'components/Accordion.svelte'

  // Libraries
  import { formatNumber, round } from 'lib/NumberUtils'
  import { formatWeight, formatWeightRange } from 'lib/FormatUtils'

  // Stores
  import { weight, selectedPage } from 'src/stores'

  // Default values and settings
  const PageIndex = 2
  import {
    MinWeight,
    MaxWeight,
    MaxWeightRange,
  } from 'src/config'

  const sliderOpts = {
    min: MinWeight,
    max: MaxWeight,
    range: true,
    step: 25,
    float: true,
    pips: true,
    pipstep: 4,
    all: 'label',
    formatter: (v: number) => formatNumber(round(v / 1000, 2)),
    handleFormatter: formatWeight,
  }

  const middle = MinWeight + (MaxWeight - MinWeight) / 2
  // Internal state
  $weight = [
    middle - (MaxWeightRange / 2),
    middle + (MaxWeightRange / 2),
  ]

  // Reactive state
  $: valid = !MaxWeightRange || ($weight[1] - $weight[0] <= MaxWeightRange)
  $: lightColor = valid ? 'hsl(134, 61%, 50%)' : 'hsl(0, 61%, 50%)'
  $: darkColor = valid ? 'hsl(134, 61%, 35%)' : 'hsl(0, 61%, 35%)'

</script>

<Accordion
  expanded={$selectedPage === PageIndex}
  on:expand={() => $selectedPage = PageIndex}
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
  <div class="text-red-700 text-sm">
    ⚠️ <em>La fourchette de poids ne peut pas excéder {formatWeight(MaxWeightRange)}.</em>
  </div>
  {/if}
</Accordion>
