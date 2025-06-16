<script lang="ts">
  import SvelteSeo from 'svelte-seo'
  import PostPreview from '../components/PostPreview.svelte'
  import type { PageData } from './$types'
  import { slugOrId } from '../utils'

  export let data: PageData
</script>

<SvelteSeo title="blog.src.rip" description="a programming blog about elixir, phoenix, and other things" />

<section class="space-y-4">
  {#each data.pages as notionItem}
    <PostPreview id={slugOrId(notionItem)} props={notionItem.properties} />
  {/each}
</section>
