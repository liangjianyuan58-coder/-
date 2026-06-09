export const questions = [
  // ===== MBTI: E vs I =====
  {
    id: 1, category: 'mbti', dimension: 'EI', section: 'MBTI (1/4)',
    text: '週末、エネルギーが回復するのは？',
    options: [
      { label: '友人や家族と過ごす', value: 'E' },
      { label: '一人でゆっくり過ごす', value: 'I' },
    ],
  },
  {
    id: 2, category: 'mbti', dimension: 'EI', section: 'MBTI (1/4)',
    text: '初対面の場では？',
    options: [
      { label: '積極的に話しかける', value: 'E' },
      { label: '相手から話しかけられるまで待つ', value: 'I' },
    ],
  },
  // ===== MBTI: N vs S =====
  {
    id: 3, category: 'mbti', dimension: 'NS', section: 'MBTI (2/4)',
    text: '物事を判断するとき、重視するのは？',
    options: [
      { label: '具体的な事実と実績', value: 'S' },
      { label: '将来の可能性とアイデア', value: 'N' },
    ],
  },
  {
    id: 4, category: 'mbti', dimension: 'NS', section: 'MBTI (2/4)',
    text: '未来のことを考えるとき？',
    options: [
      { label: '現実的・実務的に考える', value: 'S' },
      { label: 'ワクワクするビジョンを描く', value: 'N' },
    ],
  },
  // ===== MBTI: T vs F =====
  {
    id: 5, category: 'mbti', dimension: 'TF', section: 'MBTI (3/4)',
    text: '決断するとき、優先するのは？',
    options: [
      { label: '論理と客観的な分析', value: 'T' },
      { label: '人の気持ちと価値観', value: 'F' },
    ],
  },
  {
    id: 6, category: 'mbti', dimension: 'TF', section: 'MBTI (3/4)',
    text: '人から相談を受けたとき、まず？',
    options: [
      { label: '解決策や改善案を提示する', value: 'T' },
      { label: '気持ちに寄り添い共感する', value: 'F' },
    ],
  },
  // ===== MBTI: J vs P =====
  {
    id: 7, category: 'mbti', dimension: 'JP', section: 'MBTI (4/4)',
    text: '計画について、どちらが自分に近い？',
    options: [
      { label: '決めたスケジュール通りに進めたい', value: 'J' },
      { label: '状況に応じて柔軟に対応したい', value: 'P' },
    ],
  },
  {
    id: 8, category: 'mbti', dimension: 'JP', section: 'MBTI (4/4)',
    text: '仕事の仕上げは？',
    options: [
      { label: '早めに終わらせてスッキリしたい', value: 'J' },
      { label: 'ギリギリまで磨き続けたい', value: 'P' },
    ],
  },
  // ===== 脳タイプ (4問) =====
  {
    id: 9, category: 'brain', brainType: 'systemizing', section: '脳タイプ診断',
    text: '機械や仕組みの構造を分析・理解するのが好きだ',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  {
    id: 10, category: 'brain', brainType: 'empathizing', section: '脳タイプ診断',
    text: '相手の些細な表情や仕草から感情を読み取れる',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  {
    id: 11, category: 'brain', brainType: 'systemizing', section: '脳タイプ診断',
    text: 'データや数字から法則・パターンを見つけるのが得意だ',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  {
    id: 12, category: 'brain', brainType: 'empathizing', section: '脳タイプ診断',
    text: '誰かが悩んでいると、自分も気持ちが重くなる',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  // ===== 性格特性 Big Five (C & N) =====
  {
    id: 13, category: 'bigfive', bigFiveType: 'C', section: '性格特性',
    text: '約束や締め切りをしっかり守ることが得意だ',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  {
    id: 14, category: 'bigfive', bigFiveType: 'N', section: '性格特性',
    text: '仕事の悩みや不安がなかなか頭から離れないことがある',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  {
    id: 15, category: 'bigfive', bigFiveType: 'C', section: '性格特性',
    text: '物事を整理・計画してから行動することが得意だ',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  {
    id: 16, category: 'bigfive', bigFiveType: 'N', section: '性格特性',
    text: '批判されたり失敗すると、気持ちを切り替えるのに時間がかかる',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  // ===== 仕事の価値観 =====
  {
    id: 17, category: 'values', section: '仕事の価値観',
    text: '仕事に最も求めることは？',
    options: [
      { label: '成長・スキルアップ・新しい挑戦', value: 'growth' },
      { label: '安定・長期雇用・安心できる環境', value: 'stability' },
      { label: '自由・自律・自分のペースで動ける裁量', value: 'autonomy' },
      { label: '誰かへの貢献・感謝・人とのつながり', value: 'contribution' },
    ],
  },
  {
    id: 18, category: 'values', section: '仕事の価値観',
    text: '「報われた」と最も感じるのは？',
    options: [
      { label: '目標を達成して成果が出たとき', value: 'achievement' },
      { label: 'チームや仲間と良い仕事ができたとき', value: 'teamwork' },
      { label: '自分の専門性・スキルが認められたとき', value: 'mastery' },
      { label: '誰かの役に立てたと実感したとき', value: 'impact' },
    ],
  },
  {
    id: 19, category: 'values', section: '仕事の価値観',
    text: '5年後、どうありたい？',
    options: [
      { label: '専門家・プロとして高く評価されたい', value: 'expert' },
      { label: 'リーダーとして人や組織を動かしたい', value: 'leader' },
      { label: '安心できる環境でコツコツ貢献し続けたい', value: 'stable' },
      { label: '社会や誰かへの影響を持つ仕事をしたい', value: 'mission' },
    ],
  },
  // ===== 仕事スタイル =====
  {
    id: 20, category: 'management', trait: 'communication', section: '仕事スタイル',
    text: '意見や要求を伝えるとき、あなたは？',
    options: [
      { label: '直接・率直に伝える', value: 'direct' },
      { label: '相手の様子を見ながら伝える', value: 'indirect' },
    ],
  },
  {
    id: 21, category: 'management', trait: 'motivation', section: '仕事スタイル',
    text: '最もモチベーションが上がるのは？',
    options: [
      { label: '高い目標を達成したとき', value: 'achievement' },
      { label: '誰かに感謝・貢献できたとき', value: 'recognition' },
      { label: '自分のやり方で自由に進められるとき', value: 'autonomy' },
    ],
  },
  {
    id: 22, category: 'management', trait: 'feedback', section: '仕事スタイル',
    text: '批判や厳しいフィードバックを受けたとき？',
    options: [
      { label: '事実として受け取り、すぐ改善する', value: 'logical' },
      { label: '感情的になることがある', value: 'emotional' },
      { label: '時間をかけて内省・消化する', value: 'reflective' },
    ],
  },
  {
    id: 23, category: 'management', trait: 'role', section: '仕事スタイル',
    text: 'チームの中で自然と担う役割は？',
    options: [
      { label: 'リーダー・意思決定者', value: 'leader' },
      { label: 'サポーター・調整役', value: 'supporter' },
      { label: '専門家・実行者', value: 'expert' },
    ],
  },
  // ===== コンフリクトスタイル =====
  {
    id: 24, category: 'conflict', section: '仕事スタイル',
    text: '意見の対立が起きたとき、自分に最も近い行動は？',
    options: [
      { label: '自分の意見を主張し、議論で正しい答えを出す', value: 'competing' },
      { label: 'お互いが納得できる解決策を一緒に探す', value: 'collaborating' },
      { label: 'お互いが少し譲り合える妥協点を見つける', value: 'compromising' },
      { label: 'チームの意向を優先して合わせる', value: 'accommodating' },
    ],
  },
]
