<script type="ts">
  import NumField from '../components/NumField.svelte'
  import TextField from '../components/TextField.svelte'

  export let poids = 0
  export let taille = 0
</script>

<div class="flex flex-row">
  <input type="range" min=0 max=10 >
</div>
Ceci est le composant de la taille et du poids
