<template>
    <div class="admonition" :class="`admonition-${type.toLowerCase()}`">
        <div class="admonition-heading">
            <h5>
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
            </h5>
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
        required: true,
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
    background-color: rgb(251, 255, 240);
    border-left-width: 8px;
    --border-opacity: 1;
    border-color: rgb(67, 154, 30);

    h5 {
        --text-opacity: 1;
        color: rgb(128, 227, 133);
    }
}

.admonition-warning {
    --bg-opacity: 1;
    background-color: #fffaf0;
    background-color: rgba(255, 250, 240, var(--bg-opacity));
    border-left-width: 8px;
    --border-opacity: 1;
    border-color: #dd6b20;
    border-color: rgba(221, 107, 32, var(--border-opacity));

    h5 {
        --text-opacity: 1;
        color: #dd6b20;
        color: rgba(221, 107, 32, var(--text-opacity));
    }
}
</style>
