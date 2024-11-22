import React, { useState } from 'react';
import { Brain, Loader2 } from 'lucide-react';
import { FlashcardView } from './components/FlashcardView';
import { generateFlashcards } from './services/openai';
import type { FlashcardDeck } from './types';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<FlashcardDeck | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const cards = await generateFlashcards(apiKey, topic);
      setFlashcards({
        topic,
        cards: cards.map((card: any, index: number) => ({
          id: `${index}`,
          question: card.question,
          answer: card.answer,
        })),
      });
    } catch (err) {
      setError('Failed to generate flashcards. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">AI Flashcard Creator</h1>
          </div>
          <p className="text-gray-600 text-center max-w-xl">
            Generate custom flashcards for any topic using AI. Enter your OpenAI API key and the subject you want to study.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
          <div className="mb-6">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
              OpenAI API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="sk-..."
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="e.g., Ancient Rome, Quantum Physics, JavaScript Basics"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Flashcards'
            )}
          </button>

          {error && (
            <p className="mt-4 text-red-600 text-sm text-center">
              {error}
            </p>
          )}
        </form>

        {flashcards && (
          <FlashcardView cards={flashcards.cards} topic={flashcards.topic} />
        )}
      </div>
    </div>
  );
}

export default App;