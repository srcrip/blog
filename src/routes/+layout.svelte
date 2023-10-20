<script>
  import '../main.css'
</script>

<div class="px-4 grow max-w-screen-lg container mx-auto">
  <nav class="mt-8 flex flex-wrap gap-2">
    <h1 class="grow text-lg font-semibold">
      <a href="/">andrewian.dev</a>
      <div class="font-medium text-gray-600">
        a blog about elixir, svelte, accessibility, and more
      </div>
    </h1>
    <ul class="flex gap-4 font-semibold text-blue-900">
      <li class="block">
        <a href="/">blog</a>
      </li>

      <li class="block">
        <a href="/consulting">consulting</a>
      </li>

      <li class="block">
        <a href="https://github.com/sevensidedmarble">github</a>
      </li>

      <li class="block">
        <a href="https://twitter.com/0xGOATMILK">twitter</a>
      </li>

      <!--
      <li class="block">
        <a href="https://GitHubgithub.com/sevensidedmarble">Consulting</a>
      </li>
      <li class="block">
        <a href="https://GitHubgithub.com/sevensidedmarble">Resume</a>
      </li>
      <li class="block">
        <a href="https://GitHubgithub.com/sevensidedmarble">Contact</a>
      </li>
      -->
    </ul>
  </nav>
  <div class="flex-1 mt-4 sm:mt-12">
    <slot />
  </div>
</div>

<footer class="px-4 pb-4 text-sm mt-12">
  <!--
  <ol class="text-gray-500 flex gap-4 place-content-center">
    <li>GitHub</li>
    <li>Twitter</li>
  </ol>
  -->
</footer>
