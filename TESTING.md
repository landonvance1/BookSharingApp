# Testing Guide

This document describes the testing framework and best practices for the BookSharingApp.

## Overview

The test framework uses:
- **Jest** - Test runner
- **React Native Testing Library** - Component testing utilities
- **MSW (Mock Service Worker)** - API mocking

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run tests in CI mode
npm run test:ci
```

## Project Structure

```
src/
├── __tests__/
│   ├── setup.ts              # Global test setup
│   ├── jestSetup.js          # Jest environment setup
│   ├── mocks/                # Module mocks
│   │   ├── expo-secure-store.ts
│   │   ├── expo-constants.ts
│   │   ├── expo-camera.ts
│   │   ├── signalr.ts
│   │   └── server.ts         # MSW server configuration
│   ├── handlers/             # MSW request handlers
│   │   ├── authHandlers.ts
│   │   ├── sharesHandlers.ts
│   │   ├── notificationsHandlers.ts
│   │   ├── communitiesHandlers.ts
│   │   └── booksHandlers.ts
│   └── utils/                # Test utilities
│       ├── test-utils.tsx    # Custom render function
│       └── factories.ts      # Test data factories
└── features/
    └── [feature]/
        └── __tests__/        # Feature-specific tests
```

## Writing Tests

### Unit Tests

Place unit tests in `__tests__/` directories alongside the code they test:

```typescript
// src/utils/__tests__/imageUtils.test.ts
import { getFullImageUrl } from '../imageUtils';

describe('getFullImageUrl', () => {
  it('should return placeholder for empty string', () => {
    expect(getFullImageUrl('')).toBe(
      'https://via.placeholder.com/150x200?text=No+Image'
    );
  });
});
```

### Integration Tests

Integration tests verify the interaction between multiple components:

```typescript
// src/contexts/__tests__/AuthContext.test.tsx
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useAuth } from '../AuthContext';

describe('AuthContext', () => {
  it('should login successfully', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password',
      });
    });

    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

### Component Tests

Use the custom render function for component tests:

```typescript
import { render, screen } from '@/__tests__/utils/test-utils';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeTruthy();
  });
});
```

## Test Utilities

### Custom Render

The `customRender` function wraps components with necessary providers:

```typescript
import { render } from '@/__tests__/utils/test-utils';

// Automatically wraps with QueryClientProvider and AuthProvider
render(<MyComponent />);
```

### Test Data Factories

Use factories to create mock data:

```typescript
import {
  createMockUser,
  createMockShare,
  createMockBook,
} from '@/__tests__/utils/factories';

const user = createMockUser({ email: 'custom@example.com' });
const share = createMockShare({ status: ShareStatus.Ready });
const book = createMockBook({ title: 'Custom Title' });
```

## MSW (Mock Service Worker)

### Using Default Handlers

The MSW server is configured with default handlers for all API endpoints. Tests automatically use these mocked responses.

### Overriding Handlers for Specific Tests

```typescript
import { server } from '@/__tests__/mocks/server';
import { http, HttpResponse } from 'msw';

it('should handle API error', async () => {
  // Override the default handler for this test
  server.use(
    http.get('http://localhost:5155/shares/borrower', () => {
      return HttpResponse.json(
        { error: 'Server error' },
        { status: 500 }
      );
    })
  );

  // Test error handling
});
```

## Mocking Expo Modules

Expo modules are automatically mocked via Jest's `moduleNameMapper`:

- `expo-secure-store` - In-memory storage mock
- `expo-constants` - Mock constants
- `expo-camera` - Mock camera permissions
- `@microsoft/signalr` - Mock SignalR connection

### Using SecureStore Mock

```typescript
import * as SecureStore from 'expo-secure-store';

// Mock returns values
(SecureStore.getItemAsync as jest.Mock).mockResolvedValue('mock-token');

// Verify calls
expect(SecureStore.setItemAsync).toHaveBeenCalledWith('key', 'value');
```

## Best Practices

1. **Test Isolation** - Each test should be independent and not rely on other tests
2. **Use Factories** - Create test data using factories for consistency
3. **Descriptive Names** - Use clear, descriptive test names that explain what is being tested
4. **Arrange-Act-Assert** - Structure tests with clear setup, execution, and assertion phases
5. **Mock External Dependencies** - Use MSW for API calls, mock Expo modules
6. **Clean Up** - The test framework automatically cleans up after each test
7. **Async Testing** - Use `waitFor` for async operations
8. **Act Warnings** - Wrap state updates in `act()` to avoid warnings

## Coverage Reports

After running `npm run test:coverage`, view the coverage report:

```bash
# Open the HTML coverage report
open coverage/lcov-report/index.html
```
## Troubleshooting

### Tests Failing Due to Timers

If tests use timers or debouncing:

```typescript
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

it('should debounce', () => {
  act(() => {
    jest.advanceTimersByTime(500);
  });
});
```

### Act Warnings

Wrap state updates in `act()`:

```typescript
await act(async () => {
  await result.current.login({ email, password });
});
```

### MSW Not Intercepting Requests

Ensure the server is properly configured in `setup.ts`:

```typescript
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [MSW Documentation](https://mswjs.io/)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about)
