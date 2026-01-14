import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { fetch } from 'cross-fetch';

// Polyfill fetch if needed (Node 18+ has it, but good to be safe for jsdom)
global.fetch = fetch;

// MSW setup will go here later
