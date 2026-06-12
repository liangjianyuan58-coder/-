import { questions } from './questions.js'

const byId = Object.fromEntries(questions.map(q => [q.id, q]))
const sq = (id) => byId[id]

// ── Extra questions (detailed-only, IDs 25-46) ───────────────────────

const extra = [
  // ===== MBTI E/I 拡張 =====
  {
    id: 25, category: 'mbti', dimension: 'EI', section: 'MBTI (1/4)',
    text: '話し合いで解決策を考えるとき？',
    options: [
      { label: '声に出しながら考える', value: 'E' },
      { label: '頭の中でまとめてから話す', value: 'I' },
    ],
  },
  {
    id: 26, category: 'mbti', dimension: 'EI', section: 'MBTI (1/4)',
    text: '新しい環境や職場に慣れるのは？',
    options: [
      { label: 'すぐ打ち解けて馴染める', value: 'E' },
      { label: '慣れるまでは少し時間がかかる', value: 'I' },
    ],
  },
  // ===== MBTI Ni/Ne 拡張 =====
  {
    id: 27, category: 'mbti', dimension: 'NiNe', section: 'MBTI (2/4)',
    text: '考えごとの結論について、当てはまるのは？',
    options: [
      { label: '考え続けると、ある時ふっと「答えはこれだ」という確信が降りてくる', value: 'Ni' },
      { label: '考えるほど選択肢が増えて、一つに決めるのが惜しくなる', value: 'Ne' },
    ],
  },
  {
    id: 28, category: 'mbti', dimension: 'FiFe', section: 'MBTI (2/4)',
    text: 'グループで食事の店を決めるとき、内心に近いのは？',
    options: [
      { label: '自分の食べたいものがあり、できればそれを通したい', value: 'Fi' },
      { label: 'みんなが楽しめるなら、店は本当にどれでもいい', value: 'Fe' },
    ],
  },
  // ===== MBTI T/F 拡張 =====
  {
    id: 29, category: 'mbti', dimension: 'TF', section: 'MBTI (3/4)',
    text: '仕事の優先順位を決めるとき？',
    options: [
      { label: '効率と成果を最大化する観点で決める', value: 'T' },
      { label: '関わる人への影響を考慮して決める', value: 'F' },
    ],
  },
  {
    id: 30, category: 'mbti', dimension: 'TF', section: 'MBTI (3/4)',
    text: '正しいことと場の雰囲気が対立したら？',
    options: [
      { label: '筋を通して正しいことを主張する', value: 'T' },
      { label: '関係性を保つ方向を優先する', value: 'F' },
    ],
  },
  // ===== MBTI Ni/Ne・Fi/Fe 拡張 =====
  {
    id: 31, category: 'mbti', dimension: 'NiNe', section: 'MBTI (4/4)',
    text: 'プロジェクトの初期段階で、自然にやってしまうのは？',
    options: [
      { label: '最終的な完成形・全体像を先にイメージして、そこから逆算する', value: 'Ni' },
      { label: 'とりあえず手を動かして、可能性をいくつも試しながら形を探る', value: 'Ne' },
    ],
  },
  {
    id: 32, category: 'mbti', dimension: 'FiFe', section: 'MBTI (4/4)',
    text: '友人の相談に乗るとき、自然な姿勢は？',
    options: [
      { label: '「自分ならこうする」と自分軸で答えを伝えたくなる', value: 'Fi' },
      { label: '相手が本当に望んでいることを読んで、それに沿いたくなる', value: 'Fe' },
    ],
  },
  // ===== Big Five O（開放性）=====
  {
    id: 33, category: 'bigfive', bigFiveType: 'O', section: '性格特性',
    text: '新しいアイデアや理論を学ぶことが好きだ',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  {
    id: 34, category: 'bigfive', bigFiveType: 'O', section: '性格特性',
    text: '型にはまらない実験的なアプローチに興味がある',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  // ===== Big Five A（協調性）=====
  {
    id: 35, category: 'bigfive', bigFiveType: 'A', section: '性格特性',
    text: '人の立場に立って、思いやりを持って接することが得意だ',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  {
    id: 36, category: 'bigfive', bigFiveType: 'A', section: '性格特性',
    text: 'チームの利益のために、自分の主張を引っ込めることができる',
    options: [
      { label: 'そう思う', value: 2 },
      { label: 'どちらとも言えない', value: 1 },
      { label: 'そう思わない', value: 0 },
    ],
  },
  // ===== 仕事の価値観 拡張 =====
  {
    id: 37, category: 'values', section: '仕事の価値観',
    text: '仕事での「評価・認められ方」で大切なのは？',
    options: [
      { label: '成果・スキルに応じた公平な評価制度', value: 'fairness' },
      { label: '仕事の専門性・裁量の高さ', value: 'expertise' },
      { label: '職場の文化・雰囲気・人間関係', value: 'culture' },
      { label: '収入・安定・福利厚生', value: 'compensation' },
    ],
  },
  {
    id: 38, category: 'values', section: '仕事の価値観',
    text: '理想の上司のタイプは？',
    options: [
      { label: '明確なゴールと期待を示してくれるリーダー', value: 'directive_boss' },
      { label: '自分のペースで任せてくれる放任型', value: 'laissez_boss' },
      { label: '困ったときに頼れるメンター', value: 'mentor_boss' },
      { label: '成長を一緒に考えてくれるコーチ', value: 'coach_boss' },
    ],
  },
  // ===== 意思決定スタイル（Rowe's Model ベース）=====
  {
    id: 39, category: 'decision', section: '思考スタイル',
    text: '重要な決断をするとき、あなたは？',
    options: [
      { label: 'データや情報を十分に集めて分析してから決める', value: 'analytical' },
      { label: '直感や過去の経験を信頼して素早く決める', value: 'directive' },
      { label: '多くの人の意見を聞いてから決める', value: 'behavioral' },
      { label: '長期的な影響や可能性を考えてから決める', value: 'conceptual' },
    ],
  },
  {
    id: 40, category: 'decision', section: '思考スタイル',
    text: '解決策を考えるとき？',
    options: [
      { label: '一つの最善策を論理的に絞り込む', value: 'analytical' },
      { label: '多くのアイデアを広げて可能性を探る', value: 'conceptual' },
      { label: '実績・前例のある確実な方法を選ぶ', value: 'directive' },
      { label: 'チームが共感できるアイデアを優先する', value: 'behavioral' },
    ],
  },
  {
    id: 41, category: 'decision', section: '思考スタイル',
    text: '失敗や間違いから学ぶとき？',
    options: [
      { label: '原因を論理的に分析して再発防止策を立てる', value: 'analytical' },
      { label: '次は違うアプローチを大胆に試してみる', value: 'conceptual' },
      { label: '同じ状況での素早い判断基準を更新する', value: 'directive' },
      { label: '関係した人たちの気持ちや反応を聞く', value: 'behavioral' },
    ],
  },
  // ===== リーダーシップ傾向 =====
  {
    id: 42, category: 'leadership', section: 'リーダーシップ',
    text: 'チームをまとめるとき、最も自然にできることは？',
    options: [
      { label: '明確なビジョンと指示でチームを引っ張る', value: 'directive' },
      { label: '全員が意見を言える場を作って合意を形成する', value: 'participative' },
      { label: '各自が自律的に動ける環境を整える', value: 'delegative' },
      { label: '一人ひとりの強みを見つけてサポートする', value: 'supportive' },
    ],
  },
  {
    id: 43, category: 'leadership', section: 'リーダーシップ',
    text: 'チームメンバーを成長させるとき、大切にするのは？',
    options: [
      { label: '明確な目標と期限を設定して結果にコミットさせる', value: 'directive' },
      { label: '一緒に考え、問いかけながらコーチングする', value: 'coaching' },
      { label: '失敗を恐れず挑戦できる環境を作る', value: 'delegative' },
      { label: 'その人の強みと価値に気づかせてモチベートする', value: 'supportive' },
    ],
  },
  // ===== 承認スタイル =====
  {
    id: 44, category: 'recognition', section: 'マネジメント詳細',
    text: '頑張りや成果を認めてもらうなら？',
    options: [
      { label: 'みんなの前で公式に称賛してほしい', value: 'public' },
      { label: '個別に直接言葉で伝えてほしい', value: 'private' },
      { label: '評価・報酬・昇進という形で示してほしい', value: 'tangible' },
      { label: 'どんな形でもあまり気にしない', value: 'flexible' },
    ],
  },
  // ===== ストレストリガー =====
  {
    id: 45, category: 'stress', stressType: 'trigger', section: 'マネジメント詳細',
    text: '最もストレスを感じやすい状況は？',
    options: [
      { label: '情報が少なく、先が見えない不確実な状況', value: 'ambiguity' },
      { label: '仕事が多すぎて優先順位がつけられない状況', value: 'overwhelm' },
      { label: '人間関係のトラブルや対立がある状況', value: 'interpersonal' },
      { label: '自分でコントロールできない状況', value: 'control' },
    ],
  },
  {
    id: 46, category: 'stress', stressType: 'sign', section: 'マネジメント詳細',
    text: 'ストレスが高まっているとき、出やすいサインは？',
    options: [
      { label: '口数が減り、一人で抱え込みがちになる', value: 'withdrawal' },
      { label: '完璧主義になって細部にこだわりすぎる', value: 'perfectionism' },
      { label: '感情的な反応が増え、苛立ちやすくなる', value: 'emotional' },
      { label: '先延ばしや回避が増える', value: 'avoidance' },
    ],
  },
]

// ── Interleaved order: group related questions together ──────────────

export const detailedQuestions = [
  // MBTI E/I (4 questions)
  sq(1), sq(2), extra[0], extra[1],
  // MBTI N/S (4 questions)
  sq(3), sq(4), extra[2], extra[3],
  // MBTI T/F (4 questions)
  sq(5), sq(6), extra[4], extra[5],
  // MBTI J/P (4 questions)
  sq(7), sq(8), extra[6], extra[7],
  // Brain type (4 questions)
  sq(9), sq(10), sq(11), sq(12),
  // Big Five (8 questions: C, N, O, A)
  sq(13), sq(14), sq(15), sq(16), extra[8], extra[9], extra[10], extra[11],
  // Work values (5 questions)
  sq(17), sq(18), sq(19), extra[12], extra[13],
  // Work style / management (4 questions)
  sq(20), sq(21), sq(22), sq(23),
  // Conflict style (1 question)
  sq(24),
  // Decision-making (3 questions)
  extra[14], extra[15], extra[16],
  // Leadership (2 questions)
  extra[17], extra[18],
  // Recognition (1 question)
  extra[19],
  // Stress triggers (2 questions)
  extra[20], extra[21],
]
