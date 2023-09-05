import {IpcEventKey} from "../enum";

export interface IpcEventInterface<T> {
  key: IpcEventKey
  params: T
}

class IpcEventListener {
  constructor(readonly store: Map<IpcEventKey, (event: IpcEventInterface<any>)=> any>) {
  }

  public addEvent<T>(key: IpcEventKey, handler: (payload: IpcEventInterface<T>)=> any) {
    this.store.set(key, handler)
  }

  public on(params: IpcEventInterface<any>): any {
    const handler = this.store.get(params.key);
    if (!handler) {
      console.error(`${params.key} is unknown event`);
      return;
    }
    return handler(params)
  }
}

export const ipcEventListener: IpcEventListener = new IpcEventListener(new Map());
