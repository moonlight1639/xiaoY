type QuestionCardProps = {
  question: string
  previousQuestion: string
  nextQuestion: string
  animationClass: string
  onPrev: () => void
  onNext: () => void
}

function QuestionCard({
  question,
  previousQuestion,
  nextQuestion,
  animationClass,
  onPrev,
  onNext
}: QuestionCardProps) {
  return (
    <section className="question-stage">
      <button className="side-card side-card-left" onClick={onPrev} type="button" aria-label="上一题">
        <span className="side-label">上一题</span>
        <p>{previousQuestion}</p>
      </button>

      <article className={`question-card ${animationClass}`}>
        <div className="question-tag">AI 提问</div>
        <p className="question-text">{question}</p>
      </article>

      <button className="side-card side-card-right" onClick={onNext} type="button" aria-label="下一题">
        <span className="side-label">下一题</span>
        <p>{nextQuestion}</p>
      </button>
    </section>
  )
}

export default QuestionCard
