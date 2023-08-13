import {contextBridge, ipcMain, ipcRenderer} from 'electron';
import {IpcEventKey} from "./enum";

console.log("load preload")

contextBridge.exposeInMainWorld('electron', {
  send: (_, args) => ipcRenderer.invoke("ipcEvent", args)
})
