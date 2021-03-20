module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  moduleNameMapper: {
    '@/types': '<rootDir>/src/@types/$1',
    '@/modules/(.*)$': '<rootDir>/src/modules/$1',
  },
}
