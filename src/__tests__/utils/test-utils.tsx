import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../contexts/AuthContext';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  withAuth?: boolean;
}

// Create a new QueryClient for each test to ensure test isolation
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries in tests
        gcTime: Infinity, // Keep cache indefinitely in tests
      },
      mutations: {
        retry: false,
      },
    },
  });

export const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => {
  const { withAuth = true, ...renderOptions } = options || {};

  if (withAuth) {
    return render(ui, { wrapper: AllTheProviders, ...renderOptions });
  }

  const queryClient = createTestQueryClient();
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Re-export everything from @testing-library/react-native
export * from '@testing-library/react-native';

// Override the default render with our custom render
export { customRender as render };
