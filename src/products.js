// products.js: the 12 hardcoded products for Le Levain.
//
// VERBAL COMMUNICATION, "Inform": every description is a neutral, factual
// DECLARATIVE sentence or two (contents, weight, origin) with no hype words.
// Facet values (category / price band / skill) mirror the home baker's
// semantic network; see the comment at the top of Shop.jsx.

export const PRODUCTS = [
  {
    id: 'flour-bread',
    name: 'Classic Bread Flour',
    category: 'Flour',
    skill: 'Beginner',
    price: 9.5,
    art: 'flour',
    description: 'Unbleached hard red wheat flour, 12.5% protein. Milled in Ontario. 2 kg bag.',
  },
  {
    id: 'flour-wholewheat',
    name: 'Stone-Milled Whole Wheat Flour',
    category: 'Flour',
    skill: 'Beginner',
    price: 11,
    art: 'flour',
    description: 'Whole grain flour, stone-milled with the bran and germ intact. 2 kg bag.',
  },
  {
    id: 'flour-rye',
    name: 'Dark Rye Flour',
    category: 'Flour',
    skill: 'Intermediate',
    price: 8.75,
    art: 'flour',
    description: 'Whole rye flour with a deep, malty flavour. Suited to dense loaves and starter feeding. 1 kg bag.',
  },
  {
    id: 'flour-redfife',
    name: 'Heritage Red Fife Flour',
    category: 'Flour',
    skill: 'Advanced',
    price: 14.5,
    art: 'flour',
    description: 'Sifted heritage wheat grown in Saskatchewan. Lower gluten strength; best blended. 1 kg bag.',
  },
  {
    id: 'starter-classic',
    name: 'Lucille, Our House Starter',
    category: 'Starters',
    skill: 'Beginner',
    price: 14,
    art: 'starter',
    description: 'Live sourdough culture, maintained daily in our kitchen since 2019. 100 g jar with feeding instructions.',
  },
  {
    id: 'starter-glutenfree',
    name: 'Gluten-Free Brown Rice Starter',
    category: 'Starters',
    skill: 'Intermediate',
    price: 16.5,
    art: 'starter',
    description: 'Live culture built on brown rice flour in a certified gluten-free facility. 100 g jar.',
  },
  {
    id: 'starter-kit',
    name: 'First Loaf Starter Kit',
    category: 'Starters',
    skill: 'Beginner',
    price: 45,
    art: 'starter',
    description: 'One jar of our house starter, 2 kg of bread flour, a dough whisk and an illustrated first-loaf guide.',
  },
  {
    id: 'proof-banneton-round',
    name: 'Round Banneton, 9 inch',
    category: 'Proofing',
    skill: 'Beginner',
    price: 28,
    art: 'proofing',
    description: 'Rattan proofing basket for boules up to 900 g. Linen liner included.',
  },
  {
    id: 'proof-banneton-oval',
    name: 'Oval Banneton, 10 inch',
    category: 'Proofing',
    skill: 'Intermediate',
    price: 32,
    art: 'proofing',
    description: 'Rattan proofing basket for batards up to 1 kg. Linen liner included.',
  },
  {
    id: 'tool-scraper',
    name: 'Stainless Bench Scraper',
    category: 'Tools',
    skill: 'Beginner',
    price: 12.5,
    art: 'tools',
    description: 'One-piece stainless steel blade with a rolled grip. 15 cm edge, dishwasher safe.',
  },
  {
    id: 'tool-whisk',
    name: 'Danish Dough Whisk',
    category: 'Tools',
    skill: 'Beginner',
    price: 16,
    art: 'tools',
    description: 'Stiff steel-loop whisk on a beech handle. Mixes wet dough without overworking it.',
  },
  {
    id: 'tool-lame',
    name: 'Bread Lame with 10 Blades',
    category: 'Tools',
    skill: 'Intermediate',
    price: 22,
    art: 'tools',
    description: 'Scoring tool with a beech handle and 10 replacement razor blades. Blade guard included.',
  },
]

// Price facet bands: coarse rounds a shopper actually thinks in.
// Must return exactly the option strings listed in Shop.jsx FACETS.
export function priceBand(price) {
  if (price < 15) return 'Under $15'
  if (price <= 30) return '$15 to $30'
  return 'Over $30'
}
