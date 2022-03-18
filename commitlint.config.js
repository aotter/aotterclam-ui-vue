module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'scope-enum': [0],
    'function-rules/scope-enum': [
      2,
      'always',
      parsed => {
        const scopes = ['core', 'bootstrap']

        if (
          !parsed.scope ||
          scopes.some(scope => parsed.scope.startsWith(scope))
        ) {
          return [true]
        }

        return [false, `scope must be one of ${scopes.join(', ')}`]
      }
    ],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'release'
      ]
    ]
  }
}
