export enum HubConnectionState {
  Disconnected = 'Disconnected',
  Connecting = 'Connecting',
  Connected = 'Connected',
  Disconnecting = 'Disconnecting',
  Reconnecting = 'Reconnecting',
}

export enum LogLevel {
  Trace = 0,
  Debug = 1,
  Information = 2,
  Warning = 3,
  Error = 4,
  Critical = 5,
  None = 6,
}

export class HubConnection {
  state: HubConnectionState = HubConnectionState.Disconnected;
  private handlers: Map<string, Function[]> = new Map();
  private callbacks: {
    onclose?: () => void;
    onreconnecting?: () => void;
    onreconnected?: () => void;
  } = {};

  start = jest.fn(async () => {
    this.state = HubConnectionState.Connected;
    return Promise.resolve();
  });

  stop = jest.fn(async () => {
    this.state = HubConnectionState.Disconnected;
    if (this.callbacks.onclose) {
      this.callbacks.onclose();
    }
    return Promise.resolve();
  });

  on = jest.fn((methodName: string, newMethod: Function) => {
    if (!this.handlers.has(methodName)) {
      this.handlers.set(methodName, []);
    }
    this.handlers.get(methodName)!.push(newMethod);
  });

  off = jest.fn((methodName: string, method?: Function) => {
    if (!method) {
      this.handlers.delete(methodName);
    } else {
      const methods = this.handlers.get(methodName);
      if (methods) {
        const index = methods.indexOf(method);
        if (index > -1) {
          methods.splice(index, 1);
        }
      }
    }
  });

  invoke = jest.fn(async (methodName: string, ...args: any[]) => {
    return Promise.resolve();
  });

  onclose(callback: () => void) {
    this.callbacks.onclose = callback;
  }

  onreconnecting(callback: () => void) {
    this.callbacks.onreconnecting = callback;
  }

  onreconnected(callback: () => void) {
    this.callbacks.onreconnected = callback;
  }

  // Helper method for tests to simulate receiving a message
  simulateReceive(methodName: string, ...args: any[]) {
    const handlers = this.handlers.get(methodName);
    if (handlers) {
      handlers.forEach(handler => handler(...args));
    }
  }
}

export class HubConnectionBuilder {
  private connection = new HubConnection();

  withUrl = jest.fn(() => this);
  withAutomaticReconnect = jest.fn(() => this);
  configureLogging = jest.fn(() => this);

  build = jest.fn(() => {
    return this.connection;
  });
}
