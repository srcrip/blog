<script lang="ts">
  import SvelteSeo from 'svelte-seo'
  import type { PageData } from './$types'
  import Post from '../../../components/Post.svelte'

  export let data: PageData

  const fallbackTitle = "andrewian.dev"
  const fallbackDescription = "My development blog"

  $: title = data?.page?.properties?.Name?.title[0]?.plain_text || fallbackTitle
  $: summary = data?.page?.properties?.Summary?.rich_text[0]?.plain_text || fallbackDescription

</script>

<SvelteSeo
  title="andrewian.dev - {title}"
  description={summary}
  />

<section>
  <Post blocks={data.blocks} page={data.page} />
</section>
