<script setup lang="ts">

import {BuiltinSearch} from '#components'

const config = useAppConfig()
const isAlgoliaEnabled = config.search?.algolia

</script>

<template>
    <AlgoliaDocSearch v-if="isAlgoliaEnabled" :disable-user-personalization="true"/>
    <BuiltinSearch v-else/>

</template>







