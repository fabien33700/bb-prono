<!-- This component just wraps child with an overlay, preventing user from interacting with it -->
<div class="w-full relative h-10 pt-1">
  <div class="absolute w-full h-full opacity-0 z-10"></div>
  <slot></slot>
</div>
