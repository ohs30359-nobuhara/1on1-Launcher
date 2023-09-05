import {contextBridge, ipcMain, ipcRenderer} from 'electron';
import {IpcEventKey} from "./enum";
import {IpcEventInterface} from "./core/event";

contextBridge.exposeInMainWorld('electron', {
  send: async (_, args: IpcEventInterface<any>) => {
    return await ipcRenderer.invoke("ipcEvent", args).catch(e => console.error(e));
  }
})
