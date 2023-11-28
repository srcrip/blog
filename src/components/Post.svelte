<script context="module" lang="ts">
  import type { NotionBlock } from './notion/types'
</script>

<script lang="ts">
  import Block from './notion/Block.svelte'

  export let title: string
  export let blocks: Array<NotionBlock>
  export let page: any

  $: title = page.properties['Name']?.title[0]?.plain_text
  $: summary = page.properties['Summary'].rich_text[0]?.plain_text
  $: published_on = new Date(page.properties['Published On']?.date?.start)
  $: last_updated = new Date(
    page.properties['Last Updated On']?.date?.start ?? published_on
  )
  $: updateDiffDays = Math.ceil(
    Math.abs(last_updated.valueOf() - published_on.valueOf()) /
      (1000 * 60 * 60 * 24)
  )
</script>

<article class="prose prose-lg mb-4 max-w-screen-md mx-auto">
  <!-- Title -->
  <h1 class="xl:text-center mb-2 mt-12 text-3xl font-semibold">{title}</h1>
  {#if summary}
    <p class="text-gray-600">{summary}</p>
  {/if}
  {#if page.properties['Published On']?.date?.start}
    <p class="text-sm mt-8">
      originally published <sl-relative-time date={published_on}>
        {published_on}
      </sl-relative-time>
    </p>
  {/if}
  <!-- last updated -->
  {#if last_updated && updateDiffDays >= 1}
    <p class="text-sm mb-8">
      last updated <sl-relative-time date={last_updated}>
        {last_updated}
      </sl-relative-time>
    </p>
  {/if}
  <!-- Content -->
  <main class="mt-6">
    {#each blocks as prop}
      <Block block={prop} />
    {/each}
  </main>
</article>

<div class="mb-4 max-w-screen-md mx-auto">
  <footer class="border rounded-md bg-zinc-100 px-8 py-12 mt-12">
    <h2 class="m-0 text-lg text-zinc-600">
      Like my content? Follow me on <a
        href="https://twitter.com/0xGOATMILK"
        class="text-blue-900"
      >
        Twitter
      </a>
      and
      <a href="https://github.com/sevensidedmarble" class="text-blue-900">
        GitHub
      </a>
      !
    </h2>
  </footer>
</div>

<style>
  address {
    color: var(--brand-color);
    @apply font-semibold;
  }
</style>
