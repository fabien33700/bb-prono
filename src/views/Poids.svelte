<script type="ts">
  import RangeSlider from 'svelte-range-slider-pips'
  import type { Range } from '../lib/number-utils'
  import { round } from '../lib/number-utils'

  const intervalPoids: Range = [1500, 8000]

  export let poids: Range = [...intervalPoids]

  function handleFormatter(v: number): string {
    const kilos = Math.trunc(v / 1000)
    const grammes = v % 1000
    const affichage = []

    if (kilos > 0) affichage.push( `${kilos} kg` )
    if (grammes > 0) affichage.push( `${grammes} g` )

    return affichage.join(' ');
  }

  const sliderOpts = {
    min: intervalPoids[0],
    max: intervalPoids[1],
    range: true,
    step: 25,
    float: true,
    pips: true,
    pipstep: 20,
    all: 'label',
    formatter: (v: number) => round(v / 1000, 2),
    handleFormatter,
  }

</script>

<div class="flex flex-row w-full items-center">
  <div class="w-full">
    <RangeSlider
      bind:values={poids}
      {...sliderOpts}
    />
  </div>
  <span class="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-white bg-indigo-600 rounded-full">kg</span>
</div>
