<script>
  import '../main.css'
</script>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" title="src.rip RSS Feed" href="/rss.xml" />
</svelte:head>

<div class="w-full max-w-3xl mx-auto px-4 py-6">
  <header class="mb-8">
    <h1 class="text-lg font-normal mb-2">
      <a href="/">blog.src.rip</a>
    </h1>
    <nav class="text-sm">
      <a href="/" class="mr-4">blog</a>
      <a href="/consulting" class="mr-4">consulting</a>
      <a href="https://github.com/srcrip" class="mr-4">github</a>
      <a href="https://twitter.com/src_rip" class="mr-4">twitter</a>
      <a href="/rss.xml" class="mr-4">rss</a>
    </nav>
  </header>

  <main>
    <slot />
  </main>
</div>
