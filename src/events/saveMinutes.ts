import {IpcEventKey} from "../enum";
import {IpcEventInterface, ipcEventListener} from "../core/event";
import {Backlog} from "../domain/backlog";

interface Body {
  account: string
  body: string
}

export interface SaveMinutesEvent extends IpcEventInterface<Body>{
  key: IpcEventKey.SaveBacklog
}

ipcEventListener.addEvent<Body>(IpcEventKey.SaveBacklog, (payload) => {
  const minutes: Backlog = Backlog.createTodayMinutes(payload.params.body, payload.params.account)
  minutes.save();
  return true;
});
