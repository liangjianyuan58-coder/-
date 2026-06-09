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
    direct: { label: '直接型', desc: 'ストレートな伝え方を好む' },
    indirect: { label: '協調型', desc: '相手の反応に配慮しながら伝える' },
  },
  motivation: {
    achievement: { label: '目標達成型', desc: '高い目標と達成感が原動力' },
    recognition: { label: '貢献・承認型', desc: '感謝と貢献感がパワーに' },
    autonomy: { label: '自律型', desc: '自由な裁量が最大のモチベーション' },
  },
  stress: {
    fight: { label: '対決型', desc: '問題に真っ向から取り組む' },
    flight: { label: '回避型', desc: '一人の時間で冷静さを取り戻す' },
    talk: { label: '対話型', desc: '話すことで気持ちを整理する' },
  },
  feedback: {
    logical: { label: '分析型', desc: '事実ベースで即座に改善' },
    emotional: { label: '感情型', desc: 'タイミングと言い方に敏感' },
    reflective: { label: '内省型', desc: 'ゆっくり時間をかけて消化' },
  },
  role: {
    leader: { label: 'リーダー型', desc: '決断・牽引する役割が得意' },
    supporter: { label: 'サポーター型', desc: 'チームの調和を支える縁の下の力持ち' },
    expert: { label: '専門家型', desc: '深い専門性で価値を出す' },
  },
  learning: {
    theory: { label: '概念型', desc: '理論・全体像から入る' },
    practice: { label: '実践型', desc: 'まずやってみて覚える' },
    social: { label: '対話型', desc: 'メンターや仲間から学ぶ' },
  },
}

export function calculateResults(answers) {
  // MBTI
  const dims = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 }
  answers.filter(a => a.category === 'mbti').forEach(a => { dims[a.value]++ })

  const e = dims.E >= dims.I ? 'E' : 'I'
  const n = dims.N >= dims.S ? 'N' : 'S'
  const t = dims.T >= dims.F ? 'T' : 'F'
  const j = dims.J >= dims.P ? 'J' : 'P'
  const mbtiType = `${e}${n}${t}${j}`

  // Brain type
  let systemizing = 0
  let empathizing = 0
  answers.filter(a => a.category === 'brain').forEach(a => {
    if (a.brainType === 'systemizing') systemizing += a.value
    else empathizing += a.value
  })
  const totalBrain = systemizing + empathizing
  const maleBrainPct = totalBrain === 0 ? 50 : Math.round((systemizing / totalBrain) * 100)

  // Management traits
  const management = {}
  answers.filter(a => a.category === 'management').forEach(a => {
    management[a.trait] = {
      value: a.value,
      ...MANAGEMENT_LABELS[a.trait][a.value],
    }
  })

  const tips = generateTips(e, n, t, j, management)

  return {
    mbtiType,
    mbtiInfo: MBTI_TYPES[mbtiType],
    dimensions: dims,
    maleBrainPct,
    femaleBrainPct: 100 - maleBrainPct,
    management,
    tips,
  }
}

function generateTips(e, n, t, j, management) {
  const tips = []

  if (e === 'E') tips.push('グループ討議や声かけでアイデアを引き出せます')
  else tips.push('一人で考える時間と静かな環境が生産性を高めます')

  if (n === 'N') tips.push('全体像・ビジョンを先に共有してから詳細を伝えましょう')
  else tips.push('具体的な事実・データ・実績を示すと説得力が増します')

  if (t === 'T') tips.push('論理的な理由と根拠を示すフィードバックが有効です')
  else tips.push('批判の前に必ず承認・共感から入ると効果的です')

  if (j === 'J') tips.push('明確な計画と締め切りを設定すると安心して動けます')
  else tips.push('細かいプロセス管理より、ゴールだけ設定して任せましょう')

  if (management.communication?.value === 'direct') {
    tips.push('率直なコミュニケーションを好みます。回りくどい表現は避けて。')
  } else {
    tips.push('柔らかい伝え方が刺さります。頭ごなしの指示は逆効果です。')
  }

  if (management.motivation?.value === 'achievement') {
    tips.push('チャレンジングな目標を与え、達成を一緒に祝うことが大切です')
  } else if (management.motivation?.value === 'recognition') {
    tips.push('「ありがとう」「助かった」という感謝の言葉が最大の報酬です')
  } else {
    tips.push('やり方を任せること。過剰な管理はモチベーションを下げます')
  }

  if (management.stress?.value === 'fight') {
    tips.push('困難な課題を任せると燃えます。解決に向けた議論が有効です')
  } else if (management.stress?.value === 'flight') {
    tips.push('プレッシャーをかけすぎず、冷静になれる余裕を与えましょう')
  } else {
    tips.push('定期的な1on1や対話の場が安心感と生産性を生みます')
  }

  return tips
}
