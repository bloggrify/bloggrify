<template>
    <div class="admonition" :class="`admonition-${type.toLowerCase()}`">
        <div class="admonition-heading">
            <div class="admonition-header">
                <Lightbulb
                    v-if="type.toLowerCase() === 'tip'"
                    :stroke-width="1"
                    class="inline-block -mt-1 mr-2"
                />
                <AlertTriangle
                    v-if="type.toLowerCase() === 'warning'"
                    :stroke-width="1"
                    class="inline-block -mt-1 mr-2"
                />
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
import { Lightbulb, AlertTriangle } from "lucide-vue-next";

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
