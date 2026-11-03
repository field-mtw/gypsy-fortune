// Card database index — 78 cards total across all 8 life domains.

import type { CardData, ExtraReadingTopic, RawCardData, TopicMeaningTh } from './card-types';
import { majorCards } from './cards-major';
import { wandsCards } from './cards-wands';
import { cupsCards } from './cards-cups';
import { swordsCards } from './cards-swords';
import { pentaclesCards } from './cards-pentacles';
import { majorExtraTopics } from './cards-major-extra';
import { wandsExtraTopics } from './cards-wands-extra';
import { cupsExtraTopics } from './cards-cups-extra';
import { swordsExtraTopics } from './cards-swords-extra';
import { pentaclesExtraTopics } from './cards-pentacles-extra';

export type { CardData };
export * from './card-types';

const EXTRA_BY_ID: Record<string, Record<ExtraReadingTopic, TopicMeaningTh>> = {
  ...majorExtraTopics,
  ...wandsExtraTopics,
  ...cupsExtraTopics,
  ...swordsExtraTopics,
  ...pentaclesExtraTopics,
};

function mergeCardDomains(raw: RawCardData): CardData {
  const extra = EXTRA_BY_ID[raw.id];
  if (!extra) {
    throw new Error(`Missing extra domain interpretations for card: ${raw.id}`);
  }
  return {
    ...raw,
    topicsTh: {
      ...raw.topicsTh,
      ...extra,
    },
  };
}

export const ALL_CARDS: CardData[] = [
  ...majorCards,
  ...wandsCards,
  ...cupsCards,
  ...swordsCards,
  ...pentaclesCards,
].map(mergeCardDomains);

const BY_ID = new Map<string, CardData>(ALL_CARDS.map((c) => [c.id, c]));

export function getCardById(id: string): CardData | undefined {
  return BY_ID.get(id);
}

export const CARD_BACK_IMAGE = '/cards/back.webp';
