import {IpcEventInterface, ipcEventListener} from "../core/event";
import {IpcEventKey} from "../enum";
import {Member, MemberInterface} from "../domain/member";

export interface SaveMemberEvent extends IpcEventInterface<MemberInterface>{
  key: IpcEventKey.SaveMember
}

ipcEventListener.addEvent<MemberInterface>(IpcEventKey.SaveMember, (payload) => {
  const member: Member = new Member(payload.params.account);
  member.save();
  return true;
});
