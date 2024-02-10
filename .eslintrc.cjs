module.exports = {
    root: true,
    env: {
        browser: true,
        es2022: true,
        node: true,
    },
    plugins: ['@typescript-eslint', 'vue', 'nuxt'],
    extends: ['@nuxtjs/eslint-config-typescript', 'plugin:nuxt/recommended', 'plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },

    rules: {
        'import/named': 'off',
        'import/order': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-deprecated-slot-attribute': 'off',
        'vue/no-multiple-template-root': 'off',
        'indent': ['error', 4]
    },

};
