<template>
    <div class="lg:sticky top-28 pt-5 -mt-5 font-proxima">
        <!-- Desktop Sidebar -->
        <div v-if="toc.length > 0" class="toc hidden lg:block">
            <p class="border-b-4 pb-3 mb-3 border-gray-200 text-xl">
                On this page
            </p>
            <ul class="pl-0">
                <li
                    v-for="subtitle in toc"
                    :key="subtitle.text"
                    class="py-1"
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
        <div v-if="toc.length > 0" class="text-right mb-12">
            <FilterDropdown v-if="toc.length > 0">
                <template #title>On this page</template>
                <template #options>
                    <ul class="p-4">
                        <li
                            v-for="subtitle in toc"
                            :key="subtitle.text"
                            class="py-1"
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
import FilterDropdown from "~/components/Dropdown.vue";
const props = defineProps({
    toc: {
        type: Array,
        default: () => [],
    },
});
</script>
