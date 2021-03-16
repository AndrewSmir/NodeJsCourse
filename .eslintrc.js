module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": ["eslint:recommended", 'prettier'],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "plugins": ['prettier'],
    "rules": {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'no-use-before-define': 'off',
        'no-plusplus': 'off',
        'no-unused-vars': 'warn',
    }
};
