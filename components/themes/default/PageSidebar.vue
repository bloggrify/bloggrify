<template>
    <div class="lg:sticky top-28 pt-5 -mt-5 text-sm">
        <!-- Desktop Sidebar -->
        <div v-if="toc.length > 0" class="toc hidden lg:block">
            <p class="border-b-4 pb-3 mb-3 border-gray-200 text-xl">
                On this page
            </p>
            <ul class="pl-0">
                <li
                    v-for="subtitle in toc"
                    :key="subtitle.text"
                    class="py-1 list-decimal ml-2"
                    :class="{ 'ml-4': subtitle.depth === 3 }"
                >
                    <a
                        class="hover:text-smalt-blue-700"
                        :class="{ 'text-shark-400': subtitle.depth === 3 }"
                        :href="'#' + subtitle.id"
                    >
                        {{ subtitle.text }}
                    </a>
                </li>
            </ul>
        </div>

        <!-- Responsive Sidebar -->
        <div v-if="toc.length > 0" class="fixed right-20">
            <FilterDropdown v-if="toc.length > 0">
                <template #title>Table of contents</template>
                <template #options>
                    <ul class="p-4">
                        <li
                            v-for="subtitle in toc"
                            :key="subtitle.text"
                            class="py-1 list-decimal ml-2"
                            :class="{ 'ml-4': subtitle.depth === 3 }"
                        >
                            <a
                                class="hover:text-smalt-blue-700"
                                :class="{
                                    'text-shark-400': subtitle.depth === 3,
                                }"
                                :href="'#' + subtitle.id"
                            >
                                {{ subtitle.text }}
                            </a>
                        </li>
                    </ul>
                </template>
            </FilterDropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import FilterDropdown from "~/components/themes/default/Dropdown.vue";
defineProps({
    toc: {
        type: Array,
        default: () => [],
    },
});
</script>
