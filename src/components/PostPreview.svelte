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

<article>
  <div class="flex flex-wrap place-content-between">
    <a data-sveltekit-prefetch href={`/blog/${id}`} class="text-blue-900 underline mr-4">
      <Block block={props.Name} />
    </a>
    <div class="mb-4 mt-3 self-end">
      <Block block={props.Tags} />
    </div>
  </div>
  <Block block={props.Summary} />
</article>
