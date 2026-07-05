// Hand-made placeholder SVGs, nothing that needs an image license.
// GESTALT, SIMILARITY: every card gets the same wheat-tinted frame and the
// same 3 theme colours, so the grid reads as one family of products.
export default function ProductArt({ kind }) {
  return (
    <svg className="art" viewBox="0 0 120 84" aria-hidden="true">
      <rect width="120" height="84" rx="8" fill="var(--wheat)" />

      {kind === 'flour' && (
        <g>
          {/* paper flour sack */}
          <path d="M42 32 l5 -10 h26 l5 10 z" fill="var(--crust)" opacity="0.75" />
          <path d="M42 32 h36 v32 a4 4 0 0 1 -4 4 h-28 a4 4 0 0 1 -4 -4 z" fill="var(--crust)" />
          <rect x="50" y="42" width="20" height="13" rx="2" fill="var(--cream)" />
          <line x1="53" y1="47" x2="67" y2="47" stroke="var(--ember)" strokeWidth="2" />
          <line x1="53" y1="51" x2="63" y2="51" stroke="var(--crust)" strokeWidth="2" opacity="0.5" />
        </g>
      )}

      {kind === 'starter' && (
        <g>
          {/* jar of live starter, bubbling */}
          <rect x="45" y="22" width="30" height="8" rx="2" fill="var(--crust)" />
          <rect x="42" y="30" width="36" height="38" rx="6" fill="var(--cream)" stroke="var(--crust)" strokeWidth="2.5" />
          <path d="M44.5 50 h31 v11 a5 5 0 0 1 -5 5 h-21 a5 5 0 0 1 -5 -5 z" fill="var(--ember)" opacity="0.8" />
          <circle cx="53" cy="45" r="2.5" fill="var(--ember)" />
          <circle cx="62" cy="41" r="2" fill="var(--ember)" opacity="0.7" />
          <circle cx="69" cy="46" r="1.6" fill="var(--ember)" />
        </g>
      )}

      {kind === 'proofing' && (
        <g>
          {/* dough resting in a ringed banneton */}
          <ellipse cx="60" cy="38" rx="24" ry="8" fill="var(--cream)" stroke="var(--crust)" strokeWidth="2" />
          <path d="M34 40 h52 l-7 22 a6 6 0 0 1 -6 4 h-26 a6 6 0 0 1 -6 -4 z" fill="var(--crust)" />
          <path d="M39 47 h42 M42 53 h36 M45 59 h30" stroke="var(--cream)" strokeWidth="2.5" fill="none" opacity="0.8" />
        </g>
      )}

      {kind === 'tools' && (
        <g>
          {/* bench scraper: rolled handle + steel blade */}
          <rect x="42" y="26" width="36" height="12" rx="6" fill="var(--crust)" />
          <rect x="38" y="38" width="44" height="26" rx="3" fill="var(--cream)" stroke="var(--crust)" strokeWidth="2.5" />
          <line x1="38" y1="60" x2="82" y2="60" stroke="var(--ember)" strokeWidth="3" />
        </g>
      )}
    </svg>
  )
}
