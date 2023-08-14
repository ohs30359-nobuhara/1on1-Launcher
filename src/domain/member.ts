import {write, read} from "../utils/file";

export interface MemberInterface {
  readonly account: string
}

interface MemberJson {
  [key: string]: MemberInterface[]
}

export class Member implements MemberInterface {
  constructor(readonly account: string) {
  }
  public save() {
    // 上書き保存
    const members: {[key: string]: MemberInterface} = Member.getMembers();
    members[this.account] = this;
    write(JSON.stringify(members), "members.json", "./");
  }

  static getMembers(): {[key: string]: MemberInterface} {
    return JSON.parse(read("members.json"));
  }

  static getMemberArray(): MemberInterface[] {
    const result: MemberInterface[] = [];
    const members: {[key: string]: MemberInterface} = Member.getMembers();

    for (const key in members) {
      result.push(members[key]);
    }
    return result;
  }
}
