import { useState, useEffect } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import QuestionScreen from './components/QuestionScreen'
import ResultScreen from './components/ResultScreen'
import { questions as simpleQuestions } from './data/questions'
import { detailedQuestions } from './data/questionsDetailed'
import { premiumQuestions } from './data/questionsPremium'
import { calculateEnhancedResults } from './utils/enhancedResults'
import { hasManagerAccess } from './utils/managerAuth'

// Unicode-safe base64 (premium free text contains Japanese; plain btoa throws)
const b64encode = (str) => {
  const bytes = new TextEncoder().encode(str)
  let bin = ''
  bytes.forEach(b => { bin += String.fromCharCode(b) })
  return btoa(bin)
}
const b64decode = (b64) => {
  const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

const QUESTION_SETS = {
  simple: simpleQuestions,
  detailed: detailedQuestions,
  premium: premiumQuestions,
}

// ID-based encoding — order-independent, version-safe
function buildShareUrl(answers, mode) {
  const pairs = answers.map(a => [a.questionId, a.value])
  const encoded = b64encode(JSON.stringify(pairs))
  const prefix = mode === 'premium' ? 'p' : mode === 'detailed' ? 'd' : 's'
  return `${window.location.origin}${window.location.pathname}#${prefix}:${encoded}`
}

function decodeHash(hash) {
  // v2 legacy (positional, simple 24q)
  if (hash.startsWith('v2:')) {
    const values = JSON.parse(b64decode(hash.slice(3)))
    return {
      mode: 'simple',
      answers: simpleQuestions.map((q, i) => ({
        questionId: q.id, category: q.category, dimension: q.dimension,
        brainType: q.brainType, bigFiveType: q.bigFiveType, trait: q.trait,
        value: values[i],
      })),
    }
  }

  // Current format: s: / d: / p:
  const [prefix, encoded] = [hash.slice(0, 1), hash.slice(2)]
  if (!encoded) throw new Error('invalid hash')
  const pairs = JSON.parse(b64decode(encoded))
  const answerMap = Object.fromEntries(pairs)
  const mode = prefix === 'p' ? 'premium' : prefix === 'd' ? 'detailed' : 'simple'
  const questionSet = QUESTION_SETS[mode]

  return {
    mode,
    answers: questionSet.map(q => ({
      questionId: q.id, category: q.category, dimension: q.dimension,
      brainType: q.brainType, bigFiveType: q.bigFiveType,
      trait: q.trait, stressType: q.stressType,
      max: q.max, reverse: q.reverse,
      qText: q.category === 'freetext' ? q.text : undefined,
      value: answerMap[q.id],
    })),
  }
}

export default function App() {
  const [phase, setPhase] = useState('welcome')
  const [mode, setMode] = useState('simple')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [results, setResults] = useState(null)
  const [shareUrl, setShareUrl] = useState('')
  const [isShared, setIsShared] = useState(false)
  const [isManagerDevice] = useState(() => hasManagerAccess())

  const questionSet = QUESTION_SETS[mode]

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    try {
      const { mode: m, answers: reconstructed } = decodeHash(hash)
      // ✨ NEW: calculateEnhancedResults を使用（従来の calculateResults ではなく）
      const computed = calculateEnhancedResults(reconstructed)
      setMode(m)
      setShareUrl(buildShareUrl(reconstructed, m))
      setResults(computed)
      setIsShared(true)
      setPhase('results')
    } catch {
      // invalid hash — show welcome
    }
  }, [])

  const handleStart = (selectedMode) => {
    setMode(selectedMode)
    setPhase('questions')
  }

  const handleAnswer = (value) => {
    const q = questionSet[currentIndex]
    const newAnswer = {
      questionId: q.id, category: q.category, dimension: q.dimension,
      brainType: q.brainType, bigFiveType: q.bigFiveType,
      trait: q.trait, stressType: q.stressType,
      max: q.max, reverse: q.reverse,
      qText: q.category === 'freetext' ? q.text : undefined,
      value,
    }
    const newAnswers = [...answers, newAnswer]
    setAnswers(newAnswers)

    if (currentIndex + 1 < questionSet.length) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300)
    } else {
      // ✨ NEW: calculateEnhancedResults を使用
      const computed = calculateEnhancedResults(newAnswers)
      const url = buildShareUrl(newAnswers, mode)
      setResults(computed)
      setShareUrl(url)
      setPhase('results')
    }
  }

  const handleRetake = () => {
    window.location.hash = ''
    setPhase('welcome')
    setCurrentIndex(0)
    setAnswers([])
    setResults(null)
    setShareUrl('')
    setIsShared(false)
  }

  if (phase === 'welcome') return <WelcomeScreen onStart={handleStart} />
  if (phase === 'questions') return (
    <QuestionScreen
      question={questionSet[currentIndex]}
      currentIndex={currentIndex}
      total={questionSet.length}
      onAnswer={handleAnswer}
    />
  )
  if (phase === 'results') return (
    <ResultScreen
      results={results}
      shareUrl={shareUrl}
      isShared={isShared}
      mode={mode}
      managerUnlocked={isManagerDevice}
      onRetake={handleRetake}
    />
  )
}
