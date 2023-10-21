<script lang="ts">
  import Highlight from 'svelte-highlight'
  import atomOneDark from 'svelte-highlight/styles/atom-one-dark'

  import typescript from 'svelte-highlight/languages/typescript'
  import elixir from 'svelte-highlight/languages/elixir'

  let languages = {
    typescript: typescript,
    elixir: elixir,
  }

  export let code
  export let caption
  export let language

  $: selectedLanguage = languages[language] || typescript
</script>

<svelte:head>
  {@html atomOneDark}
</svelte:head>

<div>
  <Highlight language={selectedLanguage} {code} class="mb-0" />

  {#if caption}
    <p class="caption">{caption}</p>
  {/if}
</div>
