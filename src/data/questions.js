export const questions = [
  // ===== MBTI: E vs I =====
  {
    id: 1,
    category: 'mbti',
    dimension: 'EI',
    section: 'MBTI (1/4)',
    text: '週末、エネルギーが回復するのは？',
    options: [
      { label: '友人や家族と過ごす', value: 'E' },
      { label: '一人でゆっくり過ごす', value: 'I' },
    ],
  },
  {
    id: 2,
    category: 'mbti',
    dimension: 'EI',
    section: 'MBTI (1/4)',
    text: '初対面の場では？',
    options: [
      { label: '積極的に話しかける', value: 'E' },
      { label: '相手から話しかけられるまで待つ', value: 'I' },
    ],
  },
  // ===== MBTI: N vs S =====
  {
    id: 3,
    category: 'mbti',
    dimension: 'NS',
    section: 'MBTI (2/4)',
    text: '物事を判断するとき、重視するのは？',
    options: [
      { label: '具体的な事実と実績', value: 'S' },
      { label: '将来の可能性とアイデア', value: 'N' },
    ],
  },
  {
    id: 4,
    category: 'mbti',
    dimension: 'NS',
    section: 'MBTI (2/4)',
    text: '未来のことを考えるとき？',
    options: [
      { label: '現実的・実務的に考える', value: 'S' },
      { label: 'ワクワクするビジョンを描く', value: 'N' },
    ],
  },
  // ===== MBTI: T vs F =====
  {
    id: 5,
    category: 'mbti',
    dimension: 'TF',
    section: 'MBTI (3/4)',
    text: '決断するとき、優先するのは？',
    options: [
      { label: '論理と客観的な分析', value: 'T' },
      { label: '人の気持ちと価値観', value: 'F' },
    ],
  },
  {
    id: 6,
    category: 'mbti',
    dimension: 'TF',
    section: 'MBTI (3/4)',
    text: '人から相談を受けたとき、まず？',
    options: [
      { label: '解決策や改善案を提示する', value: 'T' },
      { label: '気持ちに寄り添い共感する', value: 'F' },
    ],
  },
  // ===== MBTI: J vs P =====
  {
    id: 7,
    category: 'mbti',
    dimension: 'JP',
    section: 'MBTI (4/4)',
    text: '計画について、どちらが自分に近い？',
    options: [
      { label: '決めたスケジュール通りに進めたい', value: 'J' },
      { label: '状況に応じて柔軟に対応したい', value: 'P' },
    ],
  },
  {
    id: 8,
    category: 'mbti',
    dimension: 'JP',
    section: 'MBTI (4/4)',
    text: '仕事の仕上げは？',
    options: [
      { label: '早めに終わらせてスッキリしたい', value: 'J' },
      { label: 'ギリギリまで磨き続けたい', value: 'P' },
    ],
  },
  // ===== 脳タイプ =====
  {
    id: 9,
    category: 'brain',
    brainType: 'systemizing',
    section: '脳タイプ診断',
    text: '機械や仕組みの構造を分析・理解するのが好きだ',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  {
    id: 10,
    category: 'brain',
    brainType: 'empathizing',
    section: '脳タイプ診断',
    text: '相手の些細な表情や仕草から感情を読み取れる',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  {
    id: 11,
    category: 'brain',
    brainType: 'systemizing',
    section: '脳タイプ診断',
    text: 'データや数字から法則・パターンを見つけるのが得意だ',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  {
    id: 12,
    category: 'brain',
    brainType: 'empathizing',
    section: '脳タイプ診断',
    text: '友人が落ち込んでいると、自分も気持ちが沈む',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  {
    id: 13,
    category: 'brain',
    brainType: 'systemizing',
    section: '脳タイプ診断',
    text: 'ルールやシステムを整理・体系化することが好きだ',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  {
    id: 14,
    category: 'brain',
    brainType: 'empathizing',
    section: '脳タイプ診断',
    text: '話しながら、相手がどう感じているか常に気になる',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  // ===== マネジメント =====
  {
    id: 15,
    category: 'management',
    trait: 'communication',
    section: 'マネジメント適性',
    text: '意見や要求を伝えるとき、あなたは？',
    options: [
      { label: '直接・率直に伝える', value: 'direct' },
      { label: '相手の様子を見ながら伝える', value: 'indirect' },
    ],
  },
  {
    id: 16,
    category: 'management',
    trait: 'motivation',
    section: 'マネジメント適性',
    text: '最もモチベーションが上がるのは？',
    options: [
      { label: '高い目標を達成したとき', value: 'achievement' },
      { label: '誰かに感謝・貢献できたとき', value: 'recognition' },
      { label: '自分のやり方で自由に進められるとき', value: 'autonomy' },
    ],
  },
  {
    id: 17,
    category: 'management',
    trait: 'stress',
    section: 'マネジメント適性',
    text: '困難な状況に直面したとき？',
    options: [
      { label: '問題に正面から立ち向かう', value: 'fight' },
      { label: '一旦距離を置いて冷静になる', value: 'flight' },
      { label: '誰かに話して気持ちを整理する', value: 'talk' },
    ],
  },
  {
    id: 18,
    category: 'management',
    trait: 'feedback',
    section: 'マネジメント適性',
    text: '批判や厳しいフィードバックを受けたとき？',
    options: [
      { label: '事実として受け取り、すぐ改善する', value: 'logical' },
      { label: '感情的になることがある', value: 'emotional' },
      { label: '時間をかけて内省・消化する', value: 'reflective' },
    ],
  },
  {
    id: 19,
    category: 'management',
    trait: 'role',
    section: 'マネジメント適性',
    text: 'チームの中で自然と担う役割は？',
    options: [
      { label: 'リーダー・意思決定者', value: 'leader' },
      { label: 'サポーター・調整役', value: 'supporter' },
      { label: '専門家・実行者', value: 'expert' },
    ],
  },
  {
    id: 20,
    category: 'management',
    trait: 'learning',
    section: 'マネジメント適性',
    text: '新しいことを習得するとき、好きなスタイルは？',
    options: [
      { label: '理論・全体像から把握する', value: 'theory' },
      { label: '実際にやりながら覚える', value: 'practice' },
      { label: '人から直接教わる', value: 'social' },
    ],
  },
]
