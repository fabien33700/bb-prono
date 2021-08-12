<script lang="ts">
  // Views
  import FirstNames from 'views/MainForm/FirstNames.svelte'
  import BirthDate from 'views/MainForm/BirthDate.svelte'
  import Size from 'views/MainForm/Size.svelte'
  import Weight from 'views/MainForm/Weight.svelte'
  import LeaveMessage from 'views/MainForm/LeaveMessage.svelte'

  import { snapshot } from 'stores/index'

  // Internal state
  let submitted = false
  let promise: Promise<void> = Promise.resolve()

  const wait = (delay: number) => new Promise(resolve => setTimeout(resolve, delay))

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
  <FirstNames />
  <BirthDate />
  <Weight />
  <Size />
  <LeaveMessage />

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
