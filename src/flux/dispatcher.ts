export type Action = { type: string; payload?: any };

type Callback = (action: Action) => void;

class Dispatcher {
  private callbacks: Callback[] = [];

  register(callback: Callback) {
    this.callbacks.push(callback);
  }

  dispatch(action: Action) {
    for (const cb of this.callbacks) {
      cb(action);
    }
  }
}

export const dispatcher = new Dispatcher();
