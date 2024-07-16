module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    sourceType: 'module',
  },
  ignorePatterns: ['.eslintrc.cjs', 'codegen.ts'],
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'prettier',
    'import',
    'boundaries',
    'sonarjs',
    'unicorn',
    'ava',
    'n',
    'json',
    // 'sql',
    'lodash',
    'no-loops',
    'promise',
    'optimize-regex',
    'no-secrets',
    // issue
    // https://github.com/eslint-community/eslint-plugin-security/issues/154
    // 'security',
    'xss',
    'jest',
    '@darraghor/nestjs-typed',
    'eslint-comments',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:boundaries/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/all',
    'plugin:ava/recommended',
    'plugin:n/recommended',
    'plugin:json/recommended',
    'plugin:lodash/recommended',
    'plugin:promise/recommended',
    'plugin:optimize-regex/recommended',
    // issue
    // 'plugin:security/recommended',
    'plugin:xss/recommended',
    'plugin:@darraghor/nestjs-typed/recommended',
    'plugin:eslint-comments/recommended',
  ],
  settings: {
    'lodash/import-scope': ['error', 'member'],
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    'import/resolver': {
      typescript: {},
      'eslint-import-resolver-custom-alias': {
        'alias': {
            '@common': './src/common/*',
            '@modules': './src/modules/*',
        },
        'extensions': ['.ts'],
      }
    },
    'boundaries/elements': [
      { type: 'common', pattern: 'common/*' },
      { type: 'modules', pattern: 'modules/*' },
    ],
    'boundaries/ignore': ['**/*.test.*'],
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'max-len': [1, { code: 250 }],
    '@darraghor/nestjs-typed/api-method-should-specify-api-response': 'off',
    '@darraghor/nestjs-typed/param-decorator-name-matches-route-param': 'off',
    'unicorn/no-static-only-class': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        'replacements': {
          'args': false,
          'arguments': false,
        },
        'allowList': {
          'args': true,
          'arguments': true,
        }
      }
    ],
    'unicorn/filename-case': [
      'error',
      {
        'case': 'kebabCase'
      }
    ],
    'lodash/prefer-map': 'off',
    'lodash/import-scope': ['error', 'member'],
    'lodash/prefer-lodash-method': ['error', { ignoreObjects: ['router', 'manager', 'repository', 'service'] }],
    'lodash/prefer-constant': 'off',
    'unicorn/no-array-method-this-argument': 'off',
    'no-secrets/no-secrets': ['error', {'ignoreContent': '^exec'}],
    'unicorn/consistent-function-scoping': [
      'error',
      {
        checkArrowFunctions: false,
      },
    ],
    'no-console': ['off', { allow: ['warn', 'error'] }],
    'eslint-comments/disable-enable-pair': [
      'error',
      {
        allowWholeFile: true,
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
        filter: { regex: '\\d+', match: false },
      },
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase'],
        types: ['boolean'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      },
      {
        selector: 'variableLike',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'property',
        filter: { 'regex': '\\d+', 'match': false },
        format: ['PascalCase', 'camelCase'],
      },
      {
        selector: 'property',
        modifiers: ['readonly'],
        format: ['PascalCase'],
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
      },
    ],
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [{ from: 'modules', allow: ['common', 'modules'] }],
      },
    ],
    'import/no-unresolved': ['error', { ignore: ['^virtual:'] }],
    'n/no-missing-import': 'off',
    'prettier/prettier':  [
      'error',
      {
        'printWidth': 120,
      }
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['**/*.test.*'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'boundaries/element-types': 'off',
      },
    },
  ],
};
