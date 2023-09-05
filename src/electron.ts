import * as path from 'path';
import {BrowserWindow, app, ipcMain} from "electron"
import {IpcEventInterface, ipcEventListener} from "./core/event";
import "./events/index"

let mainWindow: BrowserWindow | null;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // nodeIntegration を無効にする
      contextIsolation: true, // コンテキストの分離を有効にする
      preload: path.join(__dirname, 'preload.js'), // プリロードスクリプトを指定
    },
  });

  mainWindow.webContents.openDevTools()

  await mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(async () => {
  await createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('ipcEvent', (event, data) => {
  console.debug('Received SaveMinutes message:', data);
  const payload: IpcEventInterface<any> = data as IpcEventInterface<any>;
  const replay: any = ipcEventListener.on(payload);

  // returnがないなら何もbrowser側に返さない
  if (!replay) {
    return;
  }

  console.log("replay", replay);
  return replay;
});
