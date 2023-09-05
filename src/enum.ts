export enum Enum {
  OneOnOne,
  Backlog,
  Members,
  EditMember,
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
