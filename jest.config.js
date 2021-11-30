module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx', 'd.ts'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
  transformIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.[jt]s?(x)'],
  snapshotSerializers: ['jest-serializer-vue'],
  globals: {
    'ts-jest': {
      babelConfig: true
    } /* Fails on mapped import syntax without this.*/,
    diagnostics: {
      warnOnly: true
    }
  }
}
// module.exports = {
//   moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
//   transform: {
//     '^.+\\.vue$': 'vue-jest',
//     '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
//       'jest-transform-stub',
//     '^.+\\.jsx?$': 'babel-jest',
//     '^.+\\.tsx?$': 'ts-jest'
//   },
//   transformIgnorePatterns: ['/node_modules/'],
//   testEnvironment: 'jsdom',
//   testMatch: ['**/tests/**/*.[jt]s?(x)', '**/__tests__/*.[jt]s?(x)'],
//   testURL: 'http://localhost/',
//   // watchPlugins: [
//   //   "/Users/dingjinhong/vue-ts/node_modules/jest-watch-typeahead/filename.js",
//   //   "/Users/dingjinhong/vue-ts/node_modules/jest-watch-typeahead/testname.js",
//   // ],
//   globals: { 'ts-jest': { babelConfig: true } }
// }
