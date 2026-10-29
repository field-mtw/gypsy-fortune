// Card database index — 78 cards total.

import type { CardData } from './card-types';
import { majorCards } from './cards-major';
import { wandsCupsCards } from './cards-wands-cups';
import { swordsPentaclesCards } from './cards-swords-pentacles';

export type { CardData };
export * from './card-types';

export const ALL_CARDS: CardData[] = [...majorCards, ...wandsCupsCards, ...swordsPentaclesCards];

const BY_ID = new Map<string, CardData>(ALL_CARDS.map((c) => [c.id, c]));

export function getCardById(id: string): CardData | undefined {
  return BY_ID.get(id);
}

export const CARD_BACK_IMAGE = '/cards/back.webp';
