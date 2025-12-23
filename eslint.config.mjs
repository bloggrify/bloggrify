// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
    rules: {
        'vue/no-multiple-template-root': 'off',
        'vue/no-v-html': 'off',
        'vue/max-attributes-per-line': ['error', { singleline: 3 }]
    }
})
