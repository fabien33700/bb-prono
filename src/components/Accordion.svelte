<script type="ts">
  import { createEventDispatcher } from "svelte"

  /**
   * Indicated whether the accordion is expanded (content shown) or collasped
   */
  export let expanded = false

  const dispatch = createEventDispatcher()

  $: dispatch(expanded ? 'expand' : 'collapse')
</script>

<!-- Content -->
<div class="w-full overflow-hidden border-t">
  <label class="p-5 cursor-pointer flex flex-row items-center">
    <input class="absolute opacity-0" type="checkbox" bind:checked={expanded}>
    <slot name="title"></slot>
    <span class="flex-1" />
    <slot name="description"></slot>
    <div class="arrow" class:down={expanded} class:left={!expanded}></div>
  </label>
  <div
    class="content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal"
    class:expanded={expanded}
  >
    <p class="p-5">
      <slot>
        <em>Aucun contenu</em>
      </slot>
    </p>
  </div>
</div>
<!-- End content -->

<style lang="css">
  .content {
    max-height: 0;
    transition: max-height .35s;
  }
  .content.expanded {
    max-height: 100vh;
    transition: max-height .50s;
  }
  .arrow {
    margin-left: 25px;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    width: 8px;
    height: 8px;
    transition: transform .35s;
  }
  .arrow.down {
    transform: rotate(45deg);
  }
  .arrow.left {
    transform: rotate(135deg);
  }
</style>
