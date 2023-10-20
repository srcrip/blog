<script context="module" lang="ts">
  import type { RichTextBlock } from './types'
  export type HeadingBlock = {
    text: Array<RichTextBlock>
  }
  export type HeadingType = 'heading_1' | 'heading_2' | 'heading_3'
</script>

<script lang="ts">
  import RichText from './RichText.svelte'
  export let block: HeadingBlock
  export let type: HeadingType = 'heading_3'
</script>

{#if type === 'heading_1'}
  <h1 class="pb-4 mt-12 heading h1">
    <RichText block={block.text} />
  </h1>
{:else if type === 'heading_2'}
  <h2 class="pb-4 mt-12 heading h2">
    <RichText block={block.text} />
  </h2>
{:else}
  <h3 class="pb-4 mt-12 heading h3">
    <RichText block={block.text} />
  </h3>
{/if}
