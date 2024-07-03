const config = require('./.cz-config.cjs')
module.exports = {
  extends: ['@znzt-fe/lint-config/commitlint.config.js'],
  rules: {
    'type-enum': [2, 'always', config.types.map((item) => item.value)],
    'scope-enum': [2, 'always', config.scopes.map((item) => item.name)]
  }
}
