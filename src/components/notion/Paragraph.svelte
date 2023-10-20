<script context="module" lang="ts">
  import type { RichTextBlock } from './types'
  export type ParagraphBlock = {
    text: Array<RichTextBlock>
  }
</script>

<script lang="ts">
  import RichText from './RichText.svelte'
  export let block: ParagraphBlock
</script>

{#if block.text && block.text.length}
  <p>
    <RichText block={block.text} />
  </p>
{/if}
