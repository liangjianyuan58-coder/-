import { useState } from 'react'
import ManagerSetup from './ManagerSetup'

export default function WelcomeScreen({ onStart }) {
  const [showSetup, setShowSetup] = useState(false)

  return (
    <div className="welcome">
      {showSetup && <ManagerSetup onClose={() => setShowSetup(false)} />}
      <div className="welcome-card">
        <div className="welcome-badge">⏱ 約5分で完了</div>
        <h1 className="welcome-title">
          <span className="gradient-text">性格診断</span>
        </h1>
        <p className="welcome-subtitle">あなたの強みとマネジメント適性を発見</p>

        <div className="features">
          <div className="feature-item">
            <span className="feature-icon">🧠</span>
            <div>
              <div className="feature-name">MBTI診断</div>
              <div className="feature-desc">16タイプの性格分類</div>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚖️</span>
            <div>
              <div className="feature-name">男性脳・女性脳</div>
              <div className="feature-desc">思考の傾向を%で表示</div>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <div>
              <div className="feature-name">仕事スタイル</div>
              <div className="feature-desc">コミュニケーション・動機・ストレス対処</div>
            </div>
          </div>
        </div>

        <div className="welcome-meta">全20問 · 約5分 · 診断後にURLで結果を共有できます</div>
        <button className="btn-start" onClick={onStart}>
          診断を始める →
        </button>

        <button className="btn-manager-setup" onClick={() => setShowSetup(true)}>
          ⚙️ 管理者設定
        </button>
      </div>
    </div>
  )
}
