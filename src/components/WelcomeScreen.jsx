import { useState } from 'react'
import ManagerSetup from './ManagerSetup'

export default function WelcomeScreen({ onStart }) {
  const [showSetup, setShowSetup] = useState(false)

  return (
    <div className="welcome">
      {showSetup && <ManagerSetup onClose={() => setShowSetup(false)} />}
      <div className="welcome-card">
        <h1 className="welcome-title">
          <span className="gradient-text">性格診断</span>
        </h1>
        <p className="welcome-subtitle">あなたの強みと仕事スタイルを発見</p>

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

        <p className="mode-select-label">診断モードを選んでください</p>
        <div className="mode-selection">
          <button className="btn-mode" onClick={() => onStart('simple')}>
            <div className="mode-icon">⚡</div>
            <div className="mode-title">簡易診断</div>
            <div className="mode-time">約5分 · 24問</div>
            <div className="mode-desc">MBTI・脳タイプ・性格特性など基本8軸</div>
          </button>
          <button className="btn-mode btn-mode-detailed" onClick={() => onStart('detailed')}>
            <div className="mode-icon">🔬</div>
            <div className="mode-title">詳細診断</div>
            <div className="mode-time">約12〜15分 · 46問</div>
            <div className="mode-desc">基本8軸＋意思決定・リーダーシップ等14軸</div>
          </button>
          <button className="btn-mode btn-mode-premium" onClick={() => onStart('premium')}>
            <div className="mode-icon">🏆</div>
            <div className="mode-title">プレミアム診断</div>
            <div className="mode-time">約20分 · 54問</div>
            <div className="mode-desc">全14軸を5段階の精密回答で測定＋回答一貫性チェック＋自由記述。最も高精度な分析</div>
          </button>
        </div>

        <div className="welcome-meta">診断後にURLで結果を共有できます</div>

        <button className="btn-manager-setup" onClick={() => setShowSetup(true)}>
          ⚙️ 管理者設定
        </button>
      </div>
    </div>
  )
}
