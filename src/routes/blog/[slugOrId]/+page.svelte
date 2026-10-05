<script lang="ts">
  import SvelteSeo from 'svelte-seo'
  import type { PageData } from './$types'
  import Post from '../../../components/Post.svelte'
  import { extractRichText, extractTitle } from '../../../utils'

  export let data: PageData

  const fallbackTitle = 'blog.src.rip'
  const fallbackDescription = 'My development blog'

  $: title = extractTitle(data?.page?.properties?.Name) || fallbackTitle
  $: summary = extractRichText(data?.page?.properties?.Summary) || fallbackDescription

</script>

<SvelteSeo
  title="blog.src.rip - {title}"
  description={summary}
  />

<section>
  <Post blocks={data.blocks} page={data.page} />
</section>
