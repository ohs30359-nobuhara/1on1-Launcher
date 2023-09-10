import {IpcEventInterface, ipcEventListener} from "../core/event";
import {IpcEventKey} from "../enum";
import {Member, MemberInterface} from "../domain/member";

export interface SaveMemberEvent extends IpcEventInterface<MemberInterface>{
  key: IpcEventKey.SaveMember
}

ipcEventListener.addEvent<MemberInterface>(IpcEventKey.SaveMember, (payload) => {
  const member: Member = new Member(payload.params.account);
  member.role = payload.params.role;
  member.position = payload.params.position;
  member.personalPreference = payload.params.personalPreference;
  member.growthStrategy = payload.params.growthStrategy;
  member.closingTheGap = payload.params.closingTheGap;
  member.skillSet = payload.params.skillSet;
  member.priority = payload.params.priority;
  member.remarks = payload.params.remarks;
  member.priorityMemo = payload.params.priorityMemo;
  member.skillAssessment = payload.params.skillAssessment;
  member.save();
  return true;
});
