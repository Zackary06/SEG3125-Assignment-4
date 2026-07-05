// copy.js: every graded copy string in one place (SEG3125 Module 6, Verbal Communication).
//
// WRITER/READER MODEL: an expert-to-novice conversation. The shop speaks as a
// friendly baker "we" to a home-baker "you", consistently site-wide.
// Two local CONVERSATION EFFECTS deliberately break that pattern:
//   1. founderNote switches person to a first-person "I" (a real voice steps forward)
//   2. surveyInvite addresses "you" directly with an interrogative + exclamatory pair
// Each string below is tagged with its intention/purpose from the lectures:
// Affirm a personality / Inform / Incite to action / Engage in a connection / Reassure.

export const copy = {
  // AFFIRM A PERSONALITY: declarative with a baker's pun; sets the friendly-expert tone.
  heroTitle: 'Everything you knead for honest sourdough.',
  heroSub:
    'We stock the flours, starters and tools we bake with in our own kitchen. Nothing more, nothing less.',

  // INCITE TO ACTION: exclamatory sentence in the promo banner (the one loud place on the site).
  promoBanner: 'Get 15% off your first starter kit and bake your first real loaf this weekend!',

  // INFORM: neutral, factual declarative sentences (shipping specs). Product descriptions
  // in products.js follow the same "inform" register.
  informShipping:
    'Orders ship from Ottawa in 1-2 business days. Flour and live starters travel in sealed, food-safe packaging.',

  // ENGAGE IN A CONNECTION: positive interrogative + exclamatory survey invitation.
  // Placed non-intrusively: a footer link + the confirmation page, never a popup.
  surveyInvite: 'How did we do? Tell us in one minute!',

  // CONVERSATION EFFECT: local switch to first-person "I", the founder speaks directly.
  founderNote:
    'I started Le Levain with one jar of starter and too much enthusiasm. Everything in this shop is something I actually bake with. If it is here, it earned its place.',
  founderSignature: 'Claire, founder',

  // REASSURE: calm declarative on the (fake) payment step.
  paymentReassure:
    'This is a class prototype. No real payment is taken and your details never leave your browser.',

  // ENGAGE IN A CONNECTION: warm confirmation, "we" voice.
  confirmThanks: 'Your order is in! We are already reaching for the flour.',

  // ENGAGE IN A CONNECTION: warm thank-you state after the survey.
  surveyThanks: 'Thank you! Your feedback goes straight into our recipe book. Happy baking!',

  // INFORM / help & documentation: plain-language help in the footer.
  helpContact:
    'Starter not rising? Email hello@lelevain.ca and a real baker will write back within a day.',
}
