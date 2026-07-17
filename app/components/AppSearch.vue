<script setup lang="ts">
const searchTerm = ref('')

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('page'))

// The search index (SQLite dump + WASM) is fetched only on the first search intent,
// not on every page mount. Readers who never search download nothing extra.
const { data: files, status, execute: loadSearchIndex } = useLazyAsyncData(
  'search',
  () => queryCollectionSearchSections('page'),
  { server: false, immediate: false }
)

function ensureSearchIndex() {
  if (status.value === 'idle' || status.value === 'error') {
    loadSearchIndex()
  }
}

// `open` is a shared ref toggled by both the button click and the Cmd+K shortcut,
// so watching it covers every entry path. The hover/focus handlers prefetch earlier.
const { open } = useContentSearch()
watch(open, (isOpen) => {
  if (isOpen) {
    ensureSearchIndex()
  }
})
</script>

<template>
  <UContentSearchButton
    :collapsed="false"
    @pointerenter="ensureSearchIndex"
    @focus="ensureSearchIndex"
  />
  <UContentSearch
    v-model:search-term="searchTerm"
    :files="files"
    shortcut="meta_k"
    :navigation="navigation"
    :fuse="{ resultLimit: 42, fuseOptions: { threshold: 0.3, ignoreLocation: true } }"
  />
</template>







