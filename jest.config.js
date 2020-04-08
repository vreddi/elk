// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  bail: true,

  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/(?!@foo)"
  ],

  testTimeout: 5000,

  globals: {
    "ts-jest": {
      "tsConfig": "tsconfig.json",
      "diagnostics": true
    }
  },

  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "controllers/(.*)": "<rootDir>/src/controllers/$1",
    "services/(.*)": "<rootDir>/src/services/$1",
    "models/(.*)": "<rootDir>/src/models/$1",
  },

  testEnvironment: "node",

  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",

  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },

  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!@foo)"
  ]
};
