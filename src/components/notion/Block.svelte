<script context="module" lang="ts">
  import type { NotionBlock } from './types'
</script>

<script lang="ts">
  import Title from './Title.svelte'
  import Heading from './Heading.svelte'
  import RichText from './RichText.svelte'
  import TagList from './TagList.svelte'
  import People from './People.svelte'
  import Paragraph from './Paragraph.svelte'
  import NumberedList from './NumberedList.svelte'
  import BulletedList from './BulletedList.svelte'
  import ToggleList from './ToggleList.svelte'

  import CodeBlock from '../CodeBlock.svelte'

  export let block: NotionBlock
</script>

{#if block && block.type}
  {#if block.type === 'title'}
    <Title block={block[block.type]} />
  {:else if block.type === 'heading_1' || block.type === 'heading_2' || block.type === 'heading_3'}
    <Heading block={block[block.type]} type={block.type} />
  {:else if block.type === 'multi_select'}
    <TagList block={block[block.type]} />
  {:else if block.type === 'rich_text'}
    <RichText block={block[block.type]} />
  {:else if block.type === 'paragraph'}
    <Paragraph block={block[block.type]} />
  {:else if block.type === 'people'}
    <People block={block[block.type]} />
  {:else if block.type === 'numbered_list_item'}
    <NumberedList {block} />
  {:else if block.type === 'bulleted_list_item'}
    <BulletedList {block} />
  {:else if block.type === 'toggle'}
    <ToggleList {block} />
  {:else if block.type === 'code'}
    {@const code = block[block.type]?.text?.[0]?.plain_text}
    {@const caption = block[block.type]?.caption?.[0]?.plain_text}
    {@const language = block[block.type]?.language}
    <CodeBlock {code} {language} {caption}>{code}</CodeBlock>
  {:else if block.type === 'divider'}
    <hr />
  {:else if block.type === 'callout'}
    <div class="flex gap-2 border bg-gray-100 rounded-md place-items-center px-2">
      <div class="text-xl w-[3em] h-[3em] grid place-content-center">
        {block.callout.icon.emoji}
      </div>

      <p>
        <RichText block={block.callout.text} />
      </p>
    </div>
  {:else if block.type === 'embed'}
    <img class="mx-auto border rounded" src={block.embed.url} alt={block.embed?.caption[0]?.plain_text} />
    <p class="caption">{block.embed?.caption[0]?.plain_text}</p>
  {:else}
    <!-- Type that needs to be added -->
    <pre><code>{JSON.stringify(block, null, 2)}</code></pre>
    🎉
  {/if}
{/if}
