<script lang="ts">
  import axios from 'axios'
  import { Link } from 'svelte-routing'

  // Views
  import FirstNames from 'views/MainForm/FirstNames.svelte'
  import BirthDate from 'views/MainForm/BirthDate.svelte'
  import Size from 'views/MainForm/Size.svelte'
  import Weight from 'views/MainForm/Weight.svelte'
  import LeaveMessage from 'views/MainForm/LeaveMessage.svelte'

  import { reset, snapshot } from 'src/stores'

  // Internal state
  let submitted = false
  let promise: Promise<void> = Promise.resolve()

  async function sendResults(): Promise<void> {
    const results = snapshot()
    await axios.post('/prognostics', results)
    reset()
  }

  function submitForm() {
    submitted = true
    promise = sendResults()
      .then(() => alert('Vos pronostics ont bien été pris en compte. Merci 🙂'))
  }

</script>

<div class="w-full md:w-3/5 mx-auto p-8 shadow-md">
  <FirstNames />
  <BirthDate />
  <Weight />
  <Size />
  <LeaveMessage />

  <div class="w-full border-t p-2 flex flex-row">
    <div>
      <button class="primary">
        <Link to="/results">Afficher les résultats</Link>
      </button>
    </div>
    <div class="flex-1" />
    <div>
      {#await promise}
      <button disabled class="primary">
        ⏳ En cours ...
      </button>
      {:then}
      <button class="success" disabled={submitted}
        on:click={() => submitForm()}>
        Envoyer pronostic
      </button>
      {/await}
    </div>
  </div>
</div>

<style lang="postcss">
  button {
    @apply font-bold py-2 px-4 border-b-4 rounded;
  }
  button.success {
    @apply bg-green-500  text-white border-green-700 ;
  }
  button.success:not([disabled]) {
    @apply hover:bg-green-400 hover:border-green-500;
  }
  button.primary {
    @apply bg-blue-500 text-white border-blue-700;
  }
  button.primary:not([disabled]) {
    @apply hover:bg-blue-400 hover:border-blue-500;
  }
  button[disabled] {
    @apply opacity-50 cursor-not-allowed;
  }
</style>
