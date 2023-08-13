import {IpcEventKey} from "../enum";

export interface IpcEventInterface<T> {
  key: IpcEventKey
  params: T
}

class IpcEventListener {
  constructor(readonly store: Map<IpcEventKey, (event: IpcEventInterface<any>)=> void>) {
  }

  public addEvent<T>(key: IpcEventKey, handler: (event: IpcEventInterface<T>)=> void) {
    this.store.set(key, handler)
  }

  public on(params: IpcEventInterface<any>): void {
    const handler = this.store.get(params.key);
    if (!handler) {
      return;
    }
    handler(params)
  }
}

export const ipcEventListener: IpcEventListener = new IpcEventListener(new Map());
