import { useState } from 'react'
import { copy } from './copy'
import Shop from './components/Shop'
import Checkout from './components/Checkout'
import Survey from './components/Survey'

// Single-page app: one useState switches between the three views, no router.
export default function App() {
  const [view, setView] = useState('shop') // 'shop' | 'checkout' | 'survey'
  const [cart, setCart] = useState([]) // [{ id, qty }]

  const cartCount = cart.reduce((n, line) => n + line.qty, 0)

  function addToCart(id) {
    setCart((prev) => {
      const line = prev.find((l) => l.id === id)
      return line
        ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
        : [...prev, { id, qty: 1 }]
    })
  }

  return (
    <div className="site">
      {/* CONSISTENCY AND STANDARDS: brand top-left goes home, cart top-right
          with a live count, the layout every shopper already knows.
          The count is also VISIBILITY OF SYSTEM STATUS for "add to cart". */}
      <header className="site-header">
        <button className="brand" onClick={() => setView('shop')}>
          <span className="brand-name">Le Levain</span>
          <span className="brand-tag">artisan sourdough &amp; baking supplies</span>
        </button>
        <nav>
          <button
            className={view === 'shop' ? 'nav-link active' : 'nav-link'}
            onClick={() => setView('shop')}
          >
            Shop
          </button>
          <button className="nav-link cart-link" onClick={() => setView('checkout')}>
            Cart ({cartCount})
          </button>
        </nav>
      </header>

      {/* VERBAL COMM, "Incite to action" banner. VISUAL: the single highest-contrast
          block on the page (ember on cream site), so attention lands here first. */}
      {view === 'shop' && <p className="promo-banner">{copy.promoBanner}</p>}

      <main>
        {view === 'shop' && <Shop addToCart={addToCart} />}
        {view === 'checkout' && (
          <Checkout
            cart={cart}
            setCart={setCart}
            goShop={() => setView('shop')}
            goSurvey={() => setView('survey')}
          />
        )}
        {view === 'survey' && <Survey goShop={() => setView('shop')} />}
      </main>

      <footer className="site-footer">
        {/* VERBAL COMM, "Engage in a connection": the survey invitation lives here
            (and on the confirmation page) as a link, never a blocking popup. */}
        <div className="foot-block">
          <h4>{copy.surveyInvite}</h4>
          <button className="btn secondary" onClick={() => setView('survey')}>
            Take the 1-minute survey
          </button>
        </div>
        {/* HELP AND DOCUMENTATION: short plain-language help, always reachable. */}
        <div className="foot-block">
          <h4>Good to know</h4>
          <p>{copy.informShipping}</p>
          <p>{copy.helpContact}</p>
        </div>
        <p className="foot-copy">Le Levain · Ottawa, ON · SEG3125 class prototype</p>
      </footer>
    </div>
  )
}
