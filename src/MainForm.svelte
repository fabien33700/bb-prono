<script lang="ts">
  // Views
  import FirstNamesView from './views/FirstNames.svelte'
  import BirthDateView from './views/BirthDate.svelte'
  import SizeView from './views/Size.svelte'
  import WeightView from './views/Weight.svelte'
  import LeaveMessageView from './views/LeaveMessage.svelte'

  // Stores
  import { snapshot } from './stores'

  // Internal state
  let submitted = false
  let promise: Promise<void> = Promise.resolve()

  const wait = (delay) => new Promise(resolve => setTimeout(resolve, delay))

  async function sendResults(): Promise<void> {
    const results = { ...snapshot(), submitDate: new Date() }
    console.log('Résultats avant envoi : ', results)

    // Simulates server response delay
    const delay = (2 + Math.random() * 3) * 1_000
    await wait(delay)
  }

  function submitForm() {
    submitted = true
    promise = sendResults()
      .then(() => alert('Vos pronostics ont bien été pris en compte. Merci 🙂'))
  }

</script>

<div class="shadow-md">
  <FirstNamesView />
  <BirthDateView />
  <WeightView />
  <SizeView />
  <LeaveMessageView />

  <div class="w-full border-t text-right p-2">
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
