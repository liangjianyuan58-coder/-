/**
 * 適職マッチングシステム
 * ユーザースコアベクトル × 職業プロファイル → コサイン類似度 → 適職ランキング
 * 理由も構造化テキストで生成
 *
 * 使用例:
 *   const normalized = normalizeDimensions(results)
 *   const scoreVector = extractScoreVector(normalized)
 *   const suitableJobs = getSuitableJobs(scoreVector)
 *   console.log(suitableJobs[0].job.name)     // "プロダクトマネージャー"
 *   console.log(suitableJobs[0].match_score)  // 87
 */

// ════════════════════════════════════════════════════════════════════════════
// 職業プロファイルデータベース
// ════════════════════════════════════════════════════════════════════════════

const JOB_PROFILES = [
  {
    id: 'product_manager',
    name: 'プロダクトマネージャー',
    emoji: '🎯',
    description: '市場ニーズと技術を繋ぎ、プロダクトのビジョンを実現する職業',
    requiredDimensions: {
      action: 8,
      riskManagement: 6,
      logic: 7,
      empathy: 7,
      teamwork: 8,
      growth: 8,
      flexibility: 8,
      planning: 6,
    },
    strengths: ['戦略的思考', 'ユーザー理解', 'チーム調整', 'マーケット感度'],
    challenges: ['パーフェクショニスト傾向だと迷いが増す', '論理とユーザーニーズのバランスが難しい'],
    ideal_mbti: ['ENTJ', 'ENFJ', 'INTJ'],
  },
  {
    id: 'system_engineer',
    name: 'システムエンジニア（インフラ/アーキテクチャ）',
    emoji: '🏗️',
    description: '大規模・複雑なシステムの設計と最適化を行う職業',
    requiredDimensions: {
      logic: 9,
      planning: 9,
      riskManagement: 9,
      caution: 7,
      independence: 8,
      growth: 7,
      action: 5,
      empathy: 4,
    },
    strengths: ['論理的設計', 'リスク予測', '大規模・複雑さ対応'],
    challenges: ['変化への適応スピード', 'チーム内コミュニケーション'],
    ideal_mbti: ['INTJ', 'INTP', 'ISTJ'],
  },
  {
    id: 'sales_manager',
    name: '営業マネージャー',
    emoji: '📈',
    description: '営業チームを率いて、成績目標を達成し人材を育成する職業',
    requiredDimensions: {
      action: 8,
      empathy: 8,
      teamwork: 9,
      logic: 6,
      growth: 7,
      planning: 6,
      flexibility: 7,
      riskManagement: 6,
    },
    strengths: ['人間関係構築', 'モチベーション提供', '変化への適応', '成果達成'],
    challenges: ['論理的分析が弱いと施策がぶれる', 'チームの違いを読み間違えるリスク'],
    ideal_mbti: ['ENFJ', 'ESFJ', 'ENTJ'],
  },
  {
    id: 'researcher',
    name: '研究者・科学者',
    emoji: '🔬',
    description: '新しい知見や技術を探求し、論文や発明にまとめる職業',
    requiredDimensions: {
      logic: 9,
      growth: 9,
      independence: 9,
      planning: 8,
      riskManagement: 7,
      action: 6,
      empathy: 3,
      teamwork: 4,
    },
    strengths: ['深い思考', '新しい概念の創出', '厳密さ'],
    challenges: ['チーム内での説明・共有が苦手', '結果が出ない中での忍耐'],
    ideal_mbti: ['INTJ', 'INTP', 'ISTJ'],
  },
  {
    id: 'entrepreneur',
    name: '起業家',
    emoji: '🚀',
    description: 'ビジョンから事業を立ち上げ、スケールさせる職業',
    requiredDimensions: {
      action: 9,
      growth: 9,
      flexibility: 9,
      empathy: 7,
      logic: 6,
      teamwork: 7,
      riskManagement: 5,
      caution: 2,
    },
    strengths: ['ビジョン発信', 'リスク資質', 'リソース獲得', '人の巻き込み'],
    challenges: ['現実のしがらみに苦しむ', '失敗からの立ち直り', 'チーム管理'],
    ideal_mbti: ['ENTJ', 'ENTP', 'ENFJ'],
  },
  {
    id: 'consultant',
    name: 'コンサルタント',
    emoji: '💼',
    description: 'クライアントの経営課題を分析し、解決策を提案・実行支援する職業',
    requiredDimensions: {
      logic: 8,
      empathy: 7,
      action: 7,
      planning: 8,
      growth: 7,
      flexibility: 7,
      teamwork: 7,
      independence: 6,
    },
    strengths: ['課題分析', '問題解決', 'ビジネス理解', '顧客関係'],
    challenges: ['対人ストレス（常に新しい人間関係）', 'ワークライフバランス'],
    ideal_mbti: ['ENTJ', 'INTJ', 'ENFJ'],
  },
  {
    id: 'data_scientist',
    name: 'データサイエンティスト',
    emoji: '📊',
    description: 'ビッグデータを分析し、ビジネスインサイトを導出する職業',
    requiredDimensions: {
      logic: 9,
      growth: 8,
      planning: 7,
      independence: 7,
      riskManagement: 6,
      action: 6,
      empathy: 5,
      teamwork: 5,
    },
    strengths: ['高度な分析', 'パターン認識', 'データストーリーテリング'],
    challenges: ['現場での説得力の不足', 'ビジネス文脈の理解'],
    ideal_mbti: ['INTJ', 'INTP', 'ISTJ'],
  },
  {
    id: 'hr_specialist',
    name: 'HR・組織開発スペシャリスト',
    emoji: '👥',
    description: '組織文化、採用、育成、組織設計など人に関わる施策を推進する職業',
    requiredDimensions: {
      empathy: 8,
      teamwork: 8,
      growth: 7,
      planning: 7,
      logic: 6,
      action: 7,
      flexibility: 7,
      riskManagement: 6,
    },
    strengths: ['人間関係構築', '組織理解', '育成志向', 'チーム構築'],
    challenges: ['経営の論理性が求められる', 'ハードな判定が必要な局面'],
    ideal_mbti: ['ENFJ', 'ESFJ', 'INFJ'],
  },
  {
    id: 'designer',
    name: 'UX/UIデザイナー',
    emoji: '🎨',
    description: 'ユーザーの問題を美しく解決するプロダクトデザインを行う職業',
    requiredDimensions: {
      empathy: 8,
      creativity: 8,
      action: 6,
      logic: 6,
      growth: 7,
      teamwork: 7,
      flexibility: 8,
      planning: 5,
    },
    strengths: ['ユーザー中心思考', '創造性', '共感力', 'プロトタイピング'],
    challenges: ['説得のロジック不足', '納期管理の厳しさ'],
    ideal_mbti: ['ENFP', 'INFP', 'ESFP'],
  },
  {
    id: 'finance_analyst',
    name: '財務・経理アナリスト',
    emoji: '💰',
    description: '企業の財務状況を分析し、経営判断を支援する職業',
    requiredDimensions: {
      logic: 9,
      riskManagement: 8,
      planning: 9,
      caution: 8,
      action: 4,
      growth: 5,
      empathy: 3,
      teamwork: 4,
    },
    strengths: ['精密な分析', 'リスク管理', 'プロセス厳格性'],
    challenges: ['変化への対応', 'ステークホルダー管理'],
    ideal_mbti: ['ISTJ', 'INTJ', 'ISFJ'],
  },
  {
    id: 'marketing_specialist',
    name: 'マーケティングスペシャリスト',
    emoji: '📢',
    description: '市場調査、キャンペーン企画・実行を通じて顧客を獲得する職業',
    requiredDimensions: {
      empathy: 8,
      growth: 8,
      action: 7,
      logic: 6,
      flexibility: 8,
      teamwork: 7,
      planning: 6,
      independence: 6,
    },
    strengths: ['トレンド感度', 'クリエイティビティ', '顧客理解', 'データ分析'],
    challenges: ['成果の定量化が難しい時がある', '急な方針転換への対応'],
    ideal_mbti: ['ENFP', 'ESFP', 'ENFJ'],
  },
  {
    id: 'ops_manager',
    name: 'オペレーション管理・プロジェクトマネージャー',
    emoji: '⚙️',
    description: 'プロジェクトやオペレーションの効率化と最適化を推進する職業',
    requiredDimensions: {
      planning: 9,
      riskManagement: 8,
      logic: 7,
      action: 7,
      teamwork: 7,
      growth: 6,
      caution: 7,
      flexibility: 5,
    },
    strengths: ['プロセス最適化', 'リスク管理', 'チーム統率', 'デリバリー'],
    challenges: ['急な変更対応', 'ステークホルダーの期待値調整'],
    ideal_mbti: ['ESTJ', 'ISTJ', 'ENTJ'],
  },
]

/**
 * コサイン類似度を計算
 */
function cosineSimilarity(userDims, jobDims) {
  let dotProduct = 0
  let magnitudeUser = 0
  let magnitudeJob = 0

  for (const key in jobDims) {
    const u = userDims[key] || 0
    const j = jobDims[key] || 0
    dotProduct += u * j
    magnitudeUser += u * u
    magnitudeJob += j * j
  }

  if (magnitudeUser === 0 || magnitudeJob === 0) return 0
  return dotProduct / (Math.sqrt(magnitudeUser) * Math.sqrt(magnitudeJob))
}

/**
 * 職業とのマッチ理由を生成
 */
function generateMatchReasoning(userDims, job, similarity) {
  const reasoning = {
    match_score: Math.round(similarity * 100),
    why_strong: [],
    why_challenging: [],
    tips: []
  }

  // 強みになる部分
  for (const [key, jobScore] of Object.entries(job.requiredDimensions)) {
    const userScore = userDims[key] || 0
    if (userScore >= jobScore * 0.8) {
      const displayKey = key.charAt(0).toUpperCase() + key.slice(1)
      reasoning.why_strong.push(`【${displayKey}】スコア ${userScore.toFixed(1)}/10 — この職業に必要な水準をクリア`)
    }
  }

  // 課題になる部分
  for (const [key, jobScore] of Object.entries(job.requiredDimensions)) {
    const userScore = userDims[key] || 0
    if (userScore < jobScore * 0.6) {
      const displayKey = key.charAt(0).toUpperCase() + key.slice(1)
      reasoning.why_challenging.push(`【${displayKey}】スコア ${userScore.toFixed(1)}/10 — 理想値 ${jobScore}/10 との開き`)
    }
  }

  // 補完アドバイス
  if (reasoning.why_challenging.length === 0) {
    reasoning.tips.push('✅ 主要な適性要件をほぼ満たしています。このキャリアに向いている可能性が高いです。')
  } else if (reasoning.why_challenging.length <= 2) {
    reasoning.tips.push(`🌱 課題はありますが、数個の適性が不足しているだけです。初期段階では強みが活かせるチーム環境から始めるとよいでしょう。`)
    reasoning.tips.push(`💡 足りない適性は経験を積む中で伸ばすことが可能です。メンターシップやトレーニングを活用してください。`)
  } else {
    reasoning.tips.push(`📌 複数の適性要件で開きがあります。この職業を目指す場合は、意識的にスキルを伸ばすプランが必要です。`)
    reasoning.tips.push(`💪 最初は関連職種（${job.strengths.join(', ')}を活かせる）でキャリアを積んでから、この職業へのステップアップを検討するのがおすすめです。`)
  }

  return reasoning
}

/**
 * ユーザーの適職をランキング
 */
export function getSuitableJobs(scoreVector) {
  const results = JOB_PROFILES.map(job => {
    const similarity = cosineSimilarity(scoreVector, job.requiredDimensions)
    const reasoning = generateMatchReasoning(scoreVector, job, similarity)

    return {
      job,
      similarity,
      ...reasoning,
    }
  })
  .sort((a, b) => b.similarity - a.similarity)

  return results
}

/**
 * 職業プロファイルを取得
 */
export function getJobProfile(jobId) {
  return JOB_PROFILES.find(job => job.id === jobId)
}

/**
 * マッチスコアの分布を計算（どの職業群が向いているか大まかに把握）
 */
export function getJobClusterStats(scoreVector) {
  const scores = getSuitableJobs(scoreVector)

  const topTier = scores.filter(s => s.match_score >= 80)
  const midTier = scores.filter(s => s.match_score >= 60 && s.match_score < 80)
  const lowTier = scores.filter(s => s.match_score < 60)

  return {
    top: topTier.map(s => ({ name: s.job.name, score: s.match_score, emoji: s.job.emoji })),
    mid: midTier.map(s => ({ name: s.job.name, score: s.match_score, emoji: s.job.emoji })),
    low: lowTier.map(s => ({ name: s.job.name, score: s.match_score, emoji: s.job.emoji })),
    stats: {
      average_top: topTier.length > 0 ? Math.round(topTier.reduce((a, b) => a + b.match_score, 0) / topTier.length) : 0,
      count_top: topTier.length,
      count_mid: midTier.length,
      count_low: lowTier.length,
    }
  }
}

/**
 * マッチスコアの信頼度を判定
 * （複数の適職がある場合は「多才型」、1つに集中している場合は「専門型」など）
 */
export function getCareerInsight(scoreVector) {
  const scores = getSuitableJobs(scoreVector)
  const topScore = scores[0]?.match_score || 0
  const secondScore = scores[1]?.match_score || 0

  const spread = topScore - secondScore

  let insight = ''
  if (spread > 20) {
    insight = '🎯 **専門型キャリア向き**：特定の職業に高い適性を持っています。その職業を深掘りするキャリアが向いています。'
  } else if (spread > 5) {
    insight = '🌳 **複数適性型**：2～3つの職業に同程度の適性があります。異なる職種を経験しながら、自分に最も合う職を見つけるキャリアが向いています。'
  } else {
    insight = '🌟 **マルチ才能型**：多くの職業に高い適性を持っています。自分の興味と価値観を大事にしながら、異なる職種を試す柔軟なキャリア設計が有効です。'
  }

  return {
    type: spread > 20 ? 'specialist' : spread > 5 ? 'multi' : 'versatile',
    insight,
    spreadScore: spread
  }
}
