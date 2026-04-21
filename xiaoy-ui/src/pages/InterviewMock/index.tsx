import { useEffect, useMemo, useState } from 'react'
import './InterviewMock.css'
import QuestionCard from './components/QuestionCard'
import AnswerPanel from './components/AnswerPanel'

type InterviewQuestion = {
  id: number
  title: string
  standardAnswer: string
}

type EvaluationResult = {
  standardAnswer: string
  analysis: string
  score: number
  suggestion: string
}

type SubmissionRecord = {
  id: number
  questionId: number
  questionTitle: string
  answer: string
  score: number
  createdAt: string
}

const mockQuestions: InterviewQuestion[] = [
  {
    id: 1,
    title: '请你做一个 60 秒的自我介绍，并说明为什么想加入我们团队？',
    standardAnswer:
      '我有扎实的前端工程经验，熟悉 React、TypeScript 与工程化体系。过去两年主导了多个业务模块重构，页面性能和交付效率显著提升。希望加入贵团队，是因为你们对产品体验和技术质量都非常重视，我希望在高标准环境中持续成长并创造更大价值。'
  },
  {
    id: 2,
    title: '你是如何定位并解决线上页面性能问题的？请给出具体步骤。',
    standardAnswer:
      '我会先通过监控和埋点定位慢点，再结合 Performance 面板分析关键路径，重点关注 LCP、INP 与资源加载瀑布。随后按优先级处理问题，比如代码分包、图片优化、缓存策略和渲染优化，最后通过 A/B 或灰度验证数据改善并持续跟踪。'
  },
  {
    id: 3,
    title: '如果产品需求频繁变更，你如何保证开发质量和交付节奏？',
    standardAnswer:
      '我会先拆解需求并划分稳定核心和可变部分，采用模块化和可配置方案降低改动成本。流程上通过评审、测试用例和 CI 保证质量，同时保持与产品的高频同步，明确变更边界和优先级，确保团队在可控节奏下持续交付。'
  }
]

const scoreTips = [
  '回答结构较弱，建议按“背景-行动-结果”组织表达。',
  '回答具备基本完整性，可以补充更具体的数据与案例。',
  '回答较好，逻辑清晰，建议强化业务价值和复盘细节。',
  '回答很优秀，建议再加入跨团队协作与影响力描述。'
]

function buildMockResult(question: InterviewQuestion, answer: string): EvaluationResult {
  const trimmed = answer.trim()
  const lengthScore = Math.min(40, Math.floor(trimmed.length / 4))
  const keywordBonus = ['项目', '性能', '优化', '团队', '结果', '协作', '用户'].reduce((acc, word) => {
    return trimmed.includes(word) ? acc + 6 : acc
  }, 0)
  const score = Math.max(38, Math.min(98, lengthScore + keywordBonus + 28))

  let suggestion = scoreTips[0]
  if (score >= 85) suggestion = scoreTips[3]
  else if (score >= 70) suggestion = scoreTips[2]
  else if (score >= 55) suggestion = scoreTips[1]

  const analysis =
    trimmed.length < 20
      ? '你的回答偏简短，表达了核心观点，但细节支持不足。建议补充关键行动与量化结果，让可信度更高。'
      : '你的回答有较完整的逻辑，能够体现思考路径。若进一步补充场景细节、决策依据和结果指标，整体说服力会更强。'

  return {
    standardAnswer: question.standardAnswer,
    analysis,
    score,
    suggestion
  }
}

function InterviewMock() {
  const [hasStarted, setHasStarted] = useState(false)
  const [topicInput, setTopicInput] = useState('')
  const [preferredTopic, setPreferredTopic] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right')
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [revealStage, setRevealStage] = useState(0)
  const [submissionHistory, setSubmissionHistory] = useState<SubmissionRecord[]>([])

  const currentQuestion = mockQuestions[currentIndex]
  const prevQuestion = mockQuestions[(currentIndex - 1 + mockQuestions.length) % mockQuestions.length]
  const nextQuestion = mockQuestions[(currentIndex + 1) % mockQuestions.length]
  const currentAnswer = answers[currentQuestion.id] ?? ''

  useEffect(() => {
    setLoading(false)
    setResult(null)
    setRevealStage(0)
  }, [currentIndex])

  useEffect(() => {
    if (!result) return

    const timers = [
      window.setTimeout(() => setRevealStage(1), 180),
      window.setTimeout(() => setRevealStage(2), 560),
      window.setTimeout(() => setRevealStage(3), 940),
      window.setTimeout(() => setRevealStage(4), 1320)
    ]

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [result])

  const cardAnimationClass = useMemo(() => {
    return slideDirection === 'left' ? 'slide-from-left' : 'slide-from-right'
  }, [slideDirection, currentIndex])

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value
    }))
  }

  const handleSubmit = () => {
    if (!currentAnswer.trim()) return

    setLoading(true)
    setResult(null)
    setRevealStage(0)

    window.setTimeout(() => {
      const evaluated = buildMockResult(currentQuestion, currentAnswer)
      setLoading(false)
      setResult(evaluated)
      setSubmissionHistory((prev) => [
        {
          id: Date.now(),
          questionId: currentQuestion.id,
          questionTitle: currentQuestion.title,
          answer: currentAnswer.trim(),
          score: evaluated.score,
          createdAt: new Date().toLocaleString('zh-CN', { hour12: false })
        },
        ...prev
      ])
    }, 1200)
  }

  const goPrev = () => {
    setSlideDirection('left')
    setCurrentIndex((prev) => (prev - 1 + mockQuestions.length) % mockQuestions.length)
  }

  const goNext = () => {
    setSlideDirection('right')
    setCurrentIndex((prev) => (prev + 1) % mockQuestions.length)
  }

  const handleStartSession = () => {
    if (!topicInput.trim()) return
    setPreferredTopic(topicInput.trim())
    setHasStarted(true)
  }

  return (
    <div className="interview-page">
      <div className="interview-background" />
      <main className="interview-main">
        <h1 className="interview-title">AI 面试模拟问答</h1>
        <p className="interview-subtitle">
          {hasStarted
            ? `当前提问方向：${preferredTopic}`
            : '请先设置你希望 AI 提问的方向，再开始模拟问答'}
        </p>

        {!hasStarted && (
          <section className="topic-dialog" role="dialog" aria-modal="true" aria-label="设置提问方向">
            <h2>你希望 AI 问你哪方面的问题呢？</h2>
            <p>例如：前端工程化、性能优化、项目复盘、算法与数据结构、行为面试</p>
            <textarea
              className="topic-input"
              value={topicInput}
              onChange={(event) => setTopicInput(event.target.value)}
              placeholder="请输入你希望 AI 重点提问的方向..."
            />
            <button className="topic-confirm-button" type="button" onClick={handleStartSession}>
              开始模拟问答
            </button>
          </section>
        )}

        {hasStarted && (
          <>
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion.title}
              previousQuestion={prevQuestion.title}
              nextQuestion={nextQuestion.title}
              animationClass={cardAnimationClass}
              onPrev={goPrev}
              onNext={goNext}
            />

            <AnswerPanel
              answer={currentAnswer}
              loading={loading}
              result={result}
              revealStage={revealStage}
              onAnswerChange={handleAnswerChange}
              onSubmit={handleSubmit}
            />

            {submissionHistory.length > 0 && (
              <section className="history-panel">
                <h2>回答记录</h2>
                <div className="history-list">
                  {submissionHistory.map((item) => (
                    <article className="history-item" key={item.id}>
                      <p className="history-meta">
                        第 {item.questionId} 题 · {item.createdAt}
                      </p>
                      <h3>{item.questionTitle}</h3>
                      <p className="history-answer">{item.answer}</p>
                      <p className="history-score">得分：{item.score}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default InterviewMock
