import '@testing-library/react-native/extend-expect';
import { server } from './mocks/server';
import { resetFactories } from './utils/factories';
import { clearStore } from './mocks/expo-secure-store';

// Establish API mocking before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => {
  server.resetHandlers();
  resetFactories();
  clearStore();
});

// Clean up after the tests are finished
afterAll(() => server.close());
