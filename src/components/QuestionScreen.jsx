import { useState, useEffect } from 'react'

const SECTION_COLORS = {
  'MBTI (1/4)': '#6366f1',
  'MBTI (2/4)': '#8b5cf6',
  'MBTI (3/4)': '#7c3aed',
  'MBTI (4/4)': '#6d28d9',
  '脳タイプ診断': '#0ea5e9',
  'マネジメント適性': '#f59e0b',
}

export default function QuestionScreen({ question, currentIndex, total, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    setSelected(null)
    setTransitioning(false)
  }, [question.id])

  const handleSelect = (value) => {
    if (transitioning) return
    setSelected(value)
    setTransitioning(true)
    setTimeout(() => onAnswer(value), 380)
  }

  const progress = (currentIndex / total) * 100
  const color = SECTION_COLORS[question.section] || '#6366f1'

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

        <div className="options-list">
          {question.options.map((opt) => (
            <button
              key={opt.value}
              className={`option-btn${selected === opt.value ? ' selected' : ''}`}
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
      </div>
    </div>
  )
}
