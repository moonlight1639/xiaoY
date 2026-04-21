type EvaluationResult = {
  standardAnswer: string
  analysis: string
  score: number
  suggestion: string
}

type AnswerPanelProps = {
  answer: string
  loading: boolean
  result: EvaluationResult | null
  revealStage: number
  onAnswerChange: (value: string) => void
  onSubmit: () => void
}

function AnswerPanel({ answer, loading, result, revealStage, onAnswerChange, onSubmit }: AnswerPanelProps) {
  return (
    <section className="answer-panel">
      <textarea
        className="answer-input"
        value={answer}
        placeholder="请输入你的回答..."
        onChange={(event) => onAnswerChange(event.target.value)}
      />

      <button className="submit-button" onClick={onSubmit} disabled={loading || !answer.trim()} type="button">
        {loading ? 'AI 评估中...' : '提交回答'}
      </button>

      {result && (
        <div className="result-panel">
          <div className={`result-item ${revealStage >= 1 ? 'visible' : ''}`}>
            <h3>标准答案</h3>
            <p>{result.standardAnswer}</p>
          </div>

          <div className={`result-item ${revealStage >= 2 ? 'visible' : ''}`}>
            <h3>用户答案分析</h3>
            <p>{result.analysis}</p>
          </div>

          <div className={`result-item score-item ${revealStage >= 3 ? 'visible' : ''}`}>
            <h3>分数</h3>
            <div className="score-art-wrap">
              <p className="score-art-number">{result.score}</p>
              <span className="score-art-unit">分</span>
            </div>
          </div>

          <div className={`result-item ${revealStage >= 4 ? 'visible' : ''}`}>
            <h3>改进建议</h3>
            <p>{result.suggestion}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default AnswerPanel
