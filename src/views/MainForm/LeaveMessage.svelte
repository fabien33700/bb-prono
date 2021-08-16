<script>
  // Components
  import Accordion from 'components/Accordion.svelte'
  import MarkedText from 'components/MarkedText.svelte'
  import TextField from 'components/TextField.svelte'

  // Stores
  import { messageText, author, selectedPage } from 'src/stores'

  // Default values and settings
  const PageIndex = 4
  import { MaxTextLength } from 'src/config'

  // // Initializing store values
  // $messageText ??= ''
  // $author ??= ''

  // Reactive state
  $: remaining = MaxTextLength - $messageText.length
  $: s = remaining > 1 ? 's' : ''
</script>

<Accordion
  expanded={$selectedPage === PageIndex}
  on:expand={() => $selectedPage = PageIndex}
  >
  <h1 slot="title">💬 Laisser un petit mot</h1>
  <h2 slot="description" class="text-sm italic text-gray-500">
    <strong>{remaining}</strong> caractère{s} restant{s}{#if $author}, signé <strong>&laquo; {$author} &raquo;</strong>{/if}
  </h2>
  <div class="flex flex-col">
    <MarkedText
      bind:text={$messageText}
      placeholder={"Aucun texte. Cliquez ici pour entrer en édition."}
      maxLength={MaxTextLength}
    />
  <div class="flex flex-row items-center ">
    <span class="mr-2 pt-2">Signé <sup>*</sup>: </span>
    <TextField
      width={'180px'}
      bind:value={$author}
      placeholder="eg. Maman, Eric, etc."
    />
    <div class="flex-1"/>
  </div>
  <legend class="text-xs italic">
    <sup>*</sup> : requis
  </legend>
</div>
</Accordion>
