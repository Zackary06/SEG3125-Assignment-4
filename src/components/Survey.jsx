import { useState } from 'react'
import { copy } from '../copy'

// COMMUNICATE process (Module 5): 3 questions, one rating, one multiple
// choice, one open comment. Reached only through footer/confirmation links.
const RATINGS = [1, 2, 3, 4, 5]
const BAKE_CHOICES = [
  'Sourdough loaves',
  'Baguettes & buns',
  'Sweet bakes',
  'I’m just getting started',
]

export default function Survey({ goShop }) {
  const [rating, setRating] = useState(null)
  const [choice, setChoice] = useState(null)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  function submit(e) {
    e.preventDefault()
    if (rating === null || choice === null) {
      // HELP USERS RECOGNIZE, DIAGNOSE, AND RECOVER FROM ERRORS: plain words,
      // says exactly what is missing.
      setError('Please pick a rating and tell us what you bake before sending.')
      return
    }
    setDone(true)
  }

  if (done) {
    return (
      <section className="panel narrow center">
        {/* Warm thank-you state: "Engage in a connection". */}
        <h2>Merci!</h2>
        <p>{copy.surveyThanks}</p>
        <button className="btn" onClick={goShop}>
          Back to the shop
        </button>
      </section>
    )
  }

  return (
    <section className="panel narrow">
      <h2>{copy.surveyInvite}</h2>

      <form onSubmit={submit} noValidate>
        <fieldset className="survey-q">
          <legend>1. How was your shopping trip today?</legend>
          <div className="rating-row">
            <span className="rating-hint">Fell flat</span>
            {RATINGS.map((n) => (
              <label key={n} className={rating === n ? 'rating on' : 'rating'}>
                <input
                  type="radio"
                  name="rating"
                  checked={rating === n}
                  onChange={() => setRating(n)}
                />
                {n}
              </label>
            ))}
            <span className="rating-hint">Rose beautifully</span>
          </div>
        </fieldset>

        <fieldset className="survey-q">
          <legend>2. What do you bake most often?</legend>
          {BAKE_CHOICES.map((c) => (
            <label key={c} className="facet-option">
              <input
                type="radio"
                name="bake"
                checked={choice === c}
                onChange={() => setChoice(c)}
              />
              {c}
            </label>
          ))}
        </fieldset>

        <fieldset className="survey-q">
          <legend>3. Anything we could do better? (optional)</legend>
          <textarea
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us anything. We read every note."
          />
        </fieldset>

        {error && <p className="error">{error}</p>}

        <div className="btn-row">
          <button type="button" className="btn secondary" onClick={goShop}>
            Back to the shop
          </button>
          <button type="submit" className="btn">
            Send feedback
          </button>
        </div>
      </form>
    </section>
  )
}
