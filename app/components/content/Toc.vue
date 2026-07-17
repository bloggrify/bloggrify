<template>
  <nav
    v-if="links.length"
    class="rounded-xl border border-default bg-elevated/40 p-5"
  >
    <p class="text-sm font-semibold text-default mb-3">
      Table of contents
    </p>
    <ul class="flex flex-col gap-1.5">
      <li
        v-for="link in links"
        :key="link.id"
      >
        <ULink
          :to="`#${link.id}`"
          class="text-sm text-muted hover:text-primary"
        >
          {{ link.text }}
        </ULink>

        <ul
          v-if="link.children?.length && showTocChildren"
          class="mt-1.5 flex flex-col gap-1.5 pl-4"
        >
          <li
            v-for="child in link.children"
            :key="child.id"
          >
            <ULink
              :to="`#${child.id}`"
              class="text-sm text-muted hover:text-primary"
            >
              {{ child.text }}
            </ULink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { PageCollectionItem } from '@nuxt/content'

const props = defineProps<{
  // When the placing layout already has the document (the common case), it passes it in so
  // the TOC reuses it. Used as an MDC component (`::toc`) inside markdown the doc is not
  // available, so the component falls back to querying the current route.
  doc?: PageCollectionItem
  showChildren?: boolean | string
}>()

const config = useAppConfig()

const showTocChildren = computed(() =>
  props.showChildren === true || props.showChildren === 'true' || (config.toc?.showChildren ?? false),
)

const route = useRoute()
const { data: selfDoc } = props.doc
  ? { data: ref<PageCollectionItem | null>(props.doc) }
  : await useAsyncData(`toc-${route.path}`, () => queryCollection('page').path(route.path).first())

type TocLink = { id: string, text: string, depth: number, children?: TocLink[] }
type TocDoc = { body?: { toc?: { links?: TocLink[] } } }

// The document body is a deeply recursive content AST. Narrowing each source to the shape
// actually read here, before the `??`, keeps the type checker from walking that AST (and
// hitting "excessively deep") for nothing.
const links = computed<TocLink[]>(() => {
  const doc = (props.doc as unknown as TocDoc | undefined) ?? (selfDoc.value as unknown as TocDoc | null)
  return doc?.body?.toc?.links ?? []
})
</script>
