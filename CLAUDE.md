# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Technology Stack

This is a React Native mobile application built with:
- **Expo SDK 53** - Development platform and build system
- **React Native 0.79** with React 19
- **TypeScript** with strict mode enabled
- **Expo New Architecture** enabled for better performance

## Development Commands

### Starting Development Server
```bash
npm start              # Start Expo development server
npm run android        # Start with Android emulator/device
npm run ios           # Start with iOS simulator/device  
npm run web           # Start web version in browser
```

### Development Workflow
- The entry point is `index.ts` which registers `App.tsx` as the root component
- Use Expo Go app on physical devices for testing during development
- Web version runs in browser for quick testing of UI components

## Project Architecture

### File Structure
- `App.tsx` - Main application component and entry point
- `index.ts` - Expo registration and app initialization
- `app.json` - Expo configuration (app metadata, build settings, platform configs)
- `assets/` - Application assets (icons, splash screens, favicon)

### Current State
This is a minimal "Hello World" React Native app with basic Expo setup. The main App component renders a simple centered text view.

### Configuration Notes
- TypeScript is configured with strict mode via `tsconfig.json`
- Expo configuration supports iOS, Android, and web platforms
- New Architecture is enabled for React Native performance improvements
- Edge-to-edge display enabled for Android

## Architecture Patterns (Based on Bulletproof React)

### Project Organization
- **Feature-based structure**: Organize code within features folder for scalability
- **Unidirectional architecture**: Code flows from shared → features → app
- **Minimize cross-feature imports**: Keep features independent
- **Co-location principle**: Keep components, hooks, and utilities close to usage

### Recommended Folder Structure (For Scaling)
```
src/
├── components/        # Shared UI components
├── hooks/            # Shared custom hooks
├── lib/              # Third-party library configurations
├── types/            # Global type definitions
├── utils/            # Shared utility functions
├── assets/           # Shared assets
└── features/         # Feature modules
    └── [feature]/
        ├── api/      # Feature-specific API calls
        ├── components/ # Feature-specific components
        ├── hooks/    # Feature-specific hooks
        ├── stores/   # Feature-specific state
        ├── types/    # Feature-specific types
        └── utils/    # Feature-specific utilities
```

### State Management Strategy
- **Component state**: Use `useState` for simple state, `useReducer` for complex updates
- **Application state**: Consider Zustand, Redux Toolkit, or Context + hooks
- **Server cache**: Use React Query or SWR for data fetching and caching
- **Form state**: React Hook Form for form management
- **Validation**: Zod or Yup for schema validation

### Component Patterns
- Extract distinct UI units into separate components
- Avoid nested rendering functions
- Limit component props and use composition
- Keep styling close to components
- Consider headless component libraries for flexibility

### API Layer
- Create single pre-configured API client instance
- Structure API requests with type safety and validation
- Separate concerns: client config, request definition, data hooks
- Use interceptors for error handling and authentication

### Error Handling
- Implement API interceptors for error notifications and auth management
- Use multiple Error Boundaries to contain errors locally
- Consider error tracking tools like Sentry for production

### Testing Strategy
- Focus on integration and E2E tests over unit tests
- Test user experience, not implementation details
- Use Testing Library for user-centric testing
- Consider Playwright for E2E testing
- Use MSW for API mocking during development