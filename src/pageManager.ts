import {JSX} from "react";
import {PageKey} from "./pageKey";

export interface PageOption {
  menuIcon: JSX.Element,
  menuTitle: string,
  component: JSX.Element
  key: PageKey
}

class PageManager {
  private pages: Map<PageKey, PageOption>
  private changeHandler: (page: PageOption) => void

  constructor() {
    this.pages = new Map();
    this.changeHandler = () => {};
  }


  setOption(pages: Array<PageOption>, changeHandler: (page: PageOption) => void): void {
    pages.forEach(p => this.pages.set(p.key, p));
    this.changeHandler = changeHandler
  }

  change(key: PageKey): void {
    const op: PageOption | undefined = this.pages.get(key);

    if (!op) {
      console.error(`${key} is not found`);
      return;
    }
    this.changeHandler(op);
  }

  getPage(): PageOption[] {
    return Array.from(this.pages.values());
  }
}

export const pageManager: PageManager = new PageManager();
