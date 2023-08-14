import {IpcEventInterface, ipcEventListener} from "../core/event";
import {IpcEventKey} from "../enum";
import {Member, MemberInterface} from "../domain/member";

export interface LoadMembersEvent extends IpcEventInterface<null>{
  key: IpcEventKey.LoadMembers
}

ipcEventListener.addEvent<MemberInterface>(IpcEventKey.LoadMembers, () => {
  return Member.getMemberArray();
});
