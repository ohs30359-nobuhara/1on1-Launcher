import {IpcEventKey} from "../enum";
import {IpcEventInterface, ipcEventListener} from "../core/event";
import {Minutes} from "../domain/minutes";

interface Body {
  account: string
  body: string
}

export interface SaveMinutesEvent extends IpcEventInterface<Body>{
  key: IpcEventKey.SaveMinutes
}

ipcEventListener.addEvent<Body>(IpcEventKey.SaveMinutes, (payload) => {
  const minutes: Minutes = Minutes.createTodayMinutes(payload.params.body, payload.params.account)
  minutes.save();
  return true;
});
