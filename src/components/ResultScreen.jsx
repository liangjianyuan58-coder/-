import { useEffect, useRef, useState } from 'react'
import { generateAIPrompt } from '../utils/scoring'

const MGMT_ICONS = { communication: '💬', motivation: '🔥', feedback: '📝', role: '👤' }
const MGMT_TITLES = { communication: 'コミュニケーション', motivation: 'モチベーション源', feedback: 'フィードバック', role: 'チームの役割' }

const CONFLICT_ICONS = {
  competing:     '⚔️',
  collaborating: '🤝',
  compromising:  '⚖️',
  accommodating: '🕊️',
}

const VALUES_ICON = {
  growth: '📈', stability: '🏠', autonomy: '🗽', contribution: '💛',
  achievement: '🏆', teamwork: '👥', mastery: '🎯', impact: '🌍',
  expert: '🔬', leader: '👑', stable: '⚓', mission: '🌟',
}

export default function ResultScreen({ results, shareUrl, isShared, mode, managerUnlocked, onRetake }) {
  const { mbtiType, mbtiInfo, dimensions, maleBrainPct, femaleBrainPct,
          bigFive, workValues, conflictStyle, management,
          decisionStyle, leadershipStyle, recognitionStyle, stressTriggers,
          tips } = results
  const [animated, setAnimated] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [promptVisible, setPromptVisible] = useState(false)
  const toastTimer = useRef(null)

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
      try { await navigator.share({ title, url: shareUrl }) } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(shareUrl)
      showToast('URLをコピーしました')
    }
  }

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(generateAIPrompt(results))
    showToast('AIプロンプトをコピーしました')
  }

  const brainDesc =
    maleBrainPct > 62 ? 'システム思考・論理分析が強い傾向です' :
    femaleBrainPct > 62 ? '共感・感情読み取りが得意な傾向です' :
    'システム思考と共感力がバランス良く備わっています'

  const isManagerView = isShared && managerUnlocked

  return (
    <div className="result-screen">
      {toastMsg && <div className="toast">{toastMsg}</div>}

      <div className="result-header">
        <div className="result-badge">{isManagerView ? 'マネジメント分析' : '診断完了!'}</div>
        <h1>{isManagerView ? 'マネジメント分析レポート' : 'あなたの診断結果'}</h1>
      </div>

      {/* MBTI */}
      <section className="result-section">
        <h2 className="section-title">🧠 MBTIタイプ</h2>
        <div className="mbti-card" style={{ borderColor: mbtiInfo.color }}>
          <div className="mbti-type" style={{ color: mbtiInfo.color }}>{mbtiType}</div>
          <div className="mbti-name">{mbtiInfo.name}</div>
          <div className="mbti-tagline">{mbtiInfo.tagline}</div>
          <div className="dimension-bars">
            {[['E','I'],['N','S'],['T','F'],['J','P']].map(([a, b]) => {
              const total = (dimensions[a]||0) + (dimensions[b]||0)
              const pct = total ? Math.round(((dimensions[a]||0)/total)*100) : 50
              return (
                <div key={a+b} className="dimension-bar-row">
                  <span className="dim-label" style={{ color: mbtiInfo.color }}>{a}</span>
                  <div className="dim-bar">
                    <div className="dim-fill" style={{ width: animated ? `${pct}%` : '0%', background: mbtiInfo.color }} />
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

      {/* Big Five */}
      <section className="result-section">
        <h2 className="section-title">🧬 性格特性</h2>
        <div className="bigfive-grid">
          {/* Conscientiousness */}
          <div className="bigfive-card">
            <div className="bigfive-header">
              <span className="bigfive-icon">📋</span>
              <span className="bigfive-name">誠実性</span>
              <span className={`bigfive-badge level-${bigFive.C.level}`}>{bigFive.C.label}</span>
            </div>
            <div className="bigfive-bar-wrap">
              <div className="bigfive-bar">
                <div className="bigfive-fill bf-c" style={{ width: animated ? `${bigFive.C.pct}%` : '0%' }} />
              </div>
              <span className="bigfive-pct">{bigFive.C.pct}%</span>
            </div>
            <p className="bigfive-desc">{bigFive.C.desc}</p>
          </div>
          {/* Neuroticism */}
          <div className="bigfive-card">
            <div className="bigfive-header">
              <span className="bigfive-icon">🌊</span>
              <span className="bigfive-name">情緒安定性</span>
              <span className={`bigfive-badge level-${bigFive.N.level === 'low' ? 'high' : bigFive.N.level === 'high' ? 'low' : 'mid'}`}>
                {bigFive.N.label}
              </span>
            </div>
            <div className="bigfive-bar-wrap">
              <div className="bigfive-bar">
                {/* Invert: low N = stable = high bar */}
                <div className="bigfive-fill bf-n" style={{ width: animated ? `${100 - bigFive.N.pct}%` : '0%' }} />
              </div>
              <span className="bigfive-pct">{100 - bigFive.N.pct}%</span>
            </div>
            <p className="bigfive-desc">{bigFive.N.desc}</p>
          </div>
          {/* Openness (detailed only) */}
          {bigFive.O && (
            <div className="bigfive-card">
              <div className="bigfive-header">
                <span className="bigfive-icon">🔭</span>
                <span className="bigfive-name">開放性</span>
                <span className={`bigfive-badge level-${bigFive.O.level}`}>{bigFive.O.label}</span>
              </div>
              <div className="bigfive-bar-wrap">
                <div className="bigfive-bar">
                  <div className="bigfive-fill bf-o" style={{ width: animated ? `${bigFive.O.pct}%` : '0%' }} />
                </div>
                <span className="bigfive-pct">{bigFive.O.pct}%</span>
              </div>
              <p className="bigfive-desc">{bigFive.O.desc}</p>
            </div>
          )}
          {/* Agreeableness (detailed only) */}
          {bigFive.A && (
            <div className="bigfive-card">
              <div className="bigfive-header">
                <span className="bigfive-icon">🤝</span>
                <span className="bigfive-name">協調性</span>
                <span className={`bigfive-badge level-${bigFive.A.level}`}>{bigFive.A.label}</span>
              </div>
              <div className="bigfive-bar-wrap">
                <div className="bigfive-bar">
                  <div className="bigfive-fill bf-a" style={{ width: animated ? `${bigFive.A.pct}%` : '0%' }} />
                </div>
                <span className="bigfive-pct">{bigFive.A.pct}%</span>
              </div>
              <p className="bigfive-desc">{bigFive.A.desc}</p>
            </div>
          )}
        </div>
      </section>

      {/* Work Values */}
      <section className="result-section">
        <h2 className="section-title">💎 仕事の価値観</h2>
        <div className="values-card">
          <div className="values-primary">
            <span className="values-icon">{VALUES_ICON[workValues.primary] || '💡'}</span>
            <div>
              <div className="values-label">{workValues.label}</div>
              <div className="values-desc">{workValues.desc}</div>
            </div>
          </div>
          {workValues.secondaryInfo && (
            <div className="values-secondary">
              <span className="values-secondary-tag">サブ</span>
              <span className="values-secondary-label">{workValues.secondaryInfo.label}</span>
            </div>
          )}
        </div>
      </section>

      {/* Work Style */}
      <section className="result-section">
        <h2 className="section-title">
          {isManagerView ? '📊 仕事スタイル・適性分析' : '📊 あなたの仕事スタイル'}
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
          {conflictStyle && (
            <div className="mgmt-card">
              <div className="mgmt-icon">{CONFLICT_ICONS[conflictStyle.type]}</div>
              <div className="mgmt-title">コンフリクト</div>
              <div className="mgmt-label">{conflictStyle.label}</div>
              <div className="mgmt-desc">{conflictStyle.desc}</div>
            </div>
          )}
        </div>
      </section>

      {/* Decision-making style (detailed only) */}
      {decisionStyle && (
        <section className="result-section">
          <h2 className="section-title">⚡ 意思決定スタイル</h2>
          <div className="detail-card">
            <div className="detail-main">
              <span className="detail-icon-large">{decisionStyle.icon}</span>
              <div>
                <div className="detail-label">{decisionStyle.label}</div>
                <div className="detail-desc">{decisionStyle.desc}</div>
              </div>
            </div>
            {decisionStyle.secondary && (
              <div className="detail-secondary">
                <span className="detail-sub-tag">サブ</span>
                <span className="detail-sub-text">{decisionStyle.secondary.icon} {decisionStyle.secondary.label}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Leadership tendency (detailed only) */}
      {leadershipStyle && (
        <section className="result-section">
          <h2 className="section-title">🎯 リーダーシップ傾向</h2>
          <div className="detail-card">
            <div className="detail-main">
              <span className="detail-icon-large">{leadershipStyle.icon}</span>
              <div>
                <div className="detail-label">{leadershipStyle.label}</div>
                <div className="detail-desc">{leadershipStyle.desc}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recognition style (detailed only) */}
      {recognitionStyle && (
        <section className="result-section">
          <h2 className="section-title">🌟 承認スタイル</h2>
          <div className="detail-card">
            <div className="detail-main">
              <span className="detail-icon-large">{recognitionStyle.icon}</span>
              <div>
                <div className="detail-label">{recognitionStyle.label}</div>
                <div className="detail-desc">{recognitionStyle.desc}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stress triggers (detailed only) */}
      {stressTriggers && (
        <section className="result-section">
          <h2 className="section-title">⚠️ ストレス傾向</h2>
          <div className="stress-card">
            {stressTriggers.trigger && (
              <div className="stress-row">
                <div className="stress-tag stress-tag-trigger">ストレス源</div>
                <div className="stress-content">
                  <div className="stress-label">{stressTriggers.trigger.label}</div>
                  <div className="stress-desc">{stressTriggers.trigger.desc}</div>
                </div>
              </div>
            )}
            {stressTriggers.sign && (
              <div className="stress-row">
                <div className="stress-tag stress-tag-sign">サイン</div>
                <div className="stress-content">
                  <div className="stress-label">{stressTriggers.sign.label}</div>
                  <div className="stress-desc">{stressTriggers.sign.desc}</div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Manager-only */}
      {isManagerView && (
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
                このプロンプトをそのままChatGPT・Claudeに貼り付けると、離職リスク・アサイン適性・1on1ポイントなど8軸で詳細分析が得られます。
              </p>
              <button className="btn-copy-prompt" onClick={handleCopyPrompt}>
                AIプロンプトをコピーする
              </button>
              <button className="btn-toggle-prompt" onClick={() => setPromptVisible(v => !v)}>
                {promptVisible ? 'プロンプトを閉じる ▲' : 'プロンプトを確認する ▼'}
              </button>
              {promptVisible && <pre className="prompt-preview">{generateAIPrompt(results)}</pre>}
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
        {isManagerView ? '別のメンバーの結果を見る' : isShared ? '自分も診断する' : 'もう一度診断する'}
      </button>
    </div>
  )
}
