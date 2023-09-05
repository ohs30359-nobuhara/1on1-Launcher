import {IpcEventInterface, ipcEventListener} from "../core/event";
import {IpcEventKey} from "../enum";
import {Minutes} from "../domain/minutes";

export interface LoadMinutesIndexEvent extends IpcEventInterface<null> {
  key: IpcEventKey.LoadMinutesIndex
}

ipcEventListener.addEvent(IpcEventKey.LoadMinutesIndex, () => {
  return Minutes.loadMinutesIndex();
})
