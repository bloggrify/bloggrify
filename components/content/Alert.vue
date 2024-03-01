<template>
    <div class="admonition" :class="`admonition-${type.toLowerCase()}`">
        <div class="admonition-heading">
            <div class="admonition-header">
                <svg
                    v-if="type.toLowerCase() === 'tip'"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    class="inline-block mr-3 -mt-1 h-6 w-6 fill-green-700"
                >
                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                        d="M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7l0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5H109c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8l0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4l0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5H226.4c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8l0 0 0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 384c-44.2 0-80-35.8-80-80V416H272v16c0 44.2-35.8 80-80 80z"
                    />
                </svg>
                <svg
                    v-if="type.toLowerCase() === 'warning'"
                    xmlns="http://www.w3.org/2000/svg"
                    class="inline-block mr-3 -mt-1 h-6 w-6 fill-amber-600"
                    viewBox="0 0 512 512"
                >
                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                        d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
                    />
                </svg>

                <span>{{ type }}</span>
            </div>
        </div>
        <div class="admonition-content">
            <p>
                <slot />
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps({
    type: {
        type: String,
        required: false,
        default: "TIP",
    },
});
</script>
<style lang="scss" scoped>
.admonition {
    --bg-opacity: 1;
    background-color: #faf5ff;
    background-color: rgba(250, 245, 255, 1);
    border-left-width: 8px;
    --border-opacity: 1;
    margin-bottom: 0.5rem;
    padding: 1rem;
}

.admonition-tip {
    --bg-opacity: 1;
    background-color: rgb(250, 253, 246);
    border-left-width: 8px;
    --border-opacity: 1;
    border-color: rgb(67, 154, 30);

    .admonition-header {
        --text-opacity: 1;
        color: rgb(22, 100, 30);
    }
}

.admonition-warning {
    --bg-opacity: 1;
    background-color: #fffaf0;
    border-left-width: 8px;
    --border-opacity: 1;
    border-color: #dd6c22;

    .admonition-header {
        --text-opacity: 1;
        color: #7e4211;
    }
}
</style>
