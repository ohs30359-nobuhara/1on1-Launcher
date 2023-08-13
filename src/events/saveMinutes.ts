import {IpcEventKey} from "../enum";
import {IpcEventInterface, ipcEventListener} from "./event";

export interface SaveMinutesEvent extends IpcEventInterface<string>{
  key: IpcEventKey.SaveMinutes
  params: string
}

ipcEventListener.addEvent<SaveMinutesEvent>(IpcEventKey.SaveMinutes, (event) => {
  console.log(event);
});
