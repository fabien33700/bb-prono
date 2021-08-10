<script type="ts">
  // Components
  import RangeSlider from 'svelte-range-slider-pips'
  import Accordion from '../components/Accordion.svelte'

  // Libraries
  import { formatSizeRange } from '../lib/FormatUtils'
  import type { Range } from '../lib/NumberUtils'

  // Stores
  import { size, selectedPage } from '../stores'

  // Default values and settings
  const PageIndex = 3
  import { MaxSize, MaxSizeRange, MinSize } from '../config'

  const sliderOpts = {
    min: MinSize,
    max: MaxSize,
    range: true,
    step: 1,
    float: true,
    pips: true,
    pipstep: 1,
    all: 'label',
    formatter: (v: number) => v,
    handleFormatter: (v: number) => `${v} cm`,
  }

  const middle = MinSize + (MaxSize - MinSize) / 2
  // Internal state
  $size = [
    middle - (MaxSizeRange / 2),
    middle + (MaxSizeRange / 2),
  ]

  // Reactive state
  $: valid = !MaxSizeRange || ($size[1] - $size[0] <= MaxSizeRange)
  $: lightColor = valid ? 'hsl(134, 61%, 50%)' : 'hsl(0, 61%, 50%)'
  $: darkColor = valid ? 'hsl(134, 61%, 35%)' : 'hsl(0, 61%, 35%)'

</script>

<Accordion
  expanded={$selectedPage === PageIndex}
  on:expand={() => $selectedPage = PageIndex}
  >
  <h1 slot="title">📏 Taille</h1>
  <h2 slot="description" class="text-sm italic text-gray-500">{@html formatSizeRange($size)}</h2>

  <div class="flex flex-row w-full items-center">
    <div class="w-full"  style="--range-range: {lightColor}; --range-handle: {darkColor}; --range-handle-focus: {darkColor}; --range-float: {darkColor}">
      <RangeSlider
        bind:values={$size}
        {...sliderOpts}
      />
    </div>
    <span class="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none">cm</span>
  </div>

  {#if (!valid)}
  <div class="text-red-700 text-sm">
    ⚠️ <em>La fourchette de taille ne peut pas excéder {MaxSizeRange} cm.</em>
  </div>
  {/if}
</Accordion>
