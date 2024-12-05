module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Transform .ts and .tsx files using ts-jest
    },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json', // Use the project's tsconfig.json
      },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'], // Allow TypeScript, JavaScript, and JSON extensions
    transformIgnorePatterns: ['<rootDir>/node_modules/'], // Ignore node_modules folder during transformation
  };
  