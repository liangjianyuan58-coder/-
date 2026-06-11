import { useState, useEffect } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import QuestionScreen from './components/QuestionScreen'
import ResultScreen from './components/ResultScreen'
import { questions as simpleQuestions } from './data/questions'
import { detailedQuestions } from './data/questionsDetailed'
import { calculateResults } from './utils/scoring'
import { hasManagerAccess } from './utils/managerAuth'

// ID-based encoding — order-independent, version-safe
function buildShareUrl(answers, mode) {
  const pairs = answers.map(a => [a.questionId, a.value])
  const encoded = btoa(JSON.stringify(pairs))
  const prefix = mode === 'detailed' ? 'd' : 's'
  return `${window.location.origin}${window.location.pathname}#${prefix}:${encoded}`
}

function decodeHash(hash) {
  // v2 legacy (positional, simple 24q)
  if (hash.startsWith('v2:')) {
    const values = JSON.parse(atob(hash.slice(3)))
    return {
      mode: 'simple',
      answers: simpleQuestions.map((q, i) => ({
        questionId: q.id, category: q.category, dimension: q.dimension,
        brainType: q.brainType, bigFiveType: q.bigFiveType, trait: q.trait,
        value: values[i],
      })),
    }
  }

  // Current format: s: or d:
  const [prefix, encoded] = [hash.slice(0, 1), hash.slice(2)]
  if (!encoded) throw new Error('invalid hash')
  const pairs = JSON.parse(atob(encoded))
  const answerMap = Object.fromEntries(pairs)
  const mode = prefix === 'd' ? 'detailed' : 'simple'
  const questionSet = mode === 'detailed' ? detailedQuestions : simpleQuestions

  return {
    mode,
    answers: questionSet.map(q => ({
      questionId: q.id, category: q.category, dimension: q.dimension,
      brainType: q.brainType, bigFiveType: q.bigFiveType,
      trait: q.trait, stressType: q.stressType,
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

  const questionSet = mode === 'detailed' ? detailedQuestions : simpleQuestions

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    try {
      const { mode: m, answers: reconstructed } = decodeHash(hash)
      const computed = calculateResults(reconstructed)
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
      value,
    }
    const newAnswers = [...answers, newAnswer]
    setAnswers(newAnswers)

    if (currentIndex + 1 < questionSet.length) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300)
    } else {
      const computed = calculateResults(newAnswers)
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
