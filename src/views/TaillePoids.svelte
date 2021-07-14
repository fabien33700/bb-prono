<script type="ts" context="module">
  import { NumberRange } from '../lib/number-utils'
</script>

<script type="ts">
  import RangeSlider from '../components/RangeSlider.svelte'

  export let poids: number
</script>

<div class="flex flex-row">
  <RangeSlider
    bind:value={poids}
    min={0}
    max={10000}
  />
</div>

<pre>{ JSON.stringify({ poids }) }</pre>
