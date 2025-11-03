module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
    },
    extends: [
        'plugin:vue/vue3-recommended', // Vue 3 推荐规则
        '@vue/eslint-config-typescript/recommended', // TypeScript 推荐规则
        '@vue/eslint-config-prettier', // Prettier 兼容
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
    },
    rules: {
        // 根据你的需求添加或覆盖规则
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/multi-word-component-names': 'off', // 允许单词组件名
        // 其他自定义规则
    },
};