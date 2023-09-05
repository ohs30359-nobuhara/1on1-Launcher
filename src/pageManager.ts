import {JSX} from "react";
import {Enum} from "./enum";

export interface PageOption {
  component: JSX.Element
  key: Enum
  menu?: {
    menuIcon: JSX.Element,
    menuTitle: string,
  }
}

class PageManager {
  private pages: Map<Enum, PageOption>
  private changeHandler: (page: JSX.Element, props: any) => void

  constructor() {
    this.pages = new Map();
    this.changeHandler = () => {};
  }


  setOption(pages: Array<PageOption>, changeHandler: (page: JSX.Element, props: any) => void): void {
    pages.forEach(p => this.pages.set(p.key, p));
    this.changeHandler = changeHandler
  }

  change<T=any>(key: Enum, props?: T): void {
    const op: PageOption | undefined = this.pages.get(key);

    if (!op) {
      console.error(`${key} is not found`);
      return;
    }
    this.changeHandler(op.component, props || null);
  }

  getPage(): PageOption[] {
    return Array.from(this.pages.values());
  }
}

export const pageManager: PageManager = new PageManager();
