// English variant pools — same structure as variants-th.ts.

import type { ReversedMode } from '@/data/card-types';
import type { LangVariants } from './variants-th';

export const en: LangVariants = {
  hook: [
    'Hello {name} — the cards have heard your question. Let us see what story they tell.',
    '{name}, hold "{question}" in your mind as we turn each card together.',
    'The cards are listening, {name}. Your question — "{question}" — is already in the air.',
  ],
  hookGeneric: [
    'The cards are ready. Take a deep breath and let them speak.',
    'Your energy comes through clearly. The deck is ready to answer what is on your mind.',
    'Before reading, hold your question quietly in mind for a moment, then read card by card.',
  ],
  summary: [
    '{card} in the {position} position — {keyword} is the heart of this reading.',
    'This reading turns on {card}: {keyword} in matters of {position}.',
    '{card} appearing as {position} suggests {keyword} is the central theme.',
  ],
  positionIntro: [
    'In the {position} position, {card} appears.',
    'Moving to {position} — {card} is waiting here with its story.',
    'The {position} position holds {card}.',
  ],
  uprightDetail: [
    '{meaning}. In the context of {position}, the cards invite you to receive this energy fully.',
    '{meaning} — that is the core message of this card for your {position}. See if it matches what you have been feeling.',
    'The message is {meaning}, and in the {position} position it carries special weight for you right now.',
    '{meaning}. Cards tend to appear exactly when we are ready to hear them.',
  ],
  reversed: {
    blocked: [
      '{card} is reversed — its energy is real, but right now: {meaning}. Like an engine that starts but cannot move yet. What blocks it may be timing, not luck.',
      'Reversed, {card} says: {meaning}. The energy has not vanished; it is only held back for now. Give it room to loosen on its own.',
    ],
    internalized: [
      '{card} reversed — this is happening "inside" more than outside. {meaning}. Ask yourself quietly where this feeling began.',
      'A reversed card turns the gaze inward: {meaning}. What you see outside may be only the shadow of what the heart is processing.',
    ],
    extreme: [
      '{card} reversed warns of balance: {meaning}. Ask which pole you are on — too little or too much — then gently pull back to center.',
    ],
    shadow: [
      '{card} reversed reveals the shadow side: {meaning}. Do not flinch — every card has one, and seeing it clearly is the first step.',
    ],
    releasing: [
      'Good news inside this reversal — {meaning}. The heaviest part is loosening; what pressed down is lifting, little by little.',
      '{card} reversed here reads as {meaning} — like a storm passing. The clouds remain, but the wind has changed direction.',
    ],
  },
  dignityBoost: [
    'Neighboring cards of a friendly element ({element}) let this card speak at full volume.',
    'Boosted by the {element} energy beside it, this card\u2019s message comes through especially clear.',
  ],
  dignityWeaken: [
    'A clashing element ({element}) nearby softens this card — its message stands, but listen gently.',
    'The {element} energy beside it dims this card somewhat, like a voice half-covered. Read it softly.',
  ],
  connector: [
    'And following the thread,',
    'The story does not end there.',
    'What is interesting is,',
    'Placed beside the last card, the picture sharpens.',
  ],
  overviewMajorMany: [
    'First, the big picture — {n} Major cards in this spread. This is not a small daily matter but a life chapter in transition. Energy like this cannot be rushed; walk with it.',
    'The overview: {n} Majors. This topic carries the weight of a life chapter. Give it the attention it deserves.',
  ],
  overviewMajorFew: [
    'The big picture — mostly Minor cards, meaning everyday matters you can shape with your own hands. The steering wheel is still yours.',
    'Overall this spread speaks of manageable, daily-scale matters — not an uncontrollable storm.',
  ],
  overviewMissing: [
    'Notice that no {element} cards appear at all — sometimes what the cards do not say speaks loudest. Ask whether this side of life is being overlooked.',
  ],
  advice: [
    'One thing you can do right away: {tip}',
    'Guidance from the cards — {tip}. No need to go big; start with the smallest step.',
    'If you take one thing from this reading, let it be this: {tip}',
  ],
  timing: [
    'On timing — the cards point to a {timeframe} scale of movement. Do not count days; simply be ready within that window.',
    'No exact date, but a rhythm: expect movement within {timeframe}. The more you act yourself, the shorter it becomes.',
  ],
  closing: [
    'The cards have done their part — the rest is yours. Walk with a steady heart and the next step will reveal itself.',
    'Remember: the cards are a mirror, not a command. What they reflect is for reflection, not fear.',
    'Let this reading be a thinking companion, not a cage. The power to choose was always yours.',
  ],
  negative: [
    '{detail} — read this part with a steady heart. This card arrives as an early warning, not a verdict. What it points to is still within your power to address.',
    '{detail} It sounds heavy, but the card comes to warn while there is still time — that is your advantage.',
  ],
  pastValidation: [
    'Let us start with the past — this part speaks of what already happened. Check whether it matches your experience; if it does, the cards are tuned to your frequency.',
    'The past position is the accuracy test — if it rings true, you can trust that the rest comes from the same signal.',
  ],
  otherPersonSoften: [
    'One caution — this card reads their observable behavior, not their mind. Only they know what is truly in their heart.',
    'A small note: the cards reflect them through your eyes. A direct conversation still reveals more than any card.',
  ],
  luckyColor: [
    'Something personal: born on {day}, your lucky color is {color} — keep it near on days you need courage.',
  ],
};
