import {PersonnelPage} from "./page/personnelPage";

export enum Enum {
  OneOnOne,
  Backlog,
  Members,
  AddMember,
  Minutes,
  Personnel
}

export enum IpcEventKey {
  LoadMinutesIndex= "LoadMinutesIndex",
  LoadMinutes= "LoadMinutes",
  SaveMinutes = "SaveMinutes",
  LoadMembers= "LoadMembers",
  SaveMember = "SaveMember"
}
