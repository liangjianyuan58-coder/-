export const MBTI_TYPES = {
  INTJ: { name: '建築家', tagline: '戦略的・独立した思考家', color: '#6366f1' },
  INTP: { name: '論理学者', tagline: '革新的なアイデアの探求者', color: '#8b5cf6' },
  ENTJ: { name: '指揮官', tagline: '大胆で意志の強いリーダー', color: '#7c3aed' },
  ENTP: { name: '討論者', tagline: '知的な挑戦者・革新者', color: '#6d28d9' },
  INFJ: { name: '提唱者', tagline: '洞察力豊かなビジョナリー', color: '#0ea5e9' },
  INFP: { name: '仲介者', tagline: '詩的な理想主義者', color: '#22c55e' },
  ENFJ: { name: '主人公', tagline: 'カリスマ的インスパイアリーダー', color: '#f59e0b' },
  ENFP: { name: '活動家', tagline: '情熱的で自由な探求者', color: '#ef4444' },
  ISTJ: { name: '管理者', tagline: '信頼できる誠実な実行者', color: '#475569' },
  ISFJ: { name: '擁護者', tagline: '心温かき誠実な守護者', color: '#10b981' },
  ESTJ: { name: '幹部', tagline: '優れた管理者・統括者', color: '#3b82f6' },
  ESFJ: { name: '執政官', tagline: '社交的で細やかな気配り屋', color: '#ec4899' },
  ISTP: { name: '巨匠', tagline: '大胆な問題解決の職人', color: '#64748b' },
  ISFP: { name: '冒険家', tagline: '魅力的な感覚重視のアーティスト', color: '#84cc16' },
  ESTP: { name: '起業家', tagline: '精力的・即断即決の実践家', color: '#f97316' },
  ESFP: { name: 'エンターテイナー', tagline: '自発的でエネルギッシュな表現者', color: '#a855f7' },
}

const MANAGEMENT_LABELS = {
  communication: {
    direct:   { label: '直接型',   desc: 'ストレートな伝え方を好む' },
    indirect: { label: '協調型',   desc: '相手の反応に配慮しながら伝える' },
  },
  motivation: {
    achievement: { label: '目標達成型',   desc: '高い目標と達成感が原動力' },
    recognition: { label: '貢献・承認型', desc: '感謝と貢献感がパワーに' },
    autonomy:    { label: '自律型',       desc: '自由な裁量が最大のモチベーション' },
  },
  feedback: {
    logical:    { label: '分析型', desc: '事実ベースで即座に改善' },
    emotional:  { label: '感情型', desc: 'タイミングと言い方に敏感' },
    reflective: { label: '内省型', desc: 'ゆっくり時間をかけて消化' },
  },
  role: {
    leader:    { label: 'リーダー型',   desc: '決断・牽引する役割が得意' },
    supporter: { label: 'サポーター型', desc: 'チームの調和を支える縁の下の力持ち' },
    expert:    { label: '専門家型',     desc: '深い専門性で価値を出す' },
  },
}

const BIGFIVE_LABELS = {
  C: [
    { level: 'low',  label: '柔軟型',     desc: '形式よりスピード重視。リマインダーや短期ゴールの設定が効果的。' },
    { level: 'mid',  label: 'バランス型', desc: '状況に応じて計画的にも柔軟にも動ける。' },
    { level: 'high', label: '誠実型',     desc: '締め切り・約束を厳守。明確な期待値とプロセスが力を引き出す。' },
  ],
  N: [
    { level: 'low',  label: '安定型',       desc: 'プレッシャー下でも冷静。率直なフィードバックを受け入れやすい。' },
    { level: 'mid',  label: '中程度',       desc: '状況によってストレス反応が変わる。' },
    { level: 'high', label: '感受性高型',   desc: '批判や変化にストレスを感じやすい。承認と心理的安全が重要。' },
  ],
  O: [
    { level: 'low',  label: '実践型',     desc: '慣れ親しんだ方法を好む。変化には十分な準備期間と説明を。' },
    { level: 'mid',  label: 'バランス型', desc: '新しいことも慣れ親しんだことも適度に取り入れられる。' },
    { level: 'high', label: '探究型',     desc: '新しいアイデアや挑戦に燃える。ルーティン業務だけでは飽きやすい。' },
  ],
  A: [
    { level: 'low',  label: '独立型',     desc: '率直で議論を厭わない。意見の衝突を建設的に活かせる環境を。' },
    { level: 'mid',  label: 'バランス型', desc: '状況に応じて主張と協調を使い分けられる。' },
    { level: 'high', label: '協調型',     desc: '過度に他者に合わせる傾向。「あなたの意見は？」と明示的に引き出して。' },
  ],
}

const VALUES_LABELS = {
  growth:       { label: '成長・挑戦型',   desc: 'スキルアップと新しい挑戦が最大の動機。停滞すると離脱リスクが上がる。' },
  stability:    { label: '安定・安心型',   desc: '環境の安定と予測可能性を重視。急な変更は事前共有が必須。' },
  autonomy:     { label: '自律・専門型',   desc: '自分のペースと裁量を求める。過剰管理は逆効果になりやすい。' },
  contribution: { label: '貢献・関係型',   desc: '誰かの役に立てることが原動力。「ありがとう」が最大の報酬。' },
  achievement:  { label: '達成・成果型',   desc: '結果と評価を重視。明確なゴールと成果の見える化が有効。' },
  teamwork:     { label: '協調・チーム型', desc: 'チームの一体感を大切にする。孤立する環境は避ける。' },
  mastery:      { label: '専門・プロ型',   desc: '専門性を深めることにやりがい。マイクロマネジメントは禁物。' },
  impact:       { label: 'ミッション型',   desc: '仕事の意義・社会的影響を重視。目的のない指示には動きにくい。' },
  expert:       { label: '専門キャリア型', desc: '専門家として認められることが目標。技術的な挑戦に燃える。' },
  leader:       { label: 'リーダーキャリア型', desc: '将来的に人・組織を動かすことを志向。責任ある役割がモチベーション。' },
  stable:       { label: '長期貢献型',     desc: '長く安定して貢献することを重視。信頼関係の構築が大切。' },
  mission:      { label: 'ミッション志向型', desc: '社会的意義のある仕事に引かれる。仕事の意味づけが離職を防ぐ。' },
  exploration:  { label: '探究・知的好奇心型', desc: '知ること・理解すること自体が最大の動機。知的な刺激と自由な探索が力を引き出す。' },
}

const CONFLICT_LABELS = {
  competing:      { label: '主張・競合型', desc: '正しいと思ったことは主張する。意見の衝突を恐れない。' },
  collaborating:  { label: '協調・解決型', desc: '双方が納得できるWin-Winを丁寧に探す。合意形成に強い。' },
  compromising:   { label: '妥協・現実型', desc: 'お互いが少し譲り合う現実的な解を好む。スピーディな合意が得意。' },
  accommodating:  { label: '適応・配慮型', desc: 'チームの意向を優先する。自分の意見を言える環境づくりが大切。' },
}

const DECISION_LABELS = {
  analytical:  { label: '分析型',   icon: '🔬', desc: 'データ・論理を重視。慎重で丁寧。意思決定には十分な情報提供を。' },
  directive:   { label: '直感型',   icon: '⚡', desc: '経験と直感でスピード重視。情報の洪水は逆効果。シンプルに伝えて。' },
  conceptual:  { label: '構想型',   icon: '💡', desc: 'アイデアと長期視点。創造的な役割・新規事業に向いている。' },
  behavioral:  { label: '合意型',   icon: '🤝', desc: '人と合意を大切にする。コンセンサスに時間がかかることも。' },
}

const LEADERSHIP_LABELS = {
  directive:    { label: '指示型',   icon: '🎯', desc: '方向性を示してチームを牽引する。スピードと一貫性が強み。' },
  participative:{ label: '参加型',   icon: '🗳️', desc: 'メンバーの意見を集めて合意を形成する。心理的安全が高まる。' },
  delegative:   { label: '委任型',   icon: '🗽', desc: '自律性を尊重して任せる。メンバーの成熟度が高い場合に有効。' },
  coaching:     { label: 'コーチング型', icon: '🌱', desc: '一人ひとりの成長を支援する。時間がかかるが長期的な効果が高い。' },
  supportive:   { label: '支援型',   icon: '💛', desc: 'チームの感情・関係性を大切にする。心理的安全の醸成が得意。' },
}

const RECOGNITION_LABELS = {
  public:    { label: '公式称賛型',  icon: '📣', desc: 'みんなの前で認めてもらうことで自信とやる気が高まる。' },
  private:   { label: '個別承認型',  icon: '💬', desc: '1on1で直接言葉で伝えてもらう方が刺さる。大勢の前は照れる場合も。' },
  tangible:  { label: '実績評価型',  icon: '📊', desc: '評価・報酬・昇進という具体的な形が最もモチベーションになる。' },
  flexible:  { label: '承認無頓着型', icon: '😌', desc: '承認の形にこだわらない。仕事自体のやりがいで動いている。' },
}

const STRESS_TRIGGER_LABELS = {
  ambiguity:     { label: '不確実性',     desc: '情報・方向性が見えないとストレスが高まる' },
  overwhelm:     { label: 'タスク過多',   desc: '優先順位がつけられない状態が苦手' },
  interpersonal: { label: '人間関係',     desc: 'チームの摩擦や対立が特にダメージになる' },
  control:       { label: 'コントロール喪失', desc: '自分で決められない・動かせない状況がつらい' },
}

const STRESS_SIGN_LABELS = {
  withdrawal:    { label: '引きこもり',   desc: '口数が減り、一人で抱え込む' },
  perfectionism: { label: '過集中・完璧主義', desc: '細部にこだわりすぎて前に進めなくなる' },
  emotional:     { label: '感情的反応',   desc: '苛立ちや感情的な発言が増える' },
  avoidance:     { label: '回避・先延ばし', desc: 'タスクを後回しにして逃げる傾向が出る' },
}

// Work values: pick the most "management-meaningful" type from 3 answers
function inferWorkValues(answers) {
  const q17 = answers.find(a => a.id === 17)?.value
  const q18 = answers.find(a => a.id === 18)?.value
  const q19 = answers.find(a => a.id === 19)?.value

  // Priority: Q17 sets the primary frame, Q18/Q19 refine
  const primary = q17 || q18 || q19 || 'growth'
  const info = VALUES_LABELS[primary] || VALUES_LABELS.growth

  // Secondary signal from Q18/Q19 for richer description
  const secondary = [q18, q19].find(v => v && v !== primary)
  const secondaryInfo = secondary ? VALUES_LABELS[secondary] : null

  return { primary, secondary, label: info.label, desc: info.desc, secondaryInfo }
}

export function calculateResults(answers) {
  // MBTI — cognitive function scoring
  const raw = { E: 0, I: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, T: 0, F: 0, Fi: 0, Fe: 0 }
  answers.filter(a => a.category === 'mbti').forEach(a => {
    if (a.value in raw) raw[a.value]++
  })

  // Legacy fallback: old hash URLs stored 'N'/'S'/'J'/'P' directly
  const legacyN = answers.filter(a => a.category === 'mbti' && a.value === 'N').length
  const legacyS = answers.filter(a => a.category === 'mbti' && a.value === 'S').length
  const legacyJ = answers.filter(a => a.category === 'mbti' && a.value === 'J').length
  const legacyP = answers.filter(a => a.category === 'mbti' && a.value === 'P').length

  const nScore = raw.Ni + raw.Ne + legacyN
  const sScore = raw.Si + raw.Se + legacyS
  // J tendency: introverted perceiving (Ni, Si) + extraverted judging (Fe)
  // P tendency: extraverted perceiving (Ne, Se) + introverted judging (Fi)
  const jScore = raw.Ni + raw.Si + raw.Fe + legacyJ
  const pScore = raw.Ne + raw.Se + raw.Fi + legacyP

  const e = raw.E >= raw.I ? 'E' : 'I'
  const n = nScore >= sScore ? 'N' : 'S'
  const t = raw.T >= raw.F ? 'T' : 'F'
  const j = jScore >= pScore ? 'J' : 'P'
  const mbtiType = `${e}${n}${t}${j}`

  const dimensions = {
    E: raw.E, I: raw.I,
    N: nScore, S: sScore,
    T: raw.T, F: raw.F,
    J: jScore, P: pScore,
  }

  // Brain type
  let systemizing = 0, empathizing = 0
  answers.filter(a => a.category === 'brain').forEach(a => {
    if (a.brainType === 'systemizing') systemizing += a.value
    else empathizing += a.value
  })
  const totalBrain = systemizing + empathizing
  const maleBrainPct = totalBrain === 0 ? 50 : Math.round((systemizing / totalBrain) * 100)

  // Big Five (all axes — O and A only present in detailed mode)
  let cScore = 0, bfnScore = 0, oScore = 0, aScore = 0
  answers.filter(a => a.category === 'bigfive').forEach(a => {
    if (a.bigFiveType === 'C') cScore += a.value
    else if (a.bigFiveType === 'N') bfnScore += a.value
    else if (a.bigFiveType === 'O') oScore += a.value
    else if (a.bigFiveType === 'A') aScore += a.value
  })
  const lvl = (s, max) => s >= max ? 2 : s >= max / 2 ? 1 : 0
  const bigFive = {
    C: { score: cScore,    pct: Math.round((cScore    / 4) * 100), ...BIGFIVE_LABELS.C[lvl(cScore,    4)] },
    N: { score: bfnScore,  pct: Math.round((bfnScore  / 4) * 100), ...BIGFIVE_LABELS.N[lvl(bfnScore,  4)] },
    ...(oScore > 0 || answers.some(a => a.bigFiveType === 'O')
      ? { O: { score: oScore, pct: Math.round((oScore / 4) * 100), ...BIGFIVE_LABELS.O[lvl(oScore, 4)] } }
      : {}),
    ...(aScore > 0 || answers.some(a => a.bigFiveType === 'A')
      ? { A: { score: aScore, pct: Math.round((aScore / 4) * 100), ...BIGFIVE_LABELS.A[lvl(aScore, 4)] } }
      : {}),
  }

  // Work values
  const valuesAnswers = answers.filter(a => a.category === 'values').map(a => ({ id: a.questionId, value: a.value }))
  const workValues = inferWorkValues(valuesAnswers)

  // Conflict style
  const conflictAnswer = answers.find(a => a.category === 'conflict')
  const conflictStyle = conflictAnswer
    ? { type: conflictAnswer.value, ...CONFLICT_LABELS[conflictAnswer.value] }
    : null

  // Management traits
  const management = {}
  answers.filter(a => a.category === 'management').forEach(a => {
    management[a.trait] = { value: a.value, ...MANAGEMENT_LABELS[a.trait][a.value] }
  })

  // Decision-making style (detailed only)
  const decisionAnswers = answers.filter(a => a.category === 'decision')
  let decisionStyle = null
  if (decisionAnswers.length > 0) {
    const counts = {}
    decisionAnswers.forEach(a => { counts[a.value] = (counts[a.value] || 0) + 1 })
    const sorted = Object.entries(counts).sort((x, y) => y[1] - x[1])
    const primary = sorted[0][0]
    const secondary = sorted[1]?.[0]
    decisionStyle = {
      type: primary,
      ...DECISION_LABELS[primary],
      secondary: secondary ? { type: secondary, ...DECISION_LABELS[secondary] } : null,
    }
  }

  // Leadership tendency (detailed only)
  const leaderAnswers = answers.filter(a => a.category === 'leadership')
  let leadershipStyle = null
  if (leaderAnswers.length > 0) {
    const counts = {}
    leaderAnswers.forEach(a => { counts[a.value] = (counts[a.value] || 0) + 1 })
    const primary = Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0]
    leadershipStyle = { type: primary, ...LEADERSHIP_LABELS[primary] }
  }

  // Recognition preference (detailed only)
  const recognitionAnswer = answers.find(a => a.category === 'recognition')
  const recognitionStyle = recognitionAnswer
    ? { type: recognitionAnswer.value, ...RECOGNITION_LABELS[recognitionAnswer.value] }
    : null

  // Stress triggers (detailed only)
  const triggerAnswer = answers.find(a => a.category === 'stress' && a.stressType === 'trigger')
  const signAnswer = answers.find(a => a.category === 'stress' && a.stressType === 'sign')
  const stressTriggers = (triggerAnswer || signAnswer) ? {
    trigger: triggerAnswer ? { type: triggerAnswer.value, ...STRESS_TRIGGER_LABELS[triggerAnswer.value] } : null,
    sign:    signAnswer    ? { type: signAnswer.value,    ...STRESS_SIGN_LABELS[signAnswer.value] }    : null,
  } : null

  const tips = generateTips(e, n, t, j, management, bigFive, workValues, conflictStyle, decisionStyle, leadershipStyle, recognitionStyle, stressTriggers)

  return {
    mbtiType,
    mbtiInfo: MBTI_TYPES[mbtiType],
    dimensions,
    maleBrainPct,
    femaleBrainPct: 100 - maleBrainPct,
    bigFive,
    workValues,
    conflictStyle,
    management,
    decisionStyle,
    leadershipStyle,
    recognitionStyle,
    stressTriggers,
    tips,
  }
}

function generateTips(e, n, t, j, management, bigFive, workValues, conflictStyle, decisionStyle, leadershipStyle, recognitionStyle, stressTriggers) {
  const tips = []

  // E/I
  if (e === 'E') tips.push('グループ討議や声かけでアイデアを引き出せます')
  else tips.push('一人で考える時間と静かな環境が生産性を高めます')

  // N/S
  if (n === 'N') tips.push('全体像・ビジョンを先に共有してから詳細を伝えましょう')
  else tips.push('具体的な事実・データ・実績を示すと説得力が増します')

  // T/F
  if (t === 'T') tips.push('論理的な理由と根拠を示すフィードバックが有効です')
  else tips.push('批判の前に必ず承認・共感から入ると効果的です')

  // J/P
  if (j === 'J') tips.push('明確な計画と締め切りを設定すると安心して動けます')
  else tips.push('細かいプロセス管理より、ゴールだけ設定して任せましょう')

  // Big Five C
  if (bigFive.C.level === 'low') tips.push('リマインダーや短期の区切りゴールを用意すると効果的です')
  else if (bigFive.C.level === 'high') tips.push('詳細な役割定義と明確な期待値を示すと実力を発揮できます')

  // Big Five N
  if (bigFive.N.level === 'high') tips.push('批判より「改善提案」として伝え、心理的安全を意識して。1on1の頻度を上げましょう')
  else if (bigFive.N.level === 'low') tips.push('プレッシャー下でも安定。率直なフィードバックを受け入れやすい相手です')

  // Work values
  if (workValues.primary === 'growth' || workValues.primary === 'mastery' || workValues.primary === 'expert') {
    tips.push('学習機会・新しい挑戦・キャリアアップのビジョンを提示することで動機を維持できます')
  } else if (workValues.primary === 'stability' || workValues.primary === 'stable') {
    tips.push('急な変更は早めに・丁寧に伝えましょう。安定した環境が最大のパフォーマンスを生みます')
  } else if (workValues.primary === 'autonomy') {
    tips.push('やり方を任せること。過剰な管理やプロセス介入はモチベーションを下げます')
  } else if (workValues.primary === 'contribution' || workValues.primary === 'impact' || workValues.primary === 'mission') {
    tips.push('「あなたのおかげで〇〇が助かった」という言葉が最大の報酬になります')
  } else if (workValues.primary === 'exploration') {
    tips.push('知的好奇心が最大の原動力。「なぜ」を考える余地と新しい問いへのアクセスを与えることで力を発揮します')
  }

  // Conflict style
  if (conflictStyle) {
    if (conflictStyle.type === 'competing') {
      tips.push('意見の主張を恐れません。論理的な議論の場を設けると本領を発揮します')
    } else if (conflictStyle.type === 'collaborating') {
      tips.push('合意形成と調整役として強みを発揮。Win-Win思考をチームに活かしましょう')
    } else if (conflictStyle.type === 'accommodating') {
      tips.push('自分の意見を遠慮しがちな面があります。「あなたはどう思う？」と明示的に引き出しましょう')
    } else if (conflictStyle.type === 'compromising') {
      tips.push('現実的な落としどころを作る能力があります。速度感ある合意形成が得意です')
    }
  }

  // Big Five O (detailed only)
  if (bigFive.O) {
    if (bigFive.O.level === 'high') tips.push('新しい役割・実験的プロジェクトで本領発揮。ルーティン業務だけでは飽きやすい点に注意')
    else if (bigFive.O.level === 'low') tips.push('慣れ親しんだやり方を好みます。変化の際は十分な準備期間と説明を')
  }

  // Big Five A (detailed only)
  if (bigFive.A) {
    if (bigFive.A.level === 'high') tips.push('チームの調和を大切にする一方、言いたいことを飲み込みがち。意見を明示的に引き出して')
    else if (bigFive.A.level === 'low') tips.push('率直で議論を厭わない。意見の衝突を建設的に活かせる環境で力を発揮します')
  }

  // Decision-making (detailed only)
  if (decisionStyle) {
    if (decisionStyle.type === 'analytical') tips.push('意思決定には十分なデータ・根拠の提供を。急かすと精度が下がります')
    else if (decisionStyle.type === 'directive') tips.push('シンプル・スピード重視の意思決定者。情報の洪水は逆効果。要点だけ提示して')
    else if (decisionStyle.type === 'conceptual') tips.push('アイデアや新しい視点を与えると燃えます。長期視点のプロジェクトに向いています')
    else if (decisionStyle.type === 'behavioral') tips.push('合意形成に強みがあります。チームのコンセンサスを取るプロセスを大切に')
  }

  // Recognition (detailed only)
  if (recognitionStyle) {
    if (recognitionStyle.type === 'public') tips.push('チームの前での公式な称賛が最大のモチベーションになります')
    else if (recognitionStyle.type === 'private') tips.push('1on1や個別のメッセージで直接伝えると最も響きます')
    else if (recognitionStyle.type === 'tangible') tips.push('評価・昇進・報酬という具体的な形が最大のモチベーションです')
  }

  // Stress triggers (detailed only)
  if (stressTriggers?.trigger) {
    if (stressTriggers.trigger.type === 'ambiguity') tips.push('不確実な状況では進捗の見える化と方向性の定期共有が重要です')
    else if (stressTriggers.trigger.type === 'overwhelm') tips.push('タスクが多いときは優先順位を一緒に整理する時間を設けましょう')
    else if (stressTriggers.trigger.type === 'interpersonal') tips.push('チームの摩擦や対立が特にダメージになります。早期の関係修復サポートを')
    else if (stressTriggers.trigger.type === 'control') tips.push('自分で決められる余地を残すことが安心感につながります')
  }

  return tips
}

// ── AI Prompt ──────────────────────────────────────────────────────────
export function generateAIPrompt(results) {
  const { mbtiType, mbtiInfo, dimensions, maleBrainPct, femaleBrainPct,
          bigFive, workValues, conflictStyle, management,
          decisionStyle, leadershipStyle, recognitionStyle, stressTriggers } = results

  const pct = (a, b) => {
    const t = (dimensions[a] || 0) + (dimensions[b] || 0)
    return t ? Math.round(((dimensions[a] || 0) / t) * 100) : 50
  }

  const mgmtLines = Object.entries(management)
    .map(([, v]) => `　${v.label}（${v.desc}）`)
    .join('\n')

  const mgmtKeys = { communication: 'コミュニケーション', motivation: 'モチベーション源', feedback: 'フィードバック', role: 'チームの役割' }
  const mgmtDetail = Object.entries(management)
    .map(([k, v]) => `　${mgmtKeys[k] || k}：${v.label}（${v.desc}）`)
    .join('\n')

  return `以下は、あるメンバーの性格・仕事スタイル診断の結果です。マネジメントの観点で詳しく分析してください。

━━━━━━━━━━━━━━━━━━━━━━
■ MBTIタイプ：${mbtiType}（${mbtiInfo.name}）
　${mbtiInfo.tagline}
　E ${pct('E','I')}% ／ I ${100-pct('E','I')}%
　N ${pct('N','S')}% ／ S ${100-pct('N','S')}%
　T ${pct('T','F')}% ／ F ${100-pct('T','F')}%
　J ${pct('J','P')}% ／ P ${100-pct('J','P')}%

■ 脳タイプ
　男性脳（論理・体系化）：${maleBrainPct}%
　女性脳（共感・感情）：${femaleBrainPct}%

■ 性格特性（Big Five）
　誠実性：${bigFive.C.label}（${bigFive.C.desc}）
　情緒安定性：${bigFive.N.label}（${bigFive.N.desc}）${bigFive.O ? `\n　開放性：${bigFive.O.label}（${bigFive.O.desc}）` : ''}${bigFive.A ? `\n　協調性：${bigFive.A.label}（${bigFive.A.desc}）` : ''}

■ 仕事の価値観
　${workValues.label}（${workValues.desc}）${workValues.secondaryInfo ? `\n　サブ：${workValues.secondaryInfo.label}` : ''}

■ コンフリクトスタイル
　${conflictStyle ? `${conflictStyle.label}（${conflictStyle.desc}）` : '不明'}

■ 仕事スタイル
${mgmtDetail}${decisionStyle ? `\n\n■ 意思決定スタイル\n　${decisionStyle.label}（${decisionStyle.desc}）${decisionStyle.secondary ? `\n　サブ：${decisionStyle.secondary.label}` : ''}` : ''}${leadershipStyle ? `\n\n■ リーダーシップ傾向\n　${leadershipStyle.label}（${leadershipStyle.desc}）` : ''}${recognitionStyle ? `\n\n■ 承認スタイル\n　${recognitionStyle.label}（${recognitionStyle.desc}）` : ''}${stressTriggers ? `\n\n■ ストレス傾向\n　ストレス源：${stressTriggers.trigger?.label || '不明'}（${stressTriggers.trigger?.desc || ''}）\n　サイン：${stressTriggers.sign?.label || '不明'}（${stressTriggers.sign?.desc || ''}）` : ''}
━━━━━━━━━━━━━━━━━━━━━━

以下の観点で分析・アドバイスをください：
1. この人の強みと弱み
2. 向いているタスクや役割
3. 効果的なコミュニケーション方法
4. モチベーションを引き出すアプローチ
5. 注意すべき言動・地雷
6. 1on1ミーティングのポイント
7. チームへのアサイン時の注意点
8. 離職リスクが高まるサインと対処法`
}
