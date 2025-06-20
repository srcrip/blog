<script context="module" lang="ts">
  import type { RichTextBlock } from './types'
</script>

<script lang="ts">
  export let block: Array<RichTextBlock>

  // Condense the text all into one
  let text = ''

  text = block.reduce((acc: any, curr: any) => {
    if (curr.type === 'text') {
      return acc + curr.text.content
    } else if (curr.type === 'mention') {
      return acc + curr.mention.name
    } else if (curr.type === 'equation') {
      return acc + curr.equation.expression
    } else if (curr.type === 'inline_equation') {
      return acc + curr.inline_equation.expression
    } else {
      return acc
    }
  }, '')
</script>

<p class="text-sm whitespace-break-spaces border border-l-8 rounded-md p-4">
  {text.trim()}
</p>
