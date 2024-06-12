<template>
    <div :class="ui.component">
        <div :class="ui.nav_bar">
            <!-- Nav Tabs -->
            <div :class="ui.nav_container">
                <nav :class="ui.nav" aria-label="Tabs" role="tablist">
                    <button
                        :class="previewActive ? ui.nav_item_active + ui.nav_item : ui.nav_item"
                        type="button"
                        role="tab" @click="displayPreview"
                    >
                        Preview
                    </button>
                    <button
                        :class="htmlActive ? ui.nav_item_active + ui.nav_item : ui.nav_item"
                        type="button"
                        role="tab"
                        @click="displayHtml"
                    >
                        Markup
                    </button>
                </nav>
            </div>
            <!-- Nav Tabs -->
        </div>

        <div :class="ui.content">
            <!-- Tab Content -->
            <div v-if="previewActive" role="tabpanel">
                <div :class="ui.preview">
                    <slot name="preview" />
                </div>
            </div>
            <!-- End Tab Content -->

            <!-- Tab Content -->
            <div v-if="htmlActive" role="tabpanel">
                <div :class="ui.markup">
                    <div>
                        <slot name="markup" />
                    </div>
                </div>
            </div>
            <!-- End Tab Content -->
        </div>
    </div>
</template>
<script setup lang="ts">

const config = useAppConfig()
const ui = config.ui.components.mdd.classes

const previewActive = ref(true)
const htmlActive = ref(false)

const displayPreview = () => {
    previewActive.value = true
    htmlActive.value = false
}

const displayHtml = () => {
    previewActive.value = false
    htmlActive.value = true
}
</script>
