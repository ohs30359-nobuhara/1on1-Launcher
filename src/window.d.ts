import {ipcRenderer} from 'electron'

export declare global {
  interface Window {
    electron: ipcRenderer
  }
}
