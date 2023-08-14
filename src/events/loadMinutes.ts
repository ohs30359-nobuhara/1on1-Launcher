import {IpcEventInterface, ipcEventListener} from "../core/event";
import {IpcEventKey} from "../enum";
import {Minutes} from "../domain/minutes";

interface Body {
  member: string
  date: string
}

export interface LoadMinutesEvent extends IpcEventInterface<Body> {
  key: IpcEventKey.LoadMinutes
}

ipcEventListener.addEvent<Body>(IpcEventKey.LoadMinutes, (payload) => {
  return Minutes.find(payload.params.member, payload.params.date);
})
