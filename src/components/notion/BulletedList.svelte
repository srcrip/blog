<script context="module" lang="ts">
  import type { BulletedListItemBlock } from './types'
</script>

<script lang="ts">
  import RichText from './RichText.svelte'
  export let block: BulletedListItemBlock
</script>

<ul class="list-disc">
  <li><RichText block={block.bulleted_list_item.text} /></li>
    {#if block.siblings}
      {#each block.siblings as sibling}
        <li><RichText block={sibling.bulleted_list_item.text} /></li>
      {/each}
    {/if}
</ul>
