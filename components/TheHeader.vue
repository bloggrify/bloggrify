<template>
    <div>
        <nav
            id="header-menu"
            class="transition-colors fixed w-full z-10 top-0 inverted"
        >
            <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div class="relative flex items-center justify-between h-16">
                    <div
                        class="absolute inset-y-0 left-0 flex items-center sm:hidden"
                    >
                        <!-- Mobile menu button-->
                        <button
                            type="button"
                            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            @click="mobileMenuOpen = !mobileMenuOpen"
                        >
                            <span class="sr-only">Open main menu</span>
                            <!--
              Icon when menu is closed.

              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            -->
                            <svg
                                class="h-6 w-6"
                                :class="!mobileMenuOpen ? 'block' : 'hidden'"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <!--
              Icon when menu is open.

              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            -->
                            <svg
                                class="h-6 w-6"
                                :class="mobileMenuOpen ? 'block' : 'hidden'"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
                    >
                        <div class="flex-shrink-0 flex items-center">
                            <span
                                class="text-white text-base font-medium font-bruno text-2xl font-to-invert-to-pink"
                            >
                                <nuxt-link to="/"
                                    >{{ blogName }}</nuxt-link
                                >
                            </span>
                        </div>
                        <div
                            class="hidden sm:block sm:ml-6 absolute right-0 font-mark"
                        >
                            <div class="flex space-x-4">
                                <NuxtLink
                                    v-for="item in navLinks"
                                    :key="item.path"
                                    :to="item.path"
                                    class="link text-white font-to-invert-to-black"
                                    >{{ item.name }}
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile menu, show/hide based on menu state. -->
            <div :class="mobileMenuOpen ? '' : 'hidden'">
                <div class="px-2 pt-2 pb-3 space-y-1">
                    <NuxtLink
                        v-for="item in navLinks"
                        :key="item.path"
                        :to="item.path"
                        class="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium font-to-invert-to-black"
                        >{{ item.name }}
                    </NuxtLink>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const menu = config.public.menu;
const blogName = config.public.name;

const navLinks = ref(menu);
const mobileMenuOpen = ref(false);
</script>

<style lang="scss" scoped>
.inverted {
    @apply bg-slate-50;

    .font-to-invert-to-pink {
        @apply text-pink-500 transition-all;
    }

    .font-to-invert-to-black {
        @apply text-slate-700 transition-all;

        &:hover {
            @apply text-white;
        }
    }
}

.link {
    position: relative;
    overflow: hidden;
    text-decoration: none;
    @apply block  text-base font-medium px-3;

    &.NuxtLink-exact-active {
        &::after {
            left: 0;
            bottom: -2px;
            width: 100%;
            height: 100%;
        }
    }

    &::after {
        content: "";
        background: rgba(#ec407a, 0.25);
        position: absolute;
        left: 18px;
        bottom: -6px;
        width: calc(100% - 8px);
        height: calc(100% - 8px);
        z-index: -1;
        transition: 0.35s cubic-bezier(0.25, 0.1, 0, 2.05);
    }

    &:hover:after {
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 100%;
    }
}
</style>
