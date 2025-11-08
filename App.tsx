
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { RecipeDisplay } from './components/RecipeDisplay';
import { Loader } from './components/Loader';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { generateRecipe } from './services/geminiService';
import type { Recipe } from './types';
import { fileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [preferences, setPreferences] = useState<string>('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = useCallback(async () => {
    if (images.length === 0) {
      setError('Please upload at least one ingredient photo.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const imagePromises = images.map(async (file) => ({
        data: await fileToBase64(file),
        mimeType: file.type,
      }));

      const imagePayloads = await Promise.all(imagePromises);
      
      const generatedRecipe = await generateRecipe(imagePayloads, preferences);
      setRecipe(generatedRecipe);
    } catch (err) {
      console.error(err);
      setError('Failed to generate a recipe. The culinary AI might be taking a nap. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [images, preferences]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Your Ingredients</h2>
            <p className="text-gray-600">Snap a photo of what's in your fridge or pantry. The more, the merrier!</p>
          </div>
          
          <ImageUploader onImagesChange={setImages} />

          <div>
            <label htmlFor="preferences" className="block text-lg font-semibold text-gray-700 mb-2">Any Preferences?</label>
            <input
              id="preferences"
              type="text"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="e.g., vegan, gluten-free, quick 30-min meal..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
            />
          </div>

          <div className="pt-4">
             <button
              onClick={handleGenerateRecipe}
              disabled={isLoading || images.length === 0}
              className="w-full flex items-center justify-center gap-3 bg-emerald-600 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader />
                  Conjuring up a masterpiece...
                </>
              ) : (
                <>
                  <SparklesIcon />
                  Generate My Vibe-Coded Recipe
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
            <strong className="font-bold">Oops! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {recipe && !isLoading && (
          <div className="mt-8">
            <RecipeDisplay recipe={recipe} />
          </div>
        )}
      </main>
      <footer className="text-center p-6 text-gray-500 text-sm">
        <p>Powered by Gemini AI. Created with &hearts; for food lovers.</p>
      </footer>
    </div>
  );
};

export default App;
