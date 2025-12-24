<script setup lang="ts">

// import {BuiltinSearch} from '#components'
const searchTerm = ref('')
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('page'))
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('page'), {
  server: false
})
</script>

<template>
  <UContentSearchButton :collapsed="false" />
  <UContentSearch
    v-model:search-term="searchTerm"
    :files="files"
    shortcut="meta_k"
    :navigation="navigation"
    :fuse="{ resultLimit: 42 }"
  />
</template>







