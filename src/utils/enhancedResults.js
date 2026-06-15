/**
 * 統合ユーティリティ
 * 既存の scoring.js の calculateResults() に軸の正規化と弱点検出、適職マッチングを統合
 *
 * 使用例:
 *   const answers = [...] // 診断回答
 *   const enhancedResults = calculateEnhancedResults(answers)
 *   console.log(enhancedResults.normalizedDimensions)  // 11の軸に正規化された結果
 *   console.log(enhancedResults.weaknesses)             // 検出された弱点リスト
 *   console.log(enhancedResults.suitableJobs)          // マッチスコアが高い職業ランキング
 */

import { calculateResults } from './scoring'
import { normalizeDimensions, extractScoreVector } from './dimensionNormalizer'
import { detectWeaknesses } from './weaknessDetector'
import { getSuitableJobs, getCareerInsight, getJobClusterStats } from './jobMatcher'

/**
 * メイン統合関数：診断結果の完全なエンハンス
 */
export function calculateEnhancedResults(answers) {
  // ステップ1: 既存の診断ロジック実行
  const baseResults = calculateResults(answers)

  // ステップ2: 多軸の正規化
  const normalizedDimensions = normalizeDimensions(baseResults)

  // ステップ3: 弱点検出
  const weaknesses = detectWeaknesses(normalizedDimensions)

  // ステップ4: 適職マッチング
  const scoreVector = extractScoreVector(normalizedDimensions)
  const suitableJobs = getSuitableJobs(scoreVector)
  const careerInsight = getCareerInsight(scoreVector)
  const jobClusterStats = getJobClusterStats(scoreVector)

  // ステップ5: 統合結果を返却
  return {
    // 基本の診断結果（既存）
    ...baseResults,

    // 新機能：多軸正規化
    normalizedDimensions,

    // 新機能：弱点とNext Action
    weaknesses,

    // 新機能：適職マッチング
    suitableJobs,
    careerInsight,
    jobClusterStats,

    // メタデータ
    meta: {
      timestamp: new Date().toISOString(),
      version: '2.0',
      features: ['mbti', 'brain_type', 'bigfive', 'work_values', 'normalized_dimensions', 'weakness_detection', 'job_matching']
    }
  }
}

/**
 * 弱点を1つ取得（詳細表示用）
 */
export function getWeaknessSummary(weaknesses) {
  if (weaknesses.length === 0) {
    return {
      count: 0,
      severityCount: { high: 0, medium: 0, low: 0 },
      primary: null,
      message: '✨ 大きな弱点は検出されていません。あなたの適性は比較的バランスが取れています。'
    }
  }

  const severityCount = {
    high: weaknesses.filter(w => w.severity === 'high').length,
    medium: weaknesses.filter(w => w.severity === 'medium').length,
    low: weaknesses.filter(w => w.severity === 'low').length,
  }

  const primary = weaknesses[0] // 最重要な弱点

  let message = ''
  if (severityCount.high > 0) {
    message = `🔴 重要な弱点が ${severityCount.high} 件見つかりました。特に「${primary.title}」に注目してください。`
  } else if (severityCount.medium > 0) {
    message = `🟡 中程度の課題が ${severityCount.medium} 件見つかりました。長期的に改善するとキャリアの選択肢が広がります。`
  } else {
    message = `🟢 軽微な課題のみです。これらは経験で補える範囲です。`
  }

  return {
    count: weaknesses.length,
    severityCount,
    primary,
    message
  }
}

/**
 * 適職サマリーを生成
 */
export function getCareerSummary(suitableJobs, careerInsight) {
  if (suitableJobs.length === 0) {
    return {
      topMatch: null,
      topThree: [],
      insight: '診断結果が不足しています。',
      recommendation: ''
    }
  }

  const topMatch = suitableJobs[0]
  const topThree = suitableJobs.slice(0, 3)

  const recommendation = getRecommendationText(topMatch, suitableJobs)

  return {
    topMatch: {
      job: topMatch.job,
      score: topMatch.match_score,
      strengths: topMatch.why_strong,
      challenges: topMatch.why_challenging,
      tips: topMatch.tips
    },
    topThree: topThree.map(j => ({
      name: j.job.name,
      emoji: j.job.emoji,
      score: j.match_score
    })),
    insight: careerInsight.insight,
    recommendation
  }
}

/**
 * 推奨テキストを生成
 */
function getRecommendationText(topMatch, allJobs) {
  const score = topMatch.match_score
  const jobName = topMatch.job.name

  if (score >= 85) {
    return `このマッチスコアは非常に高いです。${jobName}は、あなたの適性が最も活かせる職業の一つです。このキャリアパスを本格的に検討する価値があります。`
  } else if (score >= 75) {
    return `${jobName}は良いマッチです。あなたの強みが活かせる職業です。同時に、2～3番目の職業との差は小さいため、興味や価値観を基準に選択するのも良いでしょう。`
  } else if (score >= 65) {
    return `${jobName}は妥当な選択肢です。完璧なマッチではありませんが、経験を積むことで対応できる課題がほとんどです。興味があれば、初期段階ではサポート体制が充実した環境でスタートするのがおすすめです。`
  } else {
    return `${jobName}も検討する価値がありますが、別の職業の方が適性が高いです。トップ3の職業から選択することで、より自分の力を発揮できるでしょう。`
  }
}

/**
 * 個人開発プラン（弱点 → Next Action → 期待される改善）を生成
 */
export function generateDevelopmentPlan(weaknesses, timeframe = '3months') {
  if (weaknesses.length === 0) {
    return {
      priority: [],
      message: 'すでに適性がバランスよく備わっています。現在のレベルを維持しながら、さらなる専門性を磨くことをお勧めします。'
    }
  }

  const timeframeMap = {
    '1month': 1,
    '3months': 3,
    '6months': 6,
    '1year': 12
  }

  const months = timeframeMap[timeframe] || 3

  const priority = weaknesses
    .filter(w => w.severity === 'high' || (w.severity === 'medium' && months >= 3))
    .slice(0, 3)  // 最大3つまで
    .map(weakness => {
      // その弱点の中で、最も短時間で効果が出るアクションを選ぶ
      const quickWins = weakness.next_actions
        .filter(action => action.time_to_impact === '即日' || action.time_to_impact === '数日')

      const primaryAction = quickWins.length > 0
        ? quickWins[0]
        : weakness.next_actions[0]

      return {
        weakness_title: weakness.title,
        weakness_severity: weakness.severity,
        primary_action: primaryAction.action,
        difficulty: primaryAction.difficulty,
        time_to_impact: primaryAction.time_to_impact,
        example: primaryAction.example,
        all_actions: weakness.next_actions
      }
    })

  return {
    priority,
    message: `今後 ${months} ヶ月の開発ポイント：${priority.map(p => p.weakness_title).join(', ')} に取り組むことで、適職の選択肢が広がります。`,
    timeframe
  }
}

/**
 * レーダーチャート用のデータを生成（フロントエンド用）
 */
export function generateRadarChartData(normalizedDimensions) {
  const dimensions = [
    { key: 'action', name: '行動力' },
    { key: 'caution', name: '慎重さ' },
    { key: 'riskManagement', name: 'リスク管理' },
    { key: 'logic', name: '論理性' },
    { key: 'empathy', name: '共感性' },
    { key: 'flexibility', name: '柔軟性' },
    { key: 'planning', name: '計画性' },
    { key: 'teamwork', name: 'チームプレイ' },
    { key: 'independence', name: '独立性' },
    { key: 'stability', name: '安定志向' },
    { key: 'growth', name: '成長志向' },
  ]

  return dimensions.map(dim => ({
    dimension: dim.name,
    score: Math.round(normalizedDimensions[dim.key].score * 10) / 10,
    fullScore: 10
  }))
}

/**
 * シェア用のサマリーテキストを生成
 */
export function generateShareText(baseResults, normalizedDimensions, weaknesses, suitableJobs) {
  const { mbtiType, mbtiInfo } = baseResults
  const topJob = suitableJobs[0]

  const text = `
🧠 **あなたの性格診断結果**

**MBTIタイプ**: ${mbtiType} (${mbtiInfo.name})
${mbtiInfo.tagline}

**適職**: 🥇 ${topJob.job.name} (マッチスコア: ${topJob.match_score}%)

**主な弱点**: ${weaknesses.length > 0 ? weaknesses[0].title : 'なし'}

**開発ポイント**: 
${weaknesses.length > 0 
  ? `→ ${weaknesses[0].next_actions[0]?.action || 'スキルアップを継続してください'}` 
  : '→ 適性がバランスよく備わっています！'}

診断の詳細はこちらから確認できます ↓
  `.trim()

  return text
}
