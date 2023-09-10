import React, {CSSProperties, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {eventEmitter} from "../core/eventEmitter";
import {IpcEventKey} from "../enum";
import {SaveMemberEvent} from "../events/saveMember";
import {PointsDistributionComponent} from "../component/pointsDistribution";
import {SkillForm} from "../component/skillForm";
import {MemberInterface} from "../domain/member";
import {SkillInterface} from "../domain/skill";
import {PriorityInterface} from "../domain/priority";

export interface EditMemberProps {
  member?: MemberInterface
}

export const EditMember: React.FC<EditMemberProps> = (props) => {
  const initSkill: SkillInterface = {
    communication: 0, jobSkill: 0, management: 0, problemSolving: 0
  }

  const initPriority: PriorityInterface = {
    engagementAndFulfillment: 0,
    financialStability: 0,
    popularity: 0,
    skillUp: 0,
    socialContribution: 0,
    workLifeBalance: 0
  }

  const initMember: MemberInterface = {
    account: "",
    skillSet: initSkill,
    priority: initPriority
  }

  const [member, setMember] = useState<MemberInterface>(props.member? props.member : initMember );

  const handleSave = async () => {
    const event: SaveMemberEvent = {
      key: IpcEventKey.SaveMember,
      params: member
    }

    if (!await eventEmitter(event)) {
      return alert("登録に失敗しました");
    }
    alert("登録完了しました");
  }

  const headlineCss: CSSProperties = {
    borderBottom: "1px solid",
    paddingBottom: "15px",
    marginBottom: "15px"
  }

  return (
    <Container className="my-4 mt-4">
      <Form>
        <h3 style={headlineCss}>基本情報</h3>
        <Form.Group className="mb-3">
          <Form.Label>■ アカウント</Form.Label>
          <Form.Control type="text" value={member.account} onChange={(e) => setMember({ ...member, account: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>■ 職位</Form.Label>
          <Form.Control type="text" value={member.role} onChange={(e) => setMember({ ...member, role: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>■ 担当領域</Form.Label>
          <Form.Control type="text" value={member.position} onChange={(e) => setMember({ ...member, position: e.target.value })}  />
        </Form.Group>

        <h3 style={headlineCss}>キャリア</h3>
        <Form.Group className="mb-3">
          <Form.Label>■ 本人の意向</Form.Label>
          <Form.Control as="textarea" rows={3} value={member.personalPreference} onChange={(e) => setMember({ ...member, personalPreference: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>■ 育成方針</Form.Label>
          <Form.Control as="textarea" rows={3} value={member.growthStrategy} onChange={(e) => setMember({ ...member, growthStrategy: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>■ ギャップフィルと対策</Form.Label>
          <Form.Control as="textarea" rows={3} value={member.closingTheGap} onChange={(e) => setMember({ ...member, closingTheGap: e.target.value })} />
        </Form.Group>

        <h3 style={headlineCss}>能力</h3>

        <Form.Group className="mb-3">
          <Form.Label>■ スキル評価</Form.Label>
          <PointsDistributionComponent
            maxPoints={10}
            items={[
              { key: "skillUp", value: member.priority.skillUp, label: "スキルアップ" },
              { key: "financialStability", value: member.priority.financialStability, label: "経済的安定性" },
              { key: "workLifeBalance", value: member.priority.workLifeBalance, label: "ワークライフバランス" },
              { key: "engagementAndFulfillment", value: member.priority.engagementAndFulfillment, label: "面白さ、やりがい" },
              { key: "socialContribution", value: member.priority.socialContribution, label: "社会貢献" },
              { key: "popularity", value: member.priority.popularity, label: "知名度" }
            ]}
            onItemAllocationChange={(allocations) => {
              setMember({ ...member, priority: {
                  skillUp: allocations["skillUp"],
                  financialStability: allocations["financialStability"],
                  workLifeBalance: allocations["workLifeBalance"],
                  engagementAndFulfillment: allocations["engagementAndFulfillment"],
                  socialContribution: allocations["socialContribution"],
                  popularity: allocations["popularity"],
                }});
            }}>
          </PointsDistributionComponent>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>評価</Form.Label>
          <Form.Control as="textarea" rows={3}  onChange={(e) => setMember({ ...member, skillAssessment: e.target.value })}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>■ プライオリティ</Form.Label>
          <SkillForm
            problemSolving={member.skillSet.problemSolving}
            jobSkill={member.skillSet.jobSkill}
            communication={member.skillSet.communication}
            management={member.skillSet.management}
            handleOnChange={(problem, job, comm, mana) => {
              setMember({ ...member, skillSet: {
                  problemSolving: problem,
                  jobSkill: job,
                  communication: comm,
                  management: mana
              }});
            }}
          ></SkillForm>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>詳細</Form.Label>
          <Form.Control as="textarea" rows={3}  onChange={(e) => setMember({ ...member, priorityMemo: e.target.value })}/>
        </Form.Group>

        <h3 style={headlineCss}>備考</h3>

        <Form.Group className="mb-3">
          <Form.Control as="textarea" rows={3} value={member.remarks} onChange={(e) => setMember({ ...member, remarks: e.target.value })} />
        </Form.Group>

      </Form>

      <Button variant="primary" onClick={handleSave} className="save-button">
        保存する
      </Button>
    </Container>
  )
}
