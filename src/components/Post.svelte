<script context="module" lang="ts">
  import type { NotionBlock } from './notion/types'
</script>

<script lang="ts">
  import Block from './notion/Block.svelte'
  import RichText from './notion/RichText.svelte'

  export let blocks: Array<NotionBlock>
  export let page: any

  $: title = page.properties.Name?.title ?? []
  $: summary = page.properties.Summary?.rich_text ?? []
  $: published_on = new Date(page.properties['Published On']?.date?.start)
  $: last_updated = new Date(
    page.properties['Last edited time']?.date?.start ?? published_on
  )
  $: console.log(last_updated)
  $: updateDiffDays = Math.ceil(
    Math.abs(last_updated.valueOf() - published_on.valueOf()) /
      (1000 * 60 * 60 * 24)
  )
</script>

<article class="prose max-w-none">
  <header class="mb-8">
    <h1 class="text-2xl font-normal mb-3"><RichText block={title} /></h1>
    {#if summary.length > 0}
      <p class="text-black text-lg mb-4"><RichText block={summary} /></p>
    {/if}
    <div class="text-sm text-black">
      {#if page.properties['Published On']?.date?.start}
        <span>
          {published_on.toLocaleDateString()}
        </span>
      {/if}
    </div>
  </header>

  <main>
    {#each blocks as prop}
      <Block block={prop} />
    {/each}
  </main>
</article>
