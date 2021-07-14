<script lang="ts">
  export let value: number = 0
  export let min: number = 0
  export let max: number = 100
  export let step: number = 1
</script>

<input
  class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128"
  type="range" {min} {max} {step} bind:value={value} />

<style>
  input[type="range"]::-webkit-slider-thumb {
    width: 15px;
    -webkit-appearance: none;
    appearance: none;
    height: 15px;
    cursor: ew-resize;
    background: #fff;
    box-shadow: -405px 0 0 400px #605e5c;
    border-radius: 50%;
  }
</style>
