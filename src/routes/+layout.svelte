<script>
  import '../main.css'
</script>

<div class="max-w-3xl mx-auto px-4 py-6">
  <header class="mb-8">
    <h1 class="text-lg font-normal mb-2">
      <a href="/">blog.src.rip</a>
    </h1>
    <nav class="text-sm">
      <a href="/" class="mr-4">blog</a>
      <a href="/consulting" class="mr-4">consulting</a>
      <a href="https://github.com/srcrip" class="mr-4">github</a>
      <a href="https://twitter.com/src_rip">twitter</a>
    </nav>
  </header>
  
  <main>
    <slot />
  </main>
</div>

