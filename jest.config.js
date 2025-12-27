export default {
  preset: 'ts-jest/presets/default-esm',
  // 1. Add .tsx to ESM treatment
  extensionsToTreatAsEsm: ['.ts', '.tsx'], 
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    // 2. Update regex to include .tsx files
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true
    }]
  },
  moduleDirectories: ['node_modules', 'src'],
  // 3. Keep 'node' as default, but ensure your test file has 
  // the @jest-environment jsdom comment at the top
  testEnvironment: 'node', 
  testMatch: [
    // 4. Update match patterns to include .tsx
    '<rootDir>/tests/**/*.test.(js|ts|tsx)',
    '<rootDir>/tests/**/*.spec.(js|ts|tsx)'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}'
  ]
};