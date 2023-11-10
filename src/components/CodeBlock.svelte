<script lang="ts">
  import { fade } from 'svelte/transition'

  import Highlight from 'svelte-highlight'
  import atomOneDark from 'svelte-highlight/styles/atom-one-dark'

  import typescript from 'svelte-highlight/languages/typescript'
  import elixir from 'svelte-highlight/languages/elixir'

  let languages = {
    typescript: typescript,
    elixir: elixir
  }

  export let code
  export let caption
  export let language

  $: selectedLanguage = languages[language] || typescript

  let copyText = 'Copy'

  async function clickToCopy() {
    try {
      await navigator.clipboard.writeText(code)

      console.log('Copied to clipboard')

      copyText = 'Copied!'

      setTimeout(() => {
        copyText = 'Copy'
      }, 3000)
    } catch (error) {
      console.error('Failed to copy: ', error)
    }
  }
</script>

<svelte:head>
  {@html atomOneDark}
</svelte:head>

<div class="my-4">
  <div class="relative">
    <Highlight language={selectedLanguage} {code} class="my-0" />
    {#key copyText}
      <button
        class="absolute top-0 right-0 bg-slate-700 text-slate-200 px-2 py-1 text-xs font-bold rounded-bl-md rounded-tr-md"
        on:click={clickToCopy}
        transition:fade|local={{ duration: 250 }}
      >
        {copyText}
      </button>
    {/key}
  </div>

  {#if caption}
    <p class="caption">{caption}</p>
  {/if}
</div>
