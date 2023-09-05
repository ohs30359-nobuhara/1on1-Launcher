import {write, read} from "../utils/file";
import {Skill, SkillInterface} from "./skill";
import {Priority, PriorityInterface} from "./priority";

export interface MemberInterface {
  readonly account: string
  // 職位
  role?: string
  // 担当領域
  position?: string
  // キャリア: 本人の意向
  personalPreference?: string
  // 育成方針
  growthStrategy?: string
  // ギャップフィル
  closingTheGap?: string
  // スキル評価
  skillSet?: SkillInterface
  // 価値観
  priority?: PriorityInterface
  // 備考
  remarks?: string
}

export class Member implements MemberInterface {
  constructor(
    readonly account: string,
    public role?: string, // 職位
    public position?: string, // 担当領域
    public personalPreference?: string, // キャリア本人の意向
    public growthStrategy?: string, // 育成方針
    public closingTheGap?: string, // ギャップフィル
    public skillSet?: SkillInterface, // スキル評価
    public priority?: PriorityInterface, // 価値観
    public remarks?: string, // 備考
) {}

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
