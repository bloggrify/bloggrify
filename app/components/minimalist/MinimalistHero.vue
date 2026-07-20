<script setup lang="ts">
// Home hero: avatar, site name, description, social links and an optional scrolling photo
// gallery. Modelled on the Nuxt UI portfolio template, driven entirely by app.config.
const config = useAppConfig()

const socialLinks = computed(() => resolveSocialLinks(config.socials))
const gallery = computed(() => config.gallery ?? [])
</script>

<template>
  <UPageHero
    :ui="{
      container: 'py-12 sm:py-16 lg:py-20',
      title: 'font-bold tracking-tight',
      links: 'mt-6 justify-center',
    }"
  >
    <template #headline>
      <UAvatar
        :src="config.avatar"
        :alt="config.name"
        size="3xl"
        class="ring-2 ring-default ring-offset-4 ring-offset-default"
      />
    </template>

    <template #title>
      {{ config.name }}
    </template>

    <template #description>
      {{ config.description }}
    </template>

    <template #links>
      <div
        v-if="socialLinks.length"
        class="flex items-center gap-1"
      >
        <UButton
          v-for="link in socialLinks"
          :key="link.platform"
          :to="link.url"
          :icon="link.icon"
          :aria-label="`Open ${link.label} profile`"
          color="neutral"
          variant="ghost"
          size="lg"
          target="_blank"
          :rel="link.rel"
        />
      </div>
    </template>

    <UMarquee
      v-if="gallery.length"
      pause-on-hover
      class="mt-4 py-2 [--duration:40s] [--gap:1.5rem]"
    >
      <NuxtImg
        v-for="(image, index) in gallery"
        :key="index"
        :src="image.src"
        :alt="image.alt"
        :width="image.width ?? 234"
        :height="image.height ?? 234"
        class="size-48 rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105 hover:rotate-0"
        :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'"
      />
    </UMarquee>
  </UPageHero>
</template>
