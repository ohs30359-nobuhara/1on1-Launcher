import {IpcEventInterface} from "./event";

export async function eventEmitter<T>(payload: IpcEventInterface<any>): Promise<T> {
  // @ts-ignore
  return await window.electron.send('ipcEvent', payload);
}
