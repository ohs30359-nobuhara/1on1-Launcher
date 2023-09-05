export interface PriorityInterface {
  skillUp: number
  financialStability: number
  workLifeBalance: number
  engagementAndFulfillment: number
  socialContribution: number
  popularity: number
}

export class Priority implements PriorityInterface {
  constructor(
    public engagementAndFulfillment: number,
    public financialStability: number,
    public popularity, public skillUp,
    public socialContribution,
    public workLifeBalance) {
  }
}
