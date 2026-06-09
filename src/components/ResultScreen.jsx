import { useEffect, useRef, useState } from 'react'

const MGMT_ICONS = {
  communication: '💬',
  motivation: '🔥',
  stress: '⚡',
  feedback: '📝',
  role: '👤',
  learning: '📚',
}

const MGMT_TITLES = {
  communication: 'コミュニケーション',
  motivation: 'モチベーション源',
  stress: 'ストレス対処',
  feedback: 'フィードバック',
  role: 'チームの役割',
  learning: '学習スタイル',
}

function generateAIPrompt(results) {
  const { mbtiType, mbtiInfo, dimensions, maleBrainPct, femaleBrainPct, management } = results

  const total = (d, a, b) => (d[a] || 0) + (d[b] || 0)
  const pct = (d, a, b) => {
    const t = total(d, a, b)
    return t ? Math.round(((d[a] || 0) / t) * 100) : 50
  }

  const mgmtLines = Object.entries(management)
    .map(([key, val]) => `　${MGMT_TITLES[key]}：${val.label}（${val.desc}）`)
    .join('\n')

  return `以下は、あるメンバーの性格・仕事スタイル診断の結果です。マネジメントの観点で詳しく分析してください。

━━━━━━━━━━━━━━━━━━━━━━
■ MBTIタイプ：${mbtiType}（${mbtiInfo.name}）
　${mbtiInfo.tagline}

■ 各軸のスコア
　E（外向）${pct(dimensions, 'E', 'I')}% ／ I（内向）${100 - pct(dimensions, 'E', 'I')}%
　N（直感）${pct(dimensions, 'N', 'S')}% ／ S（感覚）${100 - pct(dimensions, 'N', 'S')}%
　T（論理）${pct(dimensions, 'T', 'F')}% ／ F（感情）${100 - pct(dimensions, 'T', 'F')}%
　J（判断）${pct(dimensions, 'J', 'P')}% ／ P（知覚）${100 - pct(dimensions, 'J', 'P')}%

■ 脳タイプ
　男性脳（論理・体系化）：${maleBrainPct}%
　女性脳（共感・感情）：${femaleBrainPct}%

■ 仕事スタイル
${mgmtLines}
━━━━━━━━━━━━━━━━━━━━━━

以下の観点で分析・アドバイスをください：
1. この人の強みと弱み
2. 向いているタスクや役割
3. 効果的なコミュニケーション方法
4. モチベーションを引き出すアプローチ
5. 注意すべき言動・地雷
6. 1on1ミーティングのポイント
7. チームへのアサイン時の注意点`
}

export default function ResultScreen({ results, shareUrl, isShared, onRetake }) {
  const { mbtiType, mbtiInfo, dimensions, maleBrainPct, femaleBrainPct, management, tips } = results
  const [animated, setAnimated] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [promptVisible, setPromptVisible] = useState(false)
  const toastTimer = useRef(null)
  const promptText = generateAIPrompt(results)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(t)
  }, [])

  const showToast = (msg) => {
    setToastMsg(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastMsg(''), 2500)
  }

  const handleShare = async () => {
    const title = `${mbtiType} ${mbtiInfo.name} - 性格診断結果`
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl })
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareUrl)
      showToast('URLをコピーしました')
    }
  }

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(promptText)
    showToast('AIプロンプトをコピーしました')
  }

  const brainDesc =
    maleBrainPct > 62 ? 'システム思考・論理分析が強い傾向です' :
    femaleBrainPct > 62 ? '共感・感情読み取りが得意な傾向です' :
    'システム思考と共感力がバランス良く備わっています'

  return (
    <div className="result-screen">
      {toastMsg && <div className="toast">{toastMsg}</div>}

      <div className="result-header">
        <div className="result-badge">{isShared ? 'メンバーの診断結果' : '診断完了!'}</div>
        <h1>{isShared ? 'マネジメント分析レポート' : 'あなたの診断結果'}</h1>
      </div>

      {/* MBTI */}
      <section className="result-section">
        <h2 className="section-title">🧠 MBTIタイプ</h2>
        <div className="mbti-card" style={{ borderColor: mbtiInfo.color }}>
          <div className="mbti-type" style={{ color: mbtiInfo.color }}>{mbtiType}</div>
          <div className="mbti-name">{mbtiInfo.name}</div>
          <div className="mbti-tagline">{mbtiInfo.tagline}</div>

          <div className="dimension-bars">
            {[['E', 'I'], ['N', 'S'], ['T', 'F'], ['J', 'P']].map(([a, b]) => {
              const total = (dimensions[a] || 0) + (dimensions[b] || 0)
              const pct = total ? Math.round(((dimensions[a] || 0) / total) * 100) : 50
              return (
                <div key={a + b} className="dimension-bar-row">
                  <span className="dim-label" style={{ color: mbtiInfo.color }}>{a}</span>
                  <div className="dim-bar">
                    <div
                      className="dim-fill"
                      style={{ width: animated ? `${pct}%` : '0%', background: mbtiInfo.color }}
                    />
                  </div>
                  <span className="dim-label-right">{b}</span>
                  <span className="dim-pct">{pct}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Brain Type */}
      <section className="result-section">
        <h2 className="section-title">⚖️ 脳タイプ</h2>
        <div className="brain-card">
          <div className="brain-labels">
            <div className="brain-label-left">
              <span className="brain-pct male">{maleBrainPct}%</span>
              <span className="brain-name">男性脳</span>
              <span className="brain-sub">論理・分析・体系化</span>
            </div>
            <div className="brain-label-right">
              <span className="brain-pct female">{femaleBrainPct}%</span>
              <span className="brain-name">女性脳</span>
              <span className="brain-sub">共感・直感・関係性</span>
            </div>
          </div>
          <div className="brain-spectrum">
            <div className="brain-fill" style={{ width: animated ? `${maleBrainPct}%` : '0%' }} />
          </div>
          <div className="brain-desc">{brainDesc}</div>
        </div>
      </section>

      {/* Work Style */}
      <section className="result-section">
        <h2 className="section-title">
          {isShared ? '📊 仕事スタイル・適性分析' : '📊 あなたの仕事スタイル'}
        </h2>
        <div className="management-grid">
          {Object.entries(management).map(([key, val]) => (
            <div key={key} className="mgmt-card">
              <div className="mgmt-icon">{MGMT_ICONS[key]}</div>
              <div className="mgmt-title">{MGMT_TITLES[key]}</div>
              <div className="mgmt-label">{val.label}</div>
              <div className="mgmt-desc">{val.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Manager-only sections */}
      {isShared && (
        <>
          <section className="result-section">
            <h2 className="section-title">💡 マネジメントのポイント</h2>
            <div className="tips-card">
              {tips.map((tip, i) => (
                <div key={i} className="tip-item">
                  <span className="tip-bullet">▸</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="result-section">
            <h2 className="section-title">🤖 AIで深掘り分析</h2>
            <div className="ai-card">
              <p className="ai-desc">
                以下のプロンプトをそのままChatGPT・Claudeに貼り付けると、より詳細な分析を得られます。
              </p>
              <button className="btn-copy-prompt" onClick={handleCopyPrompt}>
                AIプロンプトをコピーする
              </button>
              <button
                className="btn-toggle-prompt"
                onClick={() => setPromptVisible(v => !v)}
              >
                {promptVisible ? 'プロンプトを閉じる ▲' : 'プロンプトを確認する ▼'}
              </button>
              {promptVisible && (
                <pre className="prompt-preview">{promptText}</pre>
              )}
            </div>
          </section>
        </>
      )}

      {!isShared && (
        <button className="btn-share" onClick={handleShare}>
          結果を共有する（マネージャーに送る）
        </button>
      )}

      <button className="btn-retake" onClick={onRetake}>
        {isShared ? '自分も診断する' : 'もう一度診断する'}
      </button>
    </div>
  )
}
