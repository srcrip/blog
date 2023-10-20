<script context="module" lang="ts">
  import type { RichTextBlock } from './types'
</script>

<script lang="ts">
  export let block: Array<RichTextBlock>
</script>

{#each block as blockItem}
  <span class:bold={blockItem.annotations.bold}
        class:italic={blockItem.annotations.italic}
        class:strikethrough={blockItem.annotations.strikethrough}
        class:underline={blockItem.annotations.underline}
        class:code={blockItem.annotations.code}
        class="{blockItem.annotations.color !== 'default' ? blockItem.annotations.color : ''} rich-text-item">
    {#if blockItem.text.link}
      <a href={blockItem.text.link.url} title={blockItem.text.content}>{blockItem.text.content}</a>
    {:else}
      {blockItem.text.content}
    {/if}
  </span>
{/each}

<style scoped>
  .code {
    display: inline-block;
    color: #f02727;
    font-family: monospace;
    background-color: #f5f5f5;
    border-radius: 4px;
    padding: 0.05rem 0.25rem;
  }

  .bold {
    font-weight: bold;
  }

  .italic {
    font-style: italic;
  }

  .strikethrough {
    text-decoration: line-through;
  }

  .underline {
    text-decoration: underline;
  }
</style>
