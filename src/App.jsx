import { useState, useEffect } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import QuestionScreen from './components/QuestionScreen'
import ResultScreen from './components/ResultScreen'
import { questions } from './data/questions'
import { calculateResults } from './utils/scoring'

function buildShareUrl(answerValues) {
  const encoded = btoa(JSON.stringify(answerValues))
  return `${window.location.origin}${window.location.pathname}#${encoded}`
}

function decodeHash(hash) {
  const values = JSON.parse(atob(hash))
  return questions.map((q, i) => ({
    questionId: q.id,
    category: q.category,
    dimension: q.dimension,
    brainType: q.brainType,
    trait: q.trait,
    value: values[i],
  }))
}

export default function App() {
  const [phase, setPhase] = useState('welcome')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [results, setResults] = useState(null)
  const [shareUrl, setShareUrl] = useState('')
  const [isShared, setIsShared] = useState(false)

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    try {
      const reconstructed = decodeHash(hash)
      const computed = calculateResults(reconstructed)
      setShareUrl(buildShareUrl(reconstructed.map(a => a.value)))
      setResults(computed)
      setIsShared(true)
      setPhase('results')
    } catch {
      // invalid hash — ignore and show welcome
    }
  }, [])

  const handleStart = () => setPhase('questions')

  const handleAnswer = (value) => {
    const q = questions[currentIndex]
    const newAnswer = {
      questionId: q.id,
      category: q.category,
      dimension: q.dimension,
      brainType: q.brainType,
      trait: q.trait,
      value,
    }
    const newAnswers = [...answers, newAnswer]
    setAnswers(newAnswers)

    if (currentIndex + 1 < questions.length) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300)
    } else {
      const computed = calculateResults(newAnswers)
      const url = buildShareUrl(newAnswers.map(a => a.value))
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
      question={questions[currentIndex]}
      currentIndex={currentIndex}
      total={questions.length}
      onAnswer={handleAnswer}
    />
  )
  if (phase === 'results') return (
    <ResultScreen
      results={results}
      shareUrl={shareUrl}
      isShared={isShared}
      onRetake={handleRetake}
    />
  )
}
