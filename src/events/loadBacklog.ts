import {IpcEventInterface, ipcEventListener} from "../core/event";
import {IpcEventKey} from "../enum";
import {Backlog} from "../domain/backlog";

interface Body {
  member: string
  date: string
}

export interface LoadBacklogEvent extends IpcEventInterface<Body> {
  key: IpcEventKey.LoadBacklog
}

ipcEventListener.addEvent<Body>(IpcEventKey.LoadBacklog, (payload) => {
  return Backlog.find(payload.params.member, payload.params.date);
})
