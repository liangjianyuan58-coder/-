/**
 * 複数のカテゴリのスコアを、統一した「0-10スケール」の軸に正規化
 * → その軸と「理想値」の距離を計算して弱点を特定しやすくする
 *
 * 使用例:
 *   const normalized = normalizeDimensions(results)
 *   console.log(normalized.action.score)   // 7.5
 *   console.log(normalized.planning.score) // 4.2
 */

export function normalizeDimensions(results) {
  const {
    mbtiType, dimensions, bigFive, workValues, decisionStyle,
    leadershipStyle, stressTriggers, conflictStyle
  } = results

  // ═══════════════════════════════════════════════════════════════════════
  // 軸1: 「行動力 vs 慎重さ」(Action vs Caution)
  // ═══════════════════════════════════════════════════════════════════════
  // E/I (外向性), P/J (知覚性), N/S (直感性), Decision Style
  const actionForce = (() => {
    let score = 0
    // E傾向が強いと行動力↑
    score += (dimensions.E || 0) * 1.5
    // P傾向（柔軟性）が強いと行動力↑
    score += (dimensions.P || 0) * 1.2
    // Directive/Conceptual 意思決定スタイルは行動力↑
    if (decisionStyle?.type === 'directive') score += 3
    if (decisionStyle?.type === 'conceptual') score += 2
    return Math.min(10, score / 2)
  })()

  const cautionForce = (() => {
    let score = 0
    // I傾向、J傾向が強いと慎重さ↑
    score += (dimensions.I || 0) * 1.5
    score += (dimensions.J || 0) * 1.2
    // Analytical意思決定スタイルは慎重さ↑
    if (decisionStyle?.type === 'analytical') score += 3
    return Math.min(10, score / 2)
  })()

  // ═══════════════════════════════════════════════════════════════════════
  // 軸2: 「リスク管理意識」(Risk Management Awareness)
  // ═══════════════════════════════════════════════════════════════════════
  // Big Five C (誠実性), J傾向, Stress awareness
  const riskManagement = (() => {
    let score = 0
    score += (bigFive.C?.score || 0) * 2  // 誠実性が高いほどリスク意識↑
    score += (dimensions.J || 0) * 0.8
    // ストレストリガーが「ambiguity/overwhelm」の場合、実は管理意識が高い
    if (stressTriggers?.trigger?.type === 'ambiguity') score += 2
    return Math.min(10, score)
  })()

  // ═══════════════════════════════════════════════════════════════════════
  // 軸3: 「論理性 vs 共感性」(Logical vs Empathetic)
  // ═══════════════════════════════════════════════════════════════════════
  // T/F, Brain type, Conflict style
  const logicScore = (() => {
    let score = 0
    score += (dimensions.T || 0) * 1.5
    score += (results.maleBrainPct || 50) / 10  // 男性脳スコア
    if (conflictStyle?.type === 'competing') score += 1.5
    return Math.min(10, score / 2)
  })()

  const empathyScore = (() => {
    let score = 0
    score += (dimensions.F || 0) * 1.5
    score += (results.femaleBrainPct || 50) / 10  // 女性脳スコア
    if (conflictStyle?.type === 'accommodating' || conflictStyle?.type === 'collaborating') {
      score += 2
    }
    return Math.min(10, score / 2)
  })()

  // ═══════════════════════════════════════════════════════════════════════
  // 軸4: 「柔軟性 vs 計画性」(Flexibility vs Planning)
  // ═══════════════════════════════════════════════════════════════════════
  const flexibility = (() => {
    let score = 0
    score += (dimensions.P || 0) * 2  // P傾向
    if (bigFive.O) score += (bigFive.O.score || 0) * 1  // 開放性
    if (decisionStyle?.type === 'conceptual') score += 2
    return Math.min(10, score / 2)
  })()

  const planning = (() => {
    let score = 0
    score += (dimensions.J || 0) * 2  // J傾向
    score += (bigFive.C?.score || 0) * 1.2  // 誠実性
    if (decisionStyle?.type === 'analytical') score += 2
    return Math.min(10, score / 2)
  })()

  // ═══════════════════════════════════════════════════════════════════════
  // 軸5: 「チームプレイ vs 独立性」(Teamwork vs Independence)
  // ═══════════════════════════════════════════════════════════════════════
  const teamwork = (() => {
    let score = 0
    score += (dimensions.E || 0) * 1.2  // E傾向
    if (bigFive.A) score += (bigFive.A.score || 0) * 2  // 協調性
    if (leadershipStyle?.type === 'participative' || leadershipStyle?.type === 'supportive') {
      score += 2
    }
    return Math.min(10, score / 2)
  })()

  const independence = (() => {
    let score = 0
    score += (dimensions.I || 0) * 1.2  // I傾向
    if (bigFive.A?.level === 'low') score += 2  // 協調性低い
    if (leadershipStyle?.type === 'delegative') score += 2
    return Math.min(10, score / 2)
  })()

  // ═══════════════════════════════════════════════════════════════════════
  // 軸6: 「安定志向 vs 成長志向」(Stability vs Growth)
  // ═══════════════════════════════════════════════════════════════════════
  const stabilityOrientation = (() => {
    let score = 0
    if (workValues?.primary === 'stability' || workValues?.primary === 'stable') score += 4
    if (bigFive.N?.level === 'high') score += 1  // ストレス耐性が低い ≒ 安定志向
    return Math.min(10, score)
  })()

  const growthOrientation = (() => {
    let score = 0
    if (workValues?.primary === 'growth' || workValues?.primary === 'mastery' || workValues?.primary === 'exploration') {
      score += 4
    }
    if (bigFive.O?.level === 'high') score += 2  // 開放性が高い
    score += (dimensions.N || 0) * 0.5  // N傾向（新しい可能性を求める）
    return Math.min(10, score)
  })()

  return {
    // メインの軸（相反する2つのスコアセット）
    action: { score: actionForce, name: '行動力', unit: '0-10' },
    caution: { score: cautionForce, name: '慎重さ', unit: '0-10' },
    riskManagement: { score: riskManagement, name: 'リスク管理意識', unit: '0-10' },
    logic: { score: logicScore, name: '論理性', unit: '0-10' },
    empathy: { score: empathyScore, name: '共感性', unit: '0-10' },
    flexibility: { score: flexibility, name: '柔軟性', unit: '0-10' },
    planning: { score: planning, name: '計画性', unit: '0-10' },
    teamwork: { score: teamwork, name: 'チームプレイ', unit: '0-10' },
    independence: { score: independence, name: '独立性', unit: '0-10' },
    stability: { score: stabilityOrientation, name: '安定志向', unit: '0-10' },
    growth: { score: growthOrientation, name: '成長志向', unit: '0-10' },

    // 構成要素（詳細分析用）
    components: {
      mbtiType,
      bigFive,
      workValues,
      decisionStyle,
      leadershipStyle,
      stressTriggers,
      conflictStyle,
    }
  }
}

/**
 * ユーザーのスコアベクトルを抽出（適職マッチング用）
 */
export function extractScoreVector(normalized) {
  return {
    action: normalized.action.score,
    caution: normalized.caution.score,
    riskManagement: normalized.riskManagement.score,
    logic: normalized.logic.score,
    empathy: normalized.empathy.score,
    flexibility: normalized.flexibility.score,
    planning: normalized.planning.score,
    teamwork: normalized.teamwork.score,
    independence: normalized.independence.score,
    stability: normalized.stability.score,
    growth: normalized.growth.score,
  }
}
