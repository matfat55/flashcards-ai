import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Flashcard } from '../types';

interface FlashcardViewProps {
  cards: Flashcard[];
  topic: string;
}

export function FlashcardView({ cards, topic }: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (!cards.length) return null;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        {topic}
      </h2>
      
      <div className="relative h-[400px] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + (isFlipped ? '-flipped' : '')}
            initial={{ rotateY: isFlipped ? -180 : 0 }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className={`absolute inset-0 w-full h-full bg-white rounded-xl shadow-lg p-8 flex items-center justify-center backface-hidden
              ${isFlipped ? 'invisible' : 'visible'}`}>
              <p className="text-xl text-center font-medium text-gray-700">
                {cards[currentIndex].question}
              </p>
            </div>
            <div className={`absolute inset-0 w-full h-full bg-indigo-50 rounded-xl shadow-lg p-8 flex items-center justify-center backface-hidden
              ${!isFlipped ? 'invisible' : 'visible'}`}
              style={{ transform: 'rotateY(180deg)' }}>
              <p className="text-xl text-center font-medium text-gray-700">
                {cards[currentIndex].answer}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>
        <span className="text-gray-600">
          {currentIndex + 1} / {cards.length}
        </span>
        <button
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          className="flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
}