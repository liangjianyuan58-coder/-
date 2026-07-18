import { detailedQuestions } from './questionsDetailed.js'

// ── Premium mode: 5-point Likert versions of all 46 detailed questions
//    + 6 consistency-check items (lie scale) + 2 free-text items ────────

const LIKERT5 = [
  { label: 'そう思う', value: 4 },
  { label: 'ややそう思う', value: 3 },
  { label: 'どちらとも言えない', value: 2 },
  { label: 'あまりそう思わない', value: 1 },
  { label: 'そう思わない', value: 0 },
]

// Binary A/B question → bipolar 5-point. Option value encodes pole + weight ('Ni:2')
const toBipolar = (q) => {
  const [a, b] = q.options
  return {
    ...q,
    type: 'bipolar',
    poleA: a,
    poleB: b,
    options: [
      { label: 'Aにかなり近い', value: `${a.value}:2` },
      { label: 'Aにやや近い', value: `${a.value}:1` },
      { label: 'どちらとも言えない', value: 'mid:0' },
      { label: 'Bにやや近い', value: `${b.value}:1` },
      { label: 'Bにかなり近い', value: `${b.value}:2` },
    ],
  }
}

// 3-point agree scale → 5-point (max 4)
const toScale5 = (q) => ({ ...q, max: 4, options: LIKERT5 })

// ── Consistency-check items (IDs 47-52) ──────────────────────────────
// Each re-measures a construct already asked earlier, reworded / reversed.
// checkPair = the earlier question ID it is compared against.

const consistencyQuestions = [
  toBipolar({
    id: 47, category: 'mbti', dimension: 'EI', section: '最終チェック', checkPair: 1,
    text: '大人数の集まりに参加した後は？',
    options: [
      { label: 'どっと疲れて、一人の時間が必要になる', value: 'I' },
      { label: 'むしろエネルギーをもらって元気になる', value: 'E' },
    ],
  }),
  toBipolar({
    id: 48, category: 'mbti', dimension: 'NiNe', section: '最終チェック', checkPair: 3,
    text: 'アイデアを扱っているとき、心地よいのは？',
    options: [
      { label: '可能性をどんどん広げ続けている時間', value: 'Ne' },
      { label: '一つの答えに収束していく瞬間', value: 'Ni' },
    ],
  }),
  toBipolar({
    id: 49, category: 'mbti', dimension: 'FiFe', section: '最終チェック', checkPair: 8,
    text: '自分の気持ちと周囲の期待がズレたとき？',
    options: [
      { label: '周りがどう思っても、譲れない自分の感覚を優先したい', value: 'Fi' },
      { label: 'その場のみんなが心地よくなる方に合わせたい', value: 'Fe' },
    ],
  }),
  toScale5({
    id: 50, category: 'bigfive', bigFiveType: 'C', reverse: true, section: '最終チェック', checkPair: 13,
    text: '締め切りギリギリにならないと、手をつけられないことが多い',
  }),
  toScale5({
    id: 51, category: 'bigfive', bigFiveType: 'N', reverse: true, section: '最終チェック', checkPair: 14,
    text: '失敗やトラブルがあっても、一晩寝ればすぐに切り替えられる',
  }),
  toScale5({
    id: 52, category: 'brain', brainType: 'systemizing', reverse: true, section: '最終チェック', checkPair: 9,
    text: '機械や仕組みの構造には興味がなく、感覚で使えれば十分だ',
  }),
]

// ── Free-text items (IDs 53-54) ──────────────────────────────────────

const freeTextQuestions = [
  {
    id: 53, category: 'freetext', type: 'text', section: '自由記述', maxLength: 200,
    text: '最近、仕事で「嬉しかった」「手応えがあった」出来事があれば教えてください（任意）',
  },
  {
    id: 54, category: 'freetext', type: 'text', section: '自由記述', maxLength: 200,
    text: 'いまの仕事や環境について、正直に思っていることがあれば一言どうぞ（任意）',
  },
]

export const premiumQuestions = [
  ...detailedQuestions.map(q => {
    if (q.category === 'mbti') return toBipolar(q)
    if (q.category === 'brain' || q.category === 'bigfive') return toScale5(q)
    return q
  }),
  ...consistencyQuestions,
  ...freeTextQuestions,
]
