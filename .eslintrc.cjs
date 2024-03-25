module.exports = {
    root: true,
    extends: [
        '@nuxt/eslint-config'
    ],
    rules: {
        // Global
        semi: ['error', 'never'],
        quotes: ['error', 'single'],
        'quote-props': ['error', 'as-needed'],
        // Vue
        'vue/multi-word-component-names': 0,
        'vue/max-attributes-per-line': 'off',
        'vue/no-v-html': 0,
        'vue/html-indent': ['error', 4],
        'vue/script-indent': ['error', 4, { baseIndent: 0 }],
        // Typescript
        '@typescript-eslint/indent': ['error', 4],
    }
}
