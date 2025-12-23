<!-- This layout exists to throw an error if the intended layout does not exist -->
<!-- Example <NuxtLayout :name="my-missing-layout" fallback='invalid' /> -->

<template>
    <div>
        <slot />
    </div>
</template>

<script lang="ts" setup>

// Throw an error instead of showing the layout
throw createError({
    name: 'Invalid layout',
    fatal: false,
    statusMessage: 'Invalid layout'
})
</script>

