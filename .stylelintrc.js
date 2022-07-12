module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  defaultSeverity: 'warning',
  rules: {
    'rule-empty-line-before': [
      'always',
      {
        except: ['after-single-line-comment', 'first-nested']
      }
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep']
      }
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['v-deep']
      }
    ],
    'no-empty-source': null,
    'no-descending-specificity': null
  }
}
