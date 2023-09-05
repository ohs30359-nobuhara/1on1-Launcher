export interface SkillInterface {
  management: number
  problemSolving: number
  communication: number
  jobSkill: number
}

export class Skill implements SkillInterface {
  constructor(
    public communication: number,
    public jobSkill: number,
    public management: number,
    public problemSolving: number) {
  }

  static getSkillIndex(): string[] {
    return ["management", "problemSolving", "communication", "jobSkill"]
  }
}
