<template>
    <div class="admonition admonition-caution">
        <div class="admonition-heading">
            <h5>
                <span class="admonition-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"
                        ></path></svg
                ></span>
                Warning
            </h5>
        </div>
        <div class="admonition-content">
            <p>
                <slot />
            </p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.admonition {
    --bg-opacity: 1;
    background-color: #faf5ff;
    background-color: rgba(250, 245, 255, var(--bg-opacity));
    border-left-width: 8px;
    --border-opacity: 1;
    border-color: #805ad5;
    border-color: rgba(128, 90, 213, var(--border-opacity));
    margin-bottom: 0.5rem;
    padding: 1rem;

    .admonition-icon {
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.25rem;

        svg {
            stroke: currentColor;
            fill: currentColor;
            display: inline-block;
            height: 1.25rem;
            width: 1.25rem;
            stroke-width: 0;
            margin-bottom: 0.25rem;
        }
    }
}

.admonition-caution {
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
