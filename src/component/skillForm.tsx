import React, {CSSProperties, useState} from 'react';
import { Tab, Tabs, Table, Form } from 'react-bootstrap';

const skillData = {
  management: {
    1: "・ タスクの進捗管理やスケジュールの把握ができる。\n"+
       "・ メンバーに対して基本的な指示やフィードバックができる。\n"+
       "・ 問題が発生した際に上司や他のチームメンバーに報告し、サポートを求めることができる。",
    2: "・プロジェクト全体の進行管理ができる。\n"+
       "・ チームメンバーの能力を評価し、適切な役割分担を行う。\n"+
       "・ コンフリクトを円満に解決するためのスキルを持つ。",
    3: "・ プロジェクトの戦略的計画と目標を立案し、チームに展望を示す。\n"+
       "・ チームメンバーの成長を促進するための指導やトレーニングを行う。\n"+
       "・ 他の部門や上司との協力関係を築き、プロジェクトを成功に導く。",
  },
  communication: {
    1: "・ 基本的な意思疎通ができる。\n"+
       "・ 必要な情報を的確に伝えることができる。",
    2: "・ 聴取力や共感力があり、他のメンバーとのコミュニケーションに工夫を凝らす。\n"+
       "・ 意見や提案を適切に伝えることができる。",
    3: "・ 複数のステークホルダーと複雑な問題を解決するための効果的な意思疎通を実現する。\n"+
       "・ 複雑な情報や意見を明確かつ効果的に伝えることができる。"
  },
  problemSolving: {
    1: "・ 簡単な課題に対して具体的な対処方法を見つける。\n"+
       "・ 上司や先輩の指示に従って問題を解決する。",
    2: "・ 複雑な課題に対して論理的に分析し、原因を特定する。\n"+
       "・ 複数の解決策を検討し、最適な解決策を選択する。",
    3: "・ 複雑な課題に対して独自のアプローチを立案し、実行する。\n"+
       "・ 問題解決のプロセスを改善し、将来の課題にも対応できる体制を築く。",
  },
  jobSkill: {
    1: "・ 基本的な技術スキルを持っている。\n"+
       "・ 指示に従って基本的な業務を遂行できる。",
    2: "・ 業務に関連する専門的な知識やスキルを持っている。\n"+
       "・ 他のメンバーに技術的なサポートを提供できる。",
    3: "・ 高度な専門知識やスキルを持っており、問題解決に応用できる。\n"+
       "・ 技術的なリーダーシップを発揮し、チーム全体の成果を向上させる。",
  }
};

// 日本語置換テーブル
const jaTable: {[key:string]: string} = {
  "management": "マネジメント",
  "communication": "コミュニケーション",
  "problemSolving": "課題解決能力",
  "jobSkill": "職務技能",
}

/**
 * 改行文字列を<br/>に変換する
 * @param text
 */
const insertLineBreaks = (text) => {
  return text.split('\n').map((str, index) => (
    <React.Fragment key={index}>
      {str}
      <br />
    </React.Fragment>
  ));
};

/**
 * SkillFormProps
 * @interface
 */
export interface SkillFormProps {
  management: number,
  communication: number,
  problemSolving: number,
  jobSkill: number
  handleOnChange(management: number, communication: number, problemSolving: number, jobSkill: number): void
}

export const SkillForm: React.FC<SkillFormProps> = (props) => {
  const [selectedLevels, setSelectedLevels] = useState({
    management: props.management || 0,
    communication: props.communication || 0,
    problemSolving: props.problemSolving || 0,
    jobSkill: props.jobSkill || 0
  });

  const handleLevelChange = (key, value) => {
    setSelectedLevels({
      ...selectedLevels,
      [key]: value,
    });
    props.handleOnChange(selectedLevels.management, selectedLevels.communication, selectedLevels.problemSolving, selectedLevels.jobSkill);
  };

  const selectedStyle: CSSProperties = {
    border: "5px solid #5aa9f6",
    cursor: "pointer"
  }

  return (
    <Tabs defaultActiveKey="management" id="skills-tabs">
      {Object.keys(skillData).map((key) => (
        <Tab key={key} eventKey={key} title={`${jaTable[key]}`}>
          <Table striped bordered>
            <thead>
            <tr>
              <th>Level</th>
              <th>Indicator</th>
            </tr>
            </thead>
            <tbody>
            {Object.keys(skillData[key]).map((level) => (
              <tr
                key={level}
                onClick={() => handleLevelChange(key, level)} // 行がクリックされたら選択されたレベルを更新
                style={selectedLevels[key] === level? selectedStyle : null} // 選択されたレベルに応じたスタイルを追加
              >
                <td>{level}</td>
                <td>{insertLineBreaks(skillData[key][level])}</td>
              </tr>
            ))}
            </tbody>
          </Table>
        </Tab>
      ))}
    </Tabs>
  );
};
