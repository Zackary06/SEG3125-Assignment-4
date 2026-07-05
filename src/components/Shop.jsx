import { useState } from 'react'
import { PRODUCTS, priceBand } from '../products'
import { copy } from '../copy'
import ProductArt from './ProductArt'

// EXPLORE IN THE DIVERGENT/CONVERGENT MODEL (Module 5, faceted search).
// The three facets come from the home baker's SEMANTIC NETWORK:
//   "a banneton IS-A proofing tool"            -> Category
//   "price is an ATTRIBUTE I compare on"       -> Price
//   "is this loaf within my ability?"          -> Skill level
// No filters = divergence (all 12 products); stacking filters = convergence.
const FACETS = [
  { key: 'category', label: 'Category', options: ['Flour', 'Starters', 'Proofing', 'Tools'] },
  { key: 'price', label: 'Price', options: ['Under $15', '$15 to $30', 'Over $30'] },
  { key: 'skill', label: 'Skill level', options: ['Beginner', 'Intermediate', 'Advanced'] },
]

const facetValue = (product, key) => (key === 'price' ? priceBand(product.price) : product[key])

export default function Shop({ addToCart }) {
  const [selected, setSelected] = useState({ category: [], price: [], skill: [] })

  function toggle(key, option) {
    setSelected((prev) => ({
      ...prev,
      [key]: prev[key].includes(option)
        ? prev[key].filter((o) => o !== option)
        : [...prev[key], option],
    }))
  }

  const clearAll = () => setSelected({ category: [], price: [], skill: [] })

  // Filters combine live: OR inside a facet, AND across facets.
  const results = PRODUCTS.filter((p) =>
    FACETS.every(({ key }) => selected[key].length === 0 || selected[key].includes(facetValue(p, key)))
  )

  const activeFilters = FACETS.flatMap(({ key, label }) =>
    selected[key].map((option) => ({ key, label, option }))
  )

  return (
    <>
      {/* VISUAL, SCALE & HIERARCHY: the hero title is by far the largest text on
          the page (display serif), so the eye lands brand -> promo -> products. */}
      <section className="hero">
        <h1>{copy.heroTitle}</h1>
        <p>{copy.heroSub}</p>
      </section>

      {/* VISUAL, LAYOUT & NEGATIVE SPACE: a wide gutter separates the facet rail
          from the grid; nothing touches the container edges. */}
      <div className="shop">
        <aside className="facets" aria-label="Filter products">
          {/* GESTALT, PROXIMITY: each facet's checkboxes cluster under their
              heading with whitespace between groups, so the three facets read
              as three units without needing boxes or rules. */}
          {FACETS.map(({ key, label, options }) => (
            <fieldset key={key} className="facet-group">
              <legend>{label}</legend>
              {options.map((option) => (
                <label key={option} className="facet-option">
                  <input
                    type="checkbox"
                    checked={selected[key].includes(option)}
                    onChange={() => toggle(key, option)}
                  />
                  {option}
                </label>
              ))}
            </fieldset>
          ))}
        </aside>

        <section>
          <div className="results-bar">
            {/* VISIBILITY OF SYSTEM STATUS: live result count updates on every toggle. */}
            <p className="result-count" role="status">
              Showing {results.length} of {PRODUCTS.length} products
            </p>
            {activeFilters.length > 0 && (
              <div className="active-filters">
                {/* RECOGNITION RATHER THAN RECALL + USER CONTROL AND FREEDOM:
                    every active filter stays visible and is individually removable. */}
                {activeFilters.map((f) => (
                  <button
                    key={f.key + f.option}
                    className="chip"
                    onClick={() => toggle(f.key, f.option)}
                  >
                    {f.label}: {f.option} <span aria-hidden="true">✕</span>
                  </button>
                ))}
                <button className="clear-all" onClick={clearAll}>
                  Clear all
                </button>
              </div>
            )}
          </div>

          {results.length === 0 ? (
            <p className="empty-msg">
              No products match those filters. Try removing one, or clear them all.
            </p>
          ) : (
            <ul className="grid">
              {/* GESTALT, SIMILARITY: identical card anatomy (art, name,
                  description, price + badge, button) groups all products
                  into one perceived set. */}
              {results.map((p) => (
                <li key={p.id} className="card">
                  <ProductArt kind={p.art} />
                  <h3>{p.name}</h3>
                  <p className="desc">{p.description}</p>
                  <div className="card-foot">
                    <span className="price">${p.price.toFixed(2)}</span>
                    <span className="badge">{p.skill}</span>
                  </div>
                  <button className="btn" onClick={() => addToCart(p.id)}>
                    Add to cart
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* VERBAL COMM, conversation effect: first-person "I" founder's note. */}
          <aside className="founder-note">
            <h3>A note from our founder</h3>
            <p>{copy.founderNote}</p>
            <p className="founder-sign">{copy.founderSignature}</p>
          </aside>
        </section>
      </div>
    </>
  )
}
