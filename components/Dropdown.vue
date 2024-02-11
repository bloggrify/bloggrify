<template>
    <div class="relative inline-block text-left ml-2 lg:hidden">
        <div>
            <span class="rounded-md shadow-sm">
                <button
                    v-click-outside="onClickOutside"
                    type="button"
                    class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-black hover:text-gray-500 hover:bg-smalt-blue-500 focus:outline-none transition ease-in-out duration-150"
                    aria-haspopup="true"
                    aria-expanded="true"
                    @click="showOptions = !showOptions"
                >
                    <slot name="title">Button Title</slot>
                    <svg
                        class="-mr-1 ml-2 h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </span>
        </div>

        <div
            v-if="showOptions === true"
            class="origin-top-right absolute mt-2 w-64 rounded-md shadow-lg z-1000"
        >
            <div class="rounded-md bg-white shadow-xs">
                <div class="py-1" role="menu" aria-orientation="vertical">
                    <slot name="options">
                        <a
                            href="#"
                            class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            role="menuitem"
                        >
                            Option 1
                        </a>
                        <a
                            href="#"
                            class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            role="menuitem"
                        >
                            Option 2
                        </a>
                        <a
                            href="#"
                            class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            role="menuitem"
                        >
                            Option 3
                        </a>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
    directives: {
        clickOutside: vClickOutside.directive,
    },
    data() {
        return {
            showOptions: false,
        };
    },
    methods: {
        onClickOutside(event) {
            this.showOptions = false;
        },
    },
};
</script>

<style></style>
