<script context="module" lang="ts">
  import type { RichTextBlock } from './types'
  export type ToggleListItem = {
    toggle: {
      text: Array<RichTextBlock>
    },
    siblings: Array<{
      toggle: {
        text: Array<RichTextBlock>
      }
    }>
  }
</script>

<script lang="ts">
  import RichText from './RichText.svelte'
  export let block: ToggleListItem
</script>

<div class="toggle-list">
  <details class="toggle">
    <summary class="toggle-summary"><RichText block={block.toggle.text} /></summary>
  </details>

  {#if block.siblings}
    {#each block.siblings as sibling}
      <details class="toggle">
        <summary class="toggle-summary"><RichText block={sibling.toggle.text} /></summary>
      </details>
    {/each}
  {/if}
</div>
