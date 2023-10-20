<script context="module" lang="ts">
  export type PeopleBlock = {
    name: string,
    avatar_url: string
  }
</script>

<script lang="ts">
  export let block: Array<PeopleBlock>
</script>

<h3 class="flex text-sm">
  {#each block as blockItem}
    <img src={blockItem.avatar_url} alt={`${blockItem.name}'s avatar`} />
    <div>
      <!-- {blockItem.name} -->
    </div>
  {/each}
</h3>
<style lang="postcss">
  img {
    @apply w-8 h-8 rounded-md ring-1 ring-gray-300;
  }
</style>
