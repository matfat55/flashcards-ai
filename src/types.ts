export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface FlashcardDeck {
  topic: string;
  cards: Flashcard[];
}