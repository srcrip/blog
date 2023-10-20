<script context="module" lang="ts">
  import type { NumberedListItemBlock } from './types'
</script>

<script lang="ts">
  import RichText from './RichText.svelte'
  export let block: NumberedListItemBlock
</script>

<ol class="list-decimal">
  <li><RichText block={block.numbered_list_item.text} /></li>
  {#if block.siblings}
    {#each block.siblings as sibling}
      <li><RichText block={sibling.numbered_list_item.text} /></li>
    {/each}
  {/if}
</ol>
