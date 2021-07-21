<script type="ts">
  import RangeSlider from 'svelte-range-slider-pips'
  import type { Range } from '../lib/number-utils'

  const intervalTaille: Range = [20, 80]

  export let taille: Range = [...intervalTaille]

  const [min, max] = intervalTaille
  const sliderOpts = {
    min,
    max,
    range: true,
    step: 1,
    float: true,
    pips: true,
    pipstep: 5,
    all: 'label',
  }

</script>

<div class="flex flex-row w-full items-center">
  <div class="w-full">
    <RangeSlider
      bind:values={taille}
      {...sliderOpts}
    />
  </div>
  <span class="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-white bg-indigo-600 rounded-full">cm</span>
</div>
