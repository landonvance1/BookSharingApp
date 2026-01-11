// Setup file to run before jest-expo's setup
// This prevents jest-expo from trying to mock console incorrectly

// Ensure console is a proper object before jest-expo tries to modify it
if (typeof console !== 'object' || console === null) {
  global.console = {
    log: () => {},
    warn: () => {},
    error: () => {},
    info: () => {},
    debug: () => {},
  };
}
