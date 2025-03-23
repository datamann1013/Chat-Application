import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    // Map module aliases (adjust if needed)
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // If you have a setup file, otherwise remove
};

export default config;
