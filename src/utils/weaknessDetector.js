/**
 * 弱点マイニングエンジン
 * スコアの「極値」と「過剰特性」から弱点を自動検出
 * → 対策データベースと紐付けて、実行可能なアクションを生成
 *
 * 使用例:
 *   const normalized = normalizeDimensions(results)
 *   const weaknesses = detectWeaknesses(normalized)
 *   weaknesses.forEach(w => {
 *     console.log(w.title)           // "見切り発車による後戻りのリスク"
 *     console.log(w.next_actions)    // [{action: "...", difficulty: "中", ...}, ...]
 *   })
 */

// ════════════════════════════════════════════════════════════════════════════
// 弱点データベース：パターン → 対策
// ════════════════════════════════════════════════════════════════════════════

const WEAKNESS_PATTERNS = {
  // ════════════════════════════════════════════════════════════════
  // パターン1: 高い行動力＆低いリスク管理 → 見切り発車のリスク
  // ════════════════════════════════════════════════════════════════
  high_action_low_risk_mgmt: {
    title: '見切り発車による後戻りのリスク',
    description: '行動力がある反面、不測の事態に直面した際に軌道修正のコストが大きくなりやすい傾向があります。',
    weakness_category: 'impulsiveness',
    impact: '突発トラブル対応に追われて、本来やるべきことに時間が割けなくなる可能性',
    severity: 'high',
    next_actions: [
      {
        action: '行動を起こす前に「最悪の3シナリオ」を想定し、回避策をメモに書き出す習慣をつける',
        difficulty: '中',
        time_to_impact: '1週間',
        example: '新プロジェクト開始前に、「メンバーが確保できない」「予算カットされる」「仕様が急変する」の3つを想定して、事前にバックアップ案を考える'
      },
      {
        action: 'Pre-mortem（事前死後検診）をチームで実施：「6ヶ月後、このプロジェクトが失敗していた理由は？」を共有する',
        difficulty: '低',
        time_to_impact: '即日',
        example: '企画段階で30分のセッションを開いて、メンバーから「失敗する可能性」を引き出す'
      },
      {
        action: 'Go/No-Go判断のチェックリストを、プロジェクトごとに決めておく',
        difficulty: '低',
        time_to_impact: '即日',
        example: '「Go判定する前に：①メンバー確保 ②予算確認 ③リソース確認 ④ステークホルダー合意」の4項目を全てチェック'
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════
  // パターン2: 高い慎重さ＆低い行動力 → 分析過多による開始遅延
  // ════════════════════════════════════════════════════════════════
  high_caution_low_action: {
    title: '完璧主義による実行遅延',
    description: 'リスク管理は完璧ですが、完璧を求めるあまり開始が遅れる傾向があります。',
    weakness_category: 'analysis_paralysis',
    impact: 'チャンスを逃したり、プロジェクト期間が圧迫される',
    severity: 'high',
    next_actions: [
      {
        action: '「60%の完成度でGOを出す」ルールを自分に課す。タイムボックス（時間制限）を設定して、その中で「十分」と判定する閾値を下げる',
        difficulty: '中',
        time_to_impact: '2週間',
        example: '「企画案は3日で完成させる。その時点で〇〇が80%出ていたら、それで十分」と決める'
      },
      {
        action: 'MVP（Minimum Viable Product）思考：「最小限、何があればスタートできるか」を問い直す',
        difficulty: '中',
        time_to_impact: '即日',
        example: 'アプリ開発なら、「全機能は不要。この1機能だけで顧客価値は出せるか？」と絞り込む'
      },
      {
        action: 'イテレーティブなアプローチを取ること：v1.0を完璧にするのではなく、v1 → v1.1 → v2 と段階的にアップグレード',
        difficulty: '低',
        time_to_impact: '1週間',
        example: '初回リリース時に「このバージョンでは〇〇機能はまだありません。v2で追加予定」と透明性を保つ'
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════
  // パターン3: 高い論理性＆低い共感性 → 対人関係の摩擦
  // ════════════════════════════════════════════════════════════════
  high_logic_low_empathy: {
    title: '論理的正しさを優先した人間関係のヒビ',
    description: '正しさを追求する一方で、相手の感情や立場を先に汲み取ることが弱みになっている可能性があります。',
    weakness_category: 'interpersonal_friction',
    impact: 'チームの一体感が損なわれ、意思決定時の抵抗感が増す。離職リスク上昇。',
    severity: 'medium',
    next_actions: [
      {
        action: '「承認 → 理由説明」の順序を守る：指摘する前に必ず「その考え、わかるよ」と共感する一言を入れる',
        difficulty: '中',
        time_to_impact: '数日',
        example: '「その方法は効率的じゃないと思う（理論）」ではなく、「君がそう考えた背景は理解する（共感）。でも、こういった課題が考えられて、別アプローチはどう？」'
      },
      {
        action: '定期的に「その人の気持ち」を聞く時間をつくる：1on1で「最近、何か心配なことはある？」と心理的安全を確認',
        difficulty: '低',
        time_to_impact: '即日',
        example: 'フィードバック後に「この話は納得できた？もし違和感があれば聞かせてほしい」と明示的に相手の感情を引き出す'
      },
      {
        action: '「なぜそう思う？」と相手の理由を先に聞く習慣をつける',
        difficulty: '低',
        time_to_impact: '即日',
        example: 'すぐに反論するのではなく、「それっていいアイデアだね。どういう考えでそう思ったの？」と背景を理解する'
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════
  // パターン4: 高い共感性＆低い論理性 → 意思決定の曖昧性
  // ════════════════════════════════════════════════════════════════
  high_empathy_low_logic: {
    title: '感情に流される意思決定',
    description: '相手の気持ちに配慮しすぎて、客観的・論理的な判断を見失う傾向があります。',
    weakness_category: 'emotional_indecision',
    impact: '判断基準がぶれ、チームの信頼度が下がる。自分がストレスを抱え込みやすい。',
    severity: 'medium',
    next_actions: [
      {
        action: '意思決定ルールを「感情の前に」決めておく：「顧客満足度 > 効率性」など、価値観の優先順位を明文化',
        difficulty: '中',
        time_to_impact: '1週間',
        example: 'チーム内で『当チームの判断基準は次の通り：①顧客価値 ②持続可能性 ③スピード』と合意しておく'
      },
      {
        action: 'フレームワークを使う：「全員が〇〇を達成できるか」という客観的問いを、感情的判断の前にかませる',
        difficulty: '低',
        time_to_impact: '数日',
        example: '誰かの意見が気になったら、『それをやると、チームの目標達成確度はどう変わる？』と論理的な質問を挟む'
      },
      {
        action: 'デメリットと裏返しで考える：良い面だけでなく「これをやると何が困るか」を必ず3つ列挙する',
        difficulty: '低',
        time_to_impact: '即日',
        example: '提案に対して「これは〇〇の点でいいが、□□と△△のリスクがある。それでもやるか？」と問い直す'
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════
  // パターン5: 低い成長志向＆高い安定志向 → 停滞リスク
  // ════════════════════════════════════════════════════════════════
  low_growth_high_stability: {
    title: '成長の停滞と自発性の低下',
    description: '現状維持を重視する一方で、新しい挑戦や自己開発のドライブが限定的な傾向があります。',
    weakness_category: 'stagnation',
    impact: 'スキルが陳腐化し、組織内での立場が相対的に弱まる。本人の実感としてはやりがいが薄れやすい。',
    severity: 'medium',
    next_actions: [
      {
        action: '「小さな挑戦」を習慣化する：毎月1つ、小さなスキルアップ目標を設定する（e.g., 今月は新しいツールを使ってみる）',
        difficulty: '低',
        time_to_impact: '1ヶ月',
        example: '『今月は Python を1時間の動画で学ぶ』『新しい提案フレームワークを1つ試す』など、低リスクな挑戦を'
      },
      {
        action: 'メンター制度を活用：同年代より1段階上の人に『こういう成長ができるか？』と相談する安全な窓口を作る',
        difficulty: '低',
        time_to_impact: '2週間',
        example: 'HR主導で『キャリア相談できるメンター配置』を提案して、気軽に相談できる環境を整備'
      },
      {
        action: '「今のスキルで5年後に食べていけるか？」を定期的に問い直す',
        difficulty: '低',
        time_to_impact: '即日',
        example: '四半期ごとに『自分のスキルセットはどう変わった？不足してる部分は？』と自己診断する時間をつくる'
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════
  // パターン6: 非常に高い協調性＆低い主張性 → 自己主張の欠落
  // ════════════════════════════════════════════════════════════════
  excessive_agreeableness: {
    title: '過度な協調性による自己主張の欠落',
    description: 'チームの和を大切にする一方で、自分の意見や限界を言えない傾向が見られます。',
    weakness_category: 'self_assertion',
    impact: 'ストレスを溜め込みやすく、実は重要な情報を伝え損なっている可能性があります。本人も疲弊しやすい。',
    severity: 'medium',
    next_actions: [
      {
        action: '「異論あり」を言う練習をする：週1回の1on1では必ず「この点は別の見方もあると思う」と一言添える',
        difficulty: '中',
        time_to_impact: '2週間',
        example: '上司の提案に対して『その方針はいいと思うんですが、〇〇の観点から、別アプローチもありかなと思います』'
      },
      {
        action: '「自分の限界」を事前に伝える習慣をつける：「今月はこれ以上のタスクは難しい」と早めに言う',
        difficulty: '中',
        time_to_impact: '1週間',
        example: 'タスク割り当てのときに『これで精一杯です』と正直に伝えることで、無理な状況を避ける'
      },
      {
        action: '「No」と言うときの言い方を準備する：拒否ではなく「別案」として提示する',
        difficulty: '低',
        time_to_impact: '即日',
        example: '「それはできませんが、こういう方法なら可能です」という建設的な代替案を用意する'
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════
  // パターン7: 非常に高い独立性＆低いチームプレイ → 協調の欠落
  // ════════════════════════════════════════════════════════════════
  excessive_independence: {
    title: '過度な独立志向による協調の欠落',
    description: '個の力を発揮する一方で、チーム内の調和や情報共有に後ろ向きな傾向があ���ます。',
    weakness_category: 'collaboration_gap',
    impact: 'チーム全体の効率が落ちる。本人が孤立し、昇進やプロジェクトリード機会を失いやすい。',
    severity: 'medium',
    next_actions: [
      {
        action: 'チーム朝会・MTGをルーティン化：毎日5分でも「今日の進捗・ブロッカー」を共有する',
        difficulty: '低',
        time_to_impact: '即日',
        example: 'スタンドアップミーティングで『自分の状況を1分で説明』する習慣がつくと、チーム内の透明性が高まる'
      },
      {
        action: '「ペアプログラミング」や「コードレビュー」など、他者に見せる機会を増やす',
        difficulty: '中',
        time_to_impact: '1週間',
        example: '完成後レビューではなく『この段階でいったん見てもらう』という早期フィードバックサイクルを取る'
      },
      {
        action: 'メンターシップを逆転させる：「チーム内で自分が学べることは何か」と視点を変える',
        difficulty: '低',
        time_to_impact: '2週間',
        example: '他のメンバーの進め方を学ぶことで、自分のアプローチの視野を広げる'
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════
  // パターン8: 柔軟性 > 計画性の差が大きい → 無計画な試行錯誤
  // ════════════════════════════════════════════════════════════════
  high_flexibility_low_planning: {
    title: '無計画な試行錯誤による非効率',
    description: 'いろいろなアプローチを試すことはできますが、事前に計画を立てる習慣が弱い傾向があります。',
    weakness_category: 'lack_of_structure',
    impact: '同じ失敗を繰り返したり、時間を浪費しやすい。成果が不安定になる。',
    severity: 'medium',
    next_actions: [
      {
        action: '「実験計画書」を事前に書く習慣をつける：仮説→実験→検証→次のステップを紙に書く',
        difficulty: '中',
        time_to_impact: '1週間',
        example: '新しいツールを試す前に『これを使うと〇〇が改善されると予想。試期間は1週間。評価軸は□□。』と定義する'
      },
      {
        action: '試したことを「ナレッジ化」する習慣をつける：成功も失敗も記録に残す',
        difficulty: '低',
        time_to_impact: '即日',
        example: '毎週『今週の試行結果』をドキュメントにまとめて、チームで共有する'
      },
      {
        action: '「Go/No-Go」の判断基準を事前に設定する',
        difficulty: '低',
        time_to_impact: '即日',
        example: '「2週間やってみて、成果指標が〇〇に達しなかったら、別のアプローチに切り替える」と決めておく'
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════
  // パターン9: 計画性 >> 柔軟性の差が大きい → 変化対応の硬直性
  // ════════════════════════════════════════════════════════════════
  high_planning_low_flexibility: {
    title: '計画への執着による変化への非対応',
    description: 'きっちりした計画は立てますが、環境変化に対応する柔軟性が限定的な傾向があります。',
    weakness_category: 'inflexibility',
    impact: '急な要件変更や市場変化に対応できず、プロジェクトが空中分解する可能性がある。',
    severity: 'medium',
    next_actions: [
      {
        action: '計画に「スラック（余裕）」を組み込む習慣をつける：80%の精度で計画し、20%は対応に充てる',
        difficulty: '中',
        time_to_impact: '1週間',
        example: '3ヶ月計画なら『最初の8週で基本を固める。最後の4週間は対応・調整に充てる』と設計する'
      },
      {
        action: '定期的に「計画の見直し」を入れる：週1回の進捗MTGで『計画に変更は必要か』と問い直す',
        difficulty: '低',
        time_to_impact: '即日',
        example: 'スプリント単位で『想定外のことが起きた。計画をどう修正する？』と話し合う習慣をつける'
      },
      {
        action: 'PDCA以外の「フレームワーク」を学ぶ：アジャイル・Design Thinking など、流動的なアプローチを体験する',
        difficulty: '中',
        time_to_impact: '1ヶ月',
        example: '小規模プロジェクトで「アジャイル」を1回試してみて、柔軟なプロセスに慣れる'
      }
    ]
  }
}

/**
 * 弱点パターンを検出
 */
export function detectWeaknesses(normalizedDimensions) {
  const weaknesses = []
  const { action, caution, riskManagement, logic, empathy, growth, stability, teamwork, independence, flexibility, planning } = normalizedDimensions

  // ════════════════════════════════════════════════════════════════
  // ルール1: 「高い行動力＆低いリスク管理」を検出
  // ════════════════════════════════════════════════════════════════
  if (action.score > 6 && riskManagement.score < 4) {
    weaknesses.push({
      pattern: 'high_action_low_risk_mgmt',
      severity: 'high',
      severity_score: (action.score - riskManagement.score) / 10,
      scores: { action: action.score, riskManagement: riskManagement.score },
      ...WEAKNESS_PATTERNS.high_action_low_risk_mgmt
    })
  }

  // ════════════════════════════════════════════════════════════════
  // ルール2: 「高い慎重さ＆低い行動力」を検出
  // ════════════════════════════════════════════════════════════════
  if (caution.score > 6 && action.score < 4) {
    weaknesses.push({
      pattern: 'high_caution_low_action',
      severity: 'high',
      severity_score: (caution.score - action.score) / 10,
      scores: { caution: caution.score, action: action.score },
      ...WEAKNESS_PATTERNS.high_caution_low_action
    })
  }

  // ════════════════════════════════════════════════════════════════
  // ルール3: 「高い論理性＆低い共感性」を検出
  // ════════════════════════════════════════════════════════════════
  if (logic.score > 6 && empathy.score < 4) {
    weaknesses.push({
      pattern: 'high_logic_low_empathy',
      severity: 'medium',
      severity_score: (logic.score - empathy.score) / 10,
      scores: { logic: logic.score, empathy: empathy.score },
      ...WEAKNESS_PATTERNS.high_logic_low_empathy
    })
  }

  // ════════════════════════════════════════════════════════════════
  // ルール4: 「高い共感性＆低い論理性」を検出
  // ════════════════════════════════════════════════════════════════
  if (empathy.score > 6 && logic.score < 4) {
    weaknesses.push({
      pattern: 'high_empathy_low_logic',
      severity: 'medium',
      severity_score: (empathy.score - logic.score) / 10,
      scores: { empathy: empathy.score, logic: logic.score },
      ...WEAKNESS_PATTERNS.high_empathy_low_logic
    })
  }

  // ════════════════════════════════════════════════════════════════
  // ルール5: 「成長志向が低い＆安定志向が高い」を検出
  // ════════════════════════════════════════════════════════════════
  if (growth.score < 3 && stability.score > 7) {
    weaknesses.push({
      pattern: 'low_growth_high_stability',
      severity: 'medium',
      severity_score: (stability.score - growth.score) / 10,
      scores: { growth: growth.score, stability: stability.score },
      ...WEAKNESS_PATTERNS.low_growth_high_stability
    })
  }

  // ════════════════════════════════════════════════════════════════
  // ルール6: 「非常に高い協調性 & 非常に低い主張性」を検出
  // ════════════════════════════════════════════════════════════════
  const bigFiveA = normalizedDimensions.components.bigFive.A
  if (bigFiveA?.level === 'high' && independence.score < 3) {
    weaknesses.push({
      pattern: 'excessive_agreeableness',
      severity: 'medium',
      severity_score: 0.5,
      scores: { agreeableness: (bigFiveA?.score || 0), independence: independence.score },
      ...WEAKNESS_PATTERNS.excessive_agreeableness
    })
  }

  // ════════════════════════════════════════════════════════════════
  // ルール7: 「非常に高い独立性 & 非常に低いチームプレイ」を検出
  // ════════════════════════════════════════════════════════════════
  const bigFiveA_low = normalizedDimensions.components.bigFive.A?.level === 'low'
  if (bigFiveA_low && independence.score > 7 && teamwork.score < 3) {
    weaknesses.push({
      pattern: 'excessive_independence',
      severity: 'medium',
      severity_score: (independence.score - teamwork.score) / 10,
      scores: { independence: independence.score, teamwork: teamwork.score },
      ...WEAKNESS_PATTERNS.excessive_independence
    })
  }

  // ════════════════════════════════════════════════════════════════
  // ルール8: 「柔軟性 >> 計画性」を検出
  // ════════════════════════════════════════════════════════════════
  if (flexibility.score > 6.5 && planning.score < 3) {
    weaknesses.push({
      pattern: 'high_flexibility_low_planning',
      severity: 'medium',
      severity_score: (flexibility.score - planning.score) / 10,
      scores: { flexibility: flexibility.score, planning: planning.score },
      ...WEAKNESS_PATTERNS.high_flexibility_low_planning
    })
  }

  // ════════════════════════════════════════════════════════════════
  // ルール9: 「計画性 >> 柔軟性」を検出
  // ════════════════════════════════════════════════════════════════
  if (planning.score > 6.5 && flexibility.score < 3) {
    weaknesses.push({
      pattern: 'high_planning_low_flexibility',
      severity: 'medium',
      severity_score: (planning.score - flexibility.score) / 10,
      scores: { planning: planning.score, flexibility: flexibility.score },
      ...WEAKNESS_PATTERNS.high_planning_low_flexibility
    })
  }

  // 重要度でソート（重大度が高い順 → 同一重大度内で差分が大きい順）
  return weaknesses.sort((a, b) => {
    const severityOrder = { high: 3, medium: 2, low: 1 }
    const severityDiff = severityOrder[b.severity] - severityOrder[a.severity]
    return severityDiff !== 0 ? severityDiff : b.severity_score - a.severity_score
  })
}

/**
 * 単一の弱点の詳細情報を生成
 */
export function getWeaknessDetail(weakness) {
  return {
    title: weakness.title,
    description: weakness.description,
    category: weakness.weakness_category,
    severity: weakness.severity,
    impact: weakness.impact,
    next_actions: weakness.next_actions
  }
}
