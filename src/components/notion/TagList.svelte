<script context="module" lang="ts">
  import type { TagBlock } from './types'
</script>

<script lang="ts">
  export let block: Array<TagBlock>
</script>

<span class="text-xs text-black">
  {#each block as blockItem, i}
    {blockItem.name}{#if i < block.length - 1}, {/if}
  {/each}
</span>
