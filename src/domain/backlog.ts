import {getFilesInDirectory, read, write} from "../utils/file";
import {formatDate} from "../utils/dateformat";
import {Member, MemberInterface} from "./member";

export interface BacklogInterface {
  readonly date: string
  readonly body: string
  readonly account: string
}

export interface BacklogIndexInterface {
  readonly date: string
  readonly member: string
}

export class Backlog implements BacklogInterface {
  constructor(readonly date: string, readonly body: string, readonly account: string) {
  }

  public save() {
    const dtStr: string = formatDate(new Date(), "YYYY-MM-DD");
    write(this.body, `${dtStr}.txt`, `./backlog/${this.account}`);
  }

  /**
   * 当日日付で作成する
   * @param body
   * @param account
   * @constructor
   */
  static createTodayMinutes(body: string, account: string) {
    const dtStr: string = formatDate(new Date(), "YYYY-MM-DD")

    return new Backlog(dtStr, body, account)
  }

  /**
   * 議事録一覧を取得 (メンバーとタイトルのみ)
   */
  static async loadMinutesIndex(): Promise<BacklogIndexInterface[]> {
    const result: BacklogIndexInterface[] = [];
    const members: MemberInterface[] = Member.getMemberArray()

    for (const member of members) {
      const files: string[] = await getFilesInDirectory(`./backlog/${member.account}`);
      files.forEach((file) => {
        // 実施日は拡張子を除いて取得
        const date: string = file.split(".")[0];
        result.push({member: member.account, date});
      });
    }
    return result;
  }
  /**
   * 指定した議事録を取得する
   * @param member
   * @param date
   */
  static async find(member: string, date: string): Promise<BacklogInterface> {
    const body: string = read(`./backlog/${member}/${date}.txt`);
    return {
      account: member,
      body,
      date
    }
  }
}

