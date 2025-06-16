<script context="module" lang="ts">
  export type PostPreviewProps = {
    Name: any
    Summary: any
    Tags: any
    Published: any
  }
</script>

<script lang="ts">
  import Block from './notion/Block.svelte'
  export let props: PostPreviewProps
  export let id: string
</script>

<article class="mb-4">
  <a data-sveltekit-prefetch href={`/blog/${id}`} class="post-title">
    <Block block={props.Name} />
  </a>
  <div class="post-summary">
    <Block block={props.Summary} />
  </div>
</article>
