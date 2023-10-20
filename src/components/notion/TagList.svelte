<script context="module" lang="ts">
  import type { TagBlock } from './types'
</script>

<script lang="ts">
  export let block: Array<TagBlock>
</script>

<ul class="list-none inline-flex gap-2">
  {#each block as blockItem}
    <li data-id={blockItem.id} class="text-xs bg-gray-100 px-2 py-1 rounded no-underline">{blockItem.name}</li>
  {/each}
</ul>
