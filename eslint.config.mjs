import eslint from '@eslint/js';
import eslintStylistic from '@stylistic/eslint-plugin-js';
import perfectionist from 'eslint-plugin-perfectionist';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    {
        languageOptions: { globals: globals.node }
    },
    {
        ignores: ["dist/*"]
    },
    // ESLint
    eslint.configs.recommended,
    // ESLint Stylistic
    {
        plugins: {
            '@stylistic/js': eslintStylistic
        },
        rules: {
            'indent': ['error', 4],
            'key-spacing': ['error', {
                beforeColon: false,
                afterColon: true,
                mode: 'strict'
            }],
            'max-len': ['error', {
                'code': 120,
                'ignoreUrls': true,
            }]
        }
    },
    // Perfectionist
    {
        plugins: {
            perfectionist
        },
        rules: {
            'perfectionist/sort-imports': [
                'error',
                {
                    type: 'natural',
                    order: 'asc',
                    groups: [
                        ['builtin', 'external'],
                        'internal',
                        ['parent', 'sibling', 'index'],
                        ['type', 'internal-type', 'parent-type', 'sibling-type', 'index-type'],
                        'side-effect',
                        'style',
                        'object',
                        'unknown'
                    ],
                    'newlines-between': 'always',
                    'internal-pattern': ['@/**']
                }
            ]
        }
    },
    // TSEslint
    ...tseslint.config({
        extends: [...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
        languageOptions: {
            parserOptions: {
                EXPERIMENTAL_useProjectService: {
                    defaultProject: './tsconfig.json'
                }
            }
        },
        rules: {
            '@typescript-eslint/no-empty-interface': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-unnecessary-condition': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off'
        }
    }),
    // Custom rules
    {
        rules: {
            'no-console': ['error', {
                allow: ['warn', 'error']
            }],
            'max-lines-per-function': ['error', 60],
            'semi': ['error', 'always']
        }
    }
];
