<script setup lang="ts">

import {BuiltinSearch} from '#components'

const config = useAppConfig()
const isAlgoliaEnabled = config.search?.algolia

</script>

<template>
    <BuiltinSearch v-if="!isAlgoliaEnabled" />
<!--    <AlgoliaDocSearch v-else :disable-user-personalization="true"/>-->

</template>







