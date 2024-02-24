/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  maxWorkers: 1,
  setupFiles: ['<rootDir>/test/setup.ts']
};