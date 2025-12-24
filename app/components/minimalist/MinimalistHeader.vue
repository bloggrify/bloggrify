<template>
    <nav class="mt-10 w-3/4 mx-auto flex justify-between items-center">
        <h1 class="text-4xl font-bold">
            {{ title }}
        </h1>
        <AppSearch />
    </nav>
</template>
<script setup lang="ts">
const config = useAppConfig()
const title = config.name || 'Minimalist'
</script>
