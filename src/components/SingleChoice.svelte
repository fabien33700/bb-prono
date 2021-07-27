<script type="ts" context="module">
  export interface ChoiceItem {
    title?: string
    value: any
  }

  export declare type TAcceptedItem = ChoiceItem | string
</script>

<script type="ts">
  export let items: (TAcceptedItem)[] = []
  export let selected: TAcceptedItem = null

  let position: number = items.indexOf(selected)

  let atBegin: boolean
  let atEnd: boolean
  let empty: boolean

  let displayedText: string

  function nextItem() {
    if (!atEnd) selected = items[++position]
  }

  function previousItem() {
    if (!atBegin) selected = items[--position]
  }

  function isChoiceItem(item: TAcceptedItem): item is ChoiceItem {
    return (item as ChoiceItem).value !== undefined;
  }

  $: {
    empty = !items?.length
    atBegin = !empty && position === 0
    atEnd = !empty && position === items.length - 1

    displayedText = isChoiceItem(selected)
      ? selected?.title ?? selected?.value?.toString?.()
      : selected
  }
</script>

<div class="block">
  <div class="flex flex-row justify-around text-gray-700 bg-white font-bold text-xl mb-2 m-5 text-center shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
    <button disabled="{atBegin}" on:click={previousItem}>&lt;</button>
    <input
      readonly
      type="text" value={displayedText} />
    <button disabled="{atEnd}" on:click={nextItem}>&gt;</button>
  </div>
</div>

<style lang="postcss">
  input[type="text"] {
    @apply font-bold text-center;
    width: 125px;
  }

  button:disabled {
    @apply text-gray-300;
  }
</style>
