<!-- Fallback layout for pages a theme does not implement. -->
<!-- Example <NuxtLayout :name="my-missing-layout" fallback='invalid' /> -->

<template>
    <div>
        <slot />
    </div>
</template>

<script lang="ts" setup>
const config = useAppConfig()
const route = useRoute()

// A theme is allowed not to implement every page. When it does not, the route still exists
// (the pages live in the core and ship to every theme), so it must answer a plain 404:
// the page really does not exist on this blog. Anything else would leak a developer message
// to the visitor and tell crawlers to come back later.
if (import.meta.dev) {
    const theme = config.theme || 'minimalist'
    console.warn(
        `[bloggrify] No layout found for "${route.path}" in theme "${theme}", returning a 404. `
        + `Add the matching layout to app/layouts/themes/${theme}/ if this theme is meant to support this page.`
    )
}

throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
})
</script>
