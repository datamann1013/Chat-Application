import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.app.json' }],
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

};

export default config;
