<script context="module" lang="ts">
  export type TitleBlock = {
    text: {
      content: string,
    }
  }
</script>

<script lang="ts">
  export let block: Array<TitleBlock>
</script>

<h2 class="font-bold text-xl mb-3 mt-8">
  {#each block as blockItem}
    {blockItem.text.content}
  {/each}
</h2>
