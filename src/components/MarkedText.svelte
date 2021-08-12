<!-- TypeScript types for this component must be declared in a dedicated script block -->
<script type="ts" context="module">
  declare type TextFormatter = (s: string) => string
</script>

<script type="ts">
  // External dependencies
  import marked from 'marked'

  // Libraries
  import { nonEmptyOrWhitespace } from 'lib/FormatUtils'

  /* Properties */

  /**
   * The textarea raw text
   */
  export let text: string = null

  /**
   * The maximum length for the area
   */
  export let maxLength: number = Infinity

  /**
   * The placeholder when the text is empty
   */
  export let placeholder = 'Aucun texte. Cliquez ici pour entrer en édition.'

  // Default values and settings
  const validateKeys = ['Enter', /* 'NumpadEnter' */]

  // Internal state
  let edition = false
  let altKey = false
  let elementRef: HTMLTextAreaElement

  /* Event handlers */

  /**
   * Handle Alt+Enter keystroke for newline,
   * and Enter for exiting Edition mode.
   *
   * @param ev the keydown event from textarea
   */
  function handleEnter(ev: KeyboardEvent) {
    if (ev.altKey) altKey = true

    if (validateKeys.includes(ev.code)) {
      if (altKey) text += '\r\n'
      else edition = false
    }
  }

  /**
   * Covnert all smileys code to emojis
   * @param text the text to format
   * @returns formatted text
   */
  function emojiFormatter(text: string): string {
    const emojis = [
      [':)' , '🙂'],
      [':D' , '😀'],
      ["^^'", '😅'],
      ['^^' , '😁'],
      ['xD' , '😆'],
      [';3' , '😘'],
      ['<3' , '💖'],
      ['(:' , '🙃'],
      [';)' , '😉'],
      [';p' , '😜'],
      [':p' , '😛'],
      ['8)' , '😎'],
      [':(' , '😦'],
      ['T_T', '😭'],
    ]
    return emojis
      .reduce((acc, [code, emoji]) => acc.replaceAll(code, emoji), text)
  }

  const textFormatters: TextFormatter[] = [
    // Adding a backslash \ before newline character for markdown parser
    s => s.replaceAll(/\n/gi, '\\\n'),
    // Stripping last backslash to prevent it to show in textarea
    s => s.trim().endsWith('\\') ? s.slice(0, -2) : s,
    // Converting smiley text to emojis
    emojiFormatter,
    // Parsing markdown
    s => marked(s, { breaks: true }),
  ]

  /**
   * Format text from textarea to display it when edition mode is off
   *
   * @param text the text in the area
   */
  function formatText(text: string) {
    return textFormatters
      .reduce((s, formatter) => formatter(s), text)
  }

  // Reactive state
  // Focusing textarea when entering edition mode
  $: if (edition) elementRef?.focus()
</script>

{#if edition}
  <textarea
    class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
    rows="4"
    maxlength={maxLength}
    on:blur={() => edition = false}
    on:keyup={() => altKey = false}
    on:keydown={handleEnter}
    bind:value={text}
    bind:this={elementRef}
  />
  <div class="text-xs italic border-t-2 mt-2">
    La touche <code>Entrée</code> permet de valider la saisie,
    utilisez la combinaison <code>Alt+Entrée</code> ou la touche <code>Entrée</code> du pavé numérique pour ajouter un saut de ligne.
  </div>
{:else}
  <div
    class="flex flex-row items-start"
    on:click={() => edition = true}>
    <p class="flex-1">
      {#if nonEmptyOrWhitespace(text)}
        {@html formatText(text)}
      {:else}
        <div class="italic text-gray-800">{placeholder}</div>
      {/if}
    </p>
    <span class="cursor-pointer text-xs ml-2">✏️</span>
  </div>
  <div class="text-xs italic border-t-2 mt-2">
    Cliquez sur le texte pour passer en édition
  </div>

{/if}
