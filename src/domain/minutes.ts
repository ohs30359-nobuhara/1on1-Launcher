import {write} from "../utils/file";
import {formatDate} from "../utils/dateformat";

export class Minutes {
  constructor(readonly date: string, readonly body: string) {
  }

  public save() {
    const dtStr: string = formatDate(new Date(), "YYYY-MM-DD");
    write(this.body, `${dtStr}.json`, "./backlog");
  }

  /**
   * 当日日付で作成する
   * @param body
   * @constructor
   */
  static createTodayMinutes(body: string) {
    const dtStr: string = formatDate(new Date(), "YYYY-MM-DD")

    return new Minutes(dtStr, body)
  }
}

