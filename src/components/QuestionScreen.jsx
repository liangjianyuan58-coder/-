import { useState, useEffect } from 'react'

const SECTION_COLORS = {
  'MBTI (1/4)': '#6366f1',
  'MBTI (2/4)': '#8b5cf6',
  'MBTI (3/4)': '#7c3aed',
  'MBTI (4/4)': '#6d28d9',
  '脳タイプ診断': '#0ea5e9',
  '性格特性':   '#0d9488',
  '仕事の価値観': '#d97706',
  '仕事スタイル': '#f97316',
  '思考スタイル': '#e11d48',
  'リーダーシップ': '#16a34a',
  'マネジメント詳細': '#9333ea',
  '最終チェック': '#64748b',
  '自由記述': '#475569',
}

export default function QuestionScreen({ question, currentIndex, total, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [textVal, setTextVal] = useState('')
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    setSelected(null)
    setTextVal('')
    setTransitioning(false)
  }, [question.id])

  const handleSelect = (value) => {
    if (transitioning) return
    setSelected(value)
    setTransitioning(true)
    setTimeout(() => onAnswer(value), 380)
  }

  const handleTextSubmit = () => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => onAnswer(textVal.trim()), 250)
  }

  const progress = (currentIndex / total) * 100
  const color = SECTION_COLORS[question.section] || '#6366f1'
  const maxLen = question.maxLength || 200

  return (
    <div className="question-screen">
      <div className="progress-header">
        <div className="progress-info">
          <span className="section-badge" style={{ background: color }}>
            {question.section}
          </span>
          <span className="progress-count">{currentIndex + 1} / {total}</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%`, background: color }}
          />
        </div>
      </div>

      <div className={`question-card${transitioning ? ' fade-out' : ''}`}>
        <div className="question-number">Q{currentIndex + 1}</div>
        <h2 className="question-text">{question.text}</h2>

        {question.type === 'bipolar' && (
          <div className="bipolar-statements">
            <div className="bipolar-statement">
              <span className="bipolar-tag" style={{ background: color }}>A</span>
              <span>{question.poleA.label}</span>
            </div>
            <div className="bipolar-statement">
              <span className="bipolar-tag" style={{ background: color }}>B</span>
              <span>{question.poleB.label}</span>
            </div>
          </div>
        )}

        {question.type === 'text' ? (
          <div className="freetext-wrap">
            <textarea
              className="freetext-input"
              rows={4}
              maxLength={maxLen}
              value={textVal}
              onChange={(e) => setTextVal(e.target.value)}
              placeholder="任意入力（空欄のままでもOK）"
            />
            <div className="freetext-count">{textVal.length} / {maxLen}</div>
            <button
              className="btn-freetext-next"
              style={{ background: color }}
              onClick={handleTextSubmit}
            >
              {textVal.trim() ? '次へ →' : 'スキップして次へ →'}
            </button>
          </div>
        ) : (
          <div className="options-list">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                className={`option-btn${selected === opt.value ? ' selected' : ''}${question.type === 'bipolar' ? ' option-btn-compact' : ''}`}
                style={selected === opt.value
                  ? { borderColor: color, backgroundColor: `${color}18` }
                  : {}}
                onClick={() => handleSelect(opt.value)}
              >
                <span
                  className="option-check"
                  style={selected === opt.value
                    ? { background: color, borderColor: color }
                    : {}}
                >
                  {selected === opt.value ? '✓' : ''}
                </span>
                <span className="option-label">{opt.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
