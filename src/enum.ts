export enum Enum {
  OneOnOne,
  Backlog,
  Members,
  AddMember,
  Minutes
}

export enum IpcEventKey {
  LoadMinutesIndex= "LoadMinutesIndex",
  LoadMinutes= "LoadMinutes",
  SaveMinutes = "SaveMinutes",
  LoadMembers= "LoadMembers",
  SaveMember = "SaveMember"
}
