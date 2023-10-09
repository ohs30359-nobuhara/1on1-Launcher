import {IpcEventInterface, ipcEventListener} from "../core/event";
import {IpcEventKey} from "../enum";
import {Backlog} from "../domain/backlog";

export interface LoadMinutesIndexEvent extends IpcEventInterface<null> {
  key: IpcEventKey.LoadBacklogIndex
}

ipcEventListener.addEvent(IpcEventKey.LoadBacklogIndex, () => {
  return Backlog.loadMinutesIndex();
})
