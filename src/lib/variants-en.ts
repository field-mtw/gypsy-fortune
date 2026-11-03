// English variant pools — warm, grounded modern tarot reader voice matching variants-th.ts.

import type { LangVariants } from './variants-th';

export const en: LangVariants = {
  hookFocusBoth: [
    'Hello {name} — focusing on {focus}, take a calm breath and let us read the story in the cards together.',
    '{name}, the cards have tuned into {focus} for you. Let us walk through what they reflect, card by card.',
    'Welcome, {name}. With your focus on {focus}, the spread has laid out a clear perspective and path forward.',
  ],
  hookFocusOnly: [
    'Focusing on {focus}, let us turn through each card and see the perspective taking shape.',
    'The cards have tuned into {focus} for you today — let us follow the thread they lay out.',
  ],
  hookBoth: [
    'Hello {name} — for your question about "{question}", take a calm breath and let us read the story in the cards together.',
    '{name}, the cards have tuned into your question about "{question}". Let us walk through what they reflect, card by card.',
    'Welcome, {name}. Around "{question}", the spread has laid out a clear perspective and path forward for you.',
  ],
  hookNameOnly: [
    'Hello {name} — the cards have tuned into your energy today. Take a slow breath and let us read their story together.',
    'Welcome, {name}. Let us see what themes and guidance the cards want to highlight for you right now.',
    '{name}, your spread is ready. Read through each card at an easy, unhurried pace.',
  ],
  hookQuestionOnly: [
    'For your question about "{question}", let us turn through each card and see the perspective taking shape.',
    'The cards have received what is on your heart regarding "{question}". Let us follow the thread they lay out.',
  ],
  hookGeneric: [
    'Take a deep, easy breath. The cards are ready to share their perspective and gentle guidance with you.',
    'Your spread is ready. Hold what matters to you lightly in mind and read through each card at your own pace.',
    'Let us read what the cards reflect with a calm, open mind — take what resonates and make it your own.',
  ],
  positionLeadIn: {
    single: [
      '{card}{revTag} steps forward as the heart of your answer today.',
      'Looking at the core of this matter, {card}{revTag} brings a clear central message.',
      '{card}{revTag} appears directly in response to what is on your mind.',
    ],
    past: [
      'Looking back at what led you here, {card}{revTag} reflects the foundation behind this situation.',
      'In the past position, {card}{revTag} shows the earlier rhythm that shaped where things stand today.',
      'Tracing the roots of this story, {card}{revTag} highlights how this chapter began.',
    ],
    present: [
      'Turning to the present moment, {card}{revTag} captures the energy unfolding right in front of you.',
      'Where you stand right now, {card}{revTag} mirrors the honest atmosphere of the situation.',
      'In the present position, {card}{revTag} speaks to the main current running through this matter.',
    ],
    you: [
      'Starting with your own heart and stance, {card}{revTag} reflects what you have been carrying inside.',
      'From your side of the connection, {card}{revTag} mirrors your true feelings and inner posture.',
    ],
    other: [
      'Looking over to their side, reading from outward attitude and behavior, {card}{revTag} reflects their current rhythm.',
      'As for the energy they are showing right now, {card}{revTag} highlights what is observable on their end.',
    ],
    challenge: [
      'As the key challenge here, {card}{revTag} points to the lesson or friction testing your footing.',
      'In the challenge position, {card}{revTag} reveals the main hurdle worth meeting with clear eyes.',
    ],
    root: [
      'Beneath the surface, {card}{revTag} reflects the quieter emotional root driving your reactions.',
      'Deep in the background of your heart, {card}{revTag} points to an unspoken feeling shaping this story.',
    ],
    crown: [
      'Looking at your conscious aim, {card}{revTag} mirrors the outcome your heart is hoping to build.',
      'In the goal position, {card}{revTag} illuminates the direction you are setting your sights on.',
    ],
    external: [
      'Looking at the people and environment around you, {card}{revTag} shows the outside influences touching this matter.',
      'In your surrounding atmosphere, {card}{revTag} reflects how external factors and other people play into the picture.',
    ],
    hopes: [
      'Where quiet hopes and deeper worries meet, {card}{revTag} captures the delicate feelings circling in your mind.',
      'In the hopes-and-fears position, {card}{revTag} reflects what you wish for alongside what still makes you hesitate.',
    ],
    advice: [
      'For the wisest way forward, {card}{revTag} offers grounded guidance on how to approach what comes next.',
      'Stepping into the advice position, {card}{revTag} points toward the most constructive move you can make now.',
    ],
    future: [
      'Looking ahead at where the current is flowing, {card}{revTag} sketches the direction taking shape.',
      'Closing with the path ahead, {card}{revTag} signals how things are likely to unfold from here.',
      'If the present energy continues along its natural arc, {card}{revTag} shows the horizon opening ahead.',
    ],
  },
  reversedNote: {
    releasing: [
      'Appearing reversed in a releasing tone, this card signals that past tension is gradually loosening and making room for lighter air.',
      'Here, the reversal is a welcome sign: the heaviest part is beginning to lift and clear a gentler path forward.',
    ],
    blocked: [
      'Because this card appears reversed, the timing may feel slightly delayed — no need to force it; clear one small step at a time and momentum will return.',
      'Reversed, this energy has not disappeared; it simply needs a little more room and patience before clicking into place.',
    ],
    internalized: [
      'This reversal invites you to tend to your inner landscape first — once your heart feels settled, outward clarity naturally follows.',
      'Appearing reversed, this theme is unfolding quietly within your own thoughts and feelings right now; give yourself unhurried space to process.',
    ],
    extreme: [
      'Reversed, this card gently checks your balance — notice whether you have been pushing too hard or holding back too much, and ease back toward center.',
      'This reversal is a reminder around pacing and proportion; recalibrating to a sustainable middle ground will smooth everything out.',
    ],
    shadow: [
      'Reversed, this card nudges you to look closely at small details or blind spots — spotting them early puts you comfortably in control.',
      'This reversal invites calm, clear-eyed observation of the facts before committing; awareness is your quiet advantage here.',
    ],
  },
  negativeUprightNote: [
    'Read this card with a calm heart — in tarot, intense imagery arrives as an early heads-up while you still have plenty of room to steer and soften the outcome.',
    'Though this card carries strong energy, think of it as a timely weather report rather than a verdict; knowing ahead of time lets you prepare wisely.',
  ],
  negativeReversedNote: [
    'Seeing this card reversed is actually a comforting sign of relief — the sharpest part of the storm is subsiding and recovery is underway.',
    'Reversed here, this heavy card softens considerably, showing that pressure is releasing and you are finding steadier ground again.',
  ],
  otherPersonNote: [
    'A gentle note: this position reflects their outward behavior and the signals reaching you right now — an open, honest conversation will always confirm what is truly in their heart.',
    'Keep in mind that tarot reads observable energy rather than private thoughts; when the moment feels right, talking directly will bring the clearest understanding.',
  ],
  advicePositionNote: [
    'A practical step inspired by this card: {tip}',
    'The clearest way to put this position into action: {tip}',
  ],
  singleCardAdviceNote: [
    'Takeaway step from this card: {tip}',
    'One practical way to work with this energy today: {tip}',
  ],
  majorPresenceNote: [
    'With several Major Arcana cards appearing together, this reading touches a meaningful chapter of personal growth rather than a passing daily mood — move steadily and give yourself grace.',
    'Notice the strong presence of Major Arcana here: life is nudging a deeper turning point into place, so trust thoughtful steps over rushing.',
  ],
  timingFrame: [
    'Looking at the closing card’s rhythm, clearer movement tends to unfold {timeframe} — no need to count days; steady action on your part always helps good timing meet you halfway.',
    'In terms of pacing, expect signs of progress {timeframe}. Treat this window as gentle preparation rather than a rigid deadline.',
  ],
  luckyColor: [
    'A personal note for someone born on {day}: your supportive color is {color} — wear or carry a touch of it whenever you want extra calm confidence.',
    'Just for you ({day} born): {color} harmonizes nicely with your natural rhythm on days with important conversations or decisions.',
  ],
  closing: [
    'The cards have shared their reflection — let this reading be a warm thinking companion while your own hands and heart choose the next step.',
    'Take whichever insights bring clarity and peace, and leave any pressure behind. Tarot mirrors the current energy, while the steering wheel stays firmly with you.',
    'That completes your reading for now. Move forward gently, stay kind to yourself, and trust that you have what it takes to navigate what is ahead.',
  ],
};
