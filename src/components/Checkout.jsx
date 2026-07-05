import { useState } from 'react'
import { PRODUCTS } from '../products'
import { copy } from '../copy'

// FOLLOW INSTRUCTIONS process (Module 5): a linear step-by-step checkout.
const STEPS = ['Cart', 'Shipping', 'Payment', 'Confirmation']

// VISIBILITY OF SYSTEM STATUS: the step indicator always shows what is done
// (✓, filled), what is current (highlighted), and what remains (muted).
function StepIndicator({ current }) {
  return (
    <ol className="steps">
      {STEPS.map((name, i) => (
        <li
          key={name}
          className={i < current ? 'done' : i === current ? 'current' : 'todo'}
          aria-current={i === current ? 'step' : undefined}
        >
          <span className="step-dot">{i < current ? '✓' : i + 1}</span>
          <span className="step-name">{name}</span>
        </li>
      ))}
    </ol>
  )
}

function Field({ label, value, onChange, error, ...rest }) {
  return (
    <label className="field">
      <span className="field-label">{label} *</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? 'true' : undefined}
        {...rest}
      />
      {/* HELP USERS RECOGNIZE, DIAGNOSE, AND RECOVER FROM ERRORS:
          inline, plain-language messages right under the field. */}
      {error && <span className="error">{error}</span>}
    </label>
  )
}

export default function Checkout({ cart, setCart, goShop, goSurvey }) {
  const [step, setStep] = useState(0)
  const [shipping, setShipping] = useState({ fullName: '', email: '', address: '', city: '', postal: '' })
  const [payment, setPayment] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' })
  const [errors, setErrors] = useState({})
  const [orderNumber, setOrderNumber] = useState(null)

  const lines = cart.map((l) => ({ ...l, product: PRODUCTS.find((p) => p.id === l.id) }))
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0)

  const setShip = (key) => (val) => setShipping((s) => ({ ...s, [key]: val }))
  const setPay = (key) => (val) => setPayment((p) => ({ ...p, [key]: val }))

  function setQty(id, qty) {
    setCart((prev) => prev.map((l) => (l.id === id ? { ...l, qty } : l)))
  }
  function removeLine(id) {
    setCart((prev) => prev.filter((l) => l.id !== id))
  }

  // ERROR PREVENTION: each step is checked before you can move on.
  function validateShipping() {
    const errs = {}
    if (!shipping.fullName.trim()) errs.fullName = 'Please enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(shipping.email)) errs.email = 'Please enter a valid email, like you@example.com.'
    if (!shipping.address.trim()) errs.address = 'Please enter your street address.'
    if (!shipping.city.trim()) errs.city = 'Please enter your city.'
    if (!shipping.postal.trim()) errs.postal = 'Please enter your postal code.'
    return errs
  }

  function validatePayment() {
    const errs = {}
    if (!payment.cardName.trim()) errs.cardName = 'Please enter the name on the card.'
    if (!/^\d{12,19}$/.test(payment.cardNumber.replace(/\s/g, '')))
      errs.cardNumber = 'Card numbers are 12 to 19 digits, with no letters or dashes.'
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(payment.expiry.trim()))
      errs.expiry = 'Please use the MM/YY format, like 09/27.'
    if (!/^\d{3,4}$/.test(payment.cvv.trim()))
      errs.cvv = 'The CVV is the 3 or 4 digit code on the back of the card.'
    return errs
  }

  function next(validate) {
    const errs = validate ? validate() : {}
    setErrors(errs)
    if (Object.keys(errs).length === 0) setStep((s) => s + 1)
  }

  function placeOrder() {
    const errs = validatePayment()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setOrderNumber('LL-' + String(Math.floor(1000 + Math.random() * 9000)))
    setCart([]) // order placed, empty the cart
    setStep(3)
  }

  // USER CONTROL AND FREEDOM: every step before confirmation has a way back.
  const back = () => setStep((s) => s - 1)

  return (
    <section className="panel">
      <StepIndicator current={step} />

      {step === 0 && (
        <div className="narrow">
          <h2>Your cart</h2>
          {lines.length === 0 ? (
            <>
              <p className="empty-msg">Your cart is empty. Your oven deserves better.</p>
              <button className="btn" onClick={goShop}>
                Browse the shop
              </button>
            </>
          ) : (
            <>
              <ul className="cart-lines">
                {lines.map((l) => (
                  <li key={l.id} className="cart-line">
                    <span className="cart-name">{l.product.name}</span>
                    <span className="qty-controls">
                      {/* ERROR PREVENTION: quantity can't drop below 1;
                          removing a line is its own explicit action. */}
                      <button
                        aria-label={`One fewer ${l.product.name}`}
                        onClick={() => setQty(l.id, l.qty - 1)}
                        disabled={l.qty === 1}
                      >
                        −
                      </button>
                      <span className="qty">{l.qty}</span>
                      <button aria-label={`One more ${l.product.name}`} onClick={() => setQty(l.id, l.qty + 1)}>
                        +
                      </button>
                    </span>
                    <span className="cart-price">${(l.product.price * l.qty).toFixed(2)}</span>
                    <button className="link-btn" onClick={() => removeLine(l.id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <p className="subtotal">
                Subtotal <strong>${subtotal.toFixed(2)}</strong>
              </p>
              <div className="btn-row">
                <button className="btn secondary" onClick={goShop}>
                  Keep shopping
                </button>
                <button className="btn" onClick={() => next()}>
                  Continue to shipping
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {step === 1 && (
        <div className="narrow">
          <h2>Where should we send it?</h2>
          <Field label="Full name" value={shipping.fullName} onChange={setShip('fullName')} error={errors.fullName} autoComplete="name" />
          <Field label="Email" value={shipping.email} onChange={setShip('email')} error={errors.email} type="email" autoComplete="email" />
          <Field label="Street address" value={shipping.address} onChange={setShip('address')} error={errors.address} autoComplete="street-address" />
          <Field label="City" value={shipping.city} onChange={setShip('city')} error={errors.city} autoComplete="address-level2" />
          <Field label="Postal code" value={shipping.postal} onChange={setShip('postal')} error={errors.postal} autoComplete="postal-code" />
          <div className="btn-row">
            <button className="btn secondary" onClick={back}>
              Back to cart
            </button>
            <button className="btn" onClick={() => next(validateShipping)}>
              Continue to payment
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="narrow">
          <h2>Payment</h2>
          {/* VERBAL COMM, "Reassure": calm declarative before card fields. */}
          <p className="reassure">{copy.paymentReassure}</p>
          <Field label="Name on card" value={payment.cardName} onChange={setPay('cardName')} error={errors.cardName} autoComplete="cc-name" />
          <Field label="Card number" value={payment.cardNumber} onChange={setPay('cardNumber')} error={errors.cardNumber} inputMode="numeric" autoComplete="cc-number" />
          <div className="field-pair">
            <Field label="Expiry (MM/YY)" value={payment.expiry} onChange={setPay('expiry')} error={errors.expiry} placeholder="09/27" autoComplete="cc-exp" />
            <Field label="CVV" value={payment.cvv} onChange={setPay('cvv')} error={errors.cvv} inputMode="numeric" autoComplete="cc-csc" />
          </div>
          <p className="subtotal">
            Order total <strong>${subtotal.toFixed(2)}</strong>
          </p>
          <div className="btn-row">
            <button className="btn secondary" onClick={back}>
              Back to shipping
            </button>
            <button className="btn" onClick={placeOrder}>
              Place order
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="narrow center">
          <h2>{copy.confirmThanks}</h2>
          <p>
            Order <strong>{orderNumber}</strong> is confirmed. A receipt is on its way to{' '}
            <strong>{shipping.email}</strong>.
          </p>
          {/* Non-intrusive survey invitation: a link on the confirmation page. */}
          <p>{copy.surveyInvite}</p>
          <div className="btn-row center">
            <button className="btn secondary" onClick={goShop}>
              Back to the shop
            </button>
            <button className="btn" onClick={goSurvey}>
              Take the 1-minute survey
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
