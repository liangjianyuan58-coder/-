import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import QuestionScreen from './components/QuestionScreen'
import ResultScreen from './components/ResultScreen'
import { questions } from './data/questions'
import { calculateResults } from './utils/scoring'

export default function App() {
  const [phase, setPhase] = useState('welcome')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [results, setResults] = useState(null)

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
      setResults(computed)
      setPhase('results')
    }
  }

  const handleRetake = () => {
    setPhase('welcome')
    setCurrentIndex(0)
    setAnswers([])
    setResults(null)
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
  if (phase === 'results') return <ResultScreen results={results} onRetake={handleRetake} />
}
