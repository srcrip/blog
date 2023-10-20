<script context="module" lang="ts">
  import type { RichTextBlock } from './types'
</script>

<script lang="ts">
  import RichText from './RichText.svelte'
  export let block: Array<RichTextBlock>
</script>

<p class="text-lg">
  <RichText block={block}/>
</p>
