
import React, { useState } from 'react';
import type { Recipe } from '../types';
import { ChefHatIcon } from './icons/ChefHatIcon';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { ClipboardListIcon } from './icons/ClipboardListIcon';

interface RecipeDisplayProps {
  recipe: Recipe;
}

type Tab = 'instructions' | 'shoppingList' | 'mealPrep';

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }> = ({ active, onClick, icon, children }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-semibold rounded-t-lg border-b-2 transition-colors duration-200 ${
            active
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
    >
        {icon}
        {children}
    </button>
);


export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
    const [activeTab, setActiveTab] = useState<Tab>('instructions');

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in">
            <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">{recipe.recipeName}</h2>
                <p className="mt-3 text-gray-600">{recipe.description}</p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">
                        <strong>Prep:</strong> {recipe.prepTime}
                    </div>
                    <div className="flex items-center gap-2 bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-medium">
                        <strong>Cook:</strong> {recipe.cookTime}
                    </div>
                     <div className="flex items-center gap-2 bg-sky-100 text-sky-800 px-3 py-1 rounded-full font-medium">
                        <strong>Serves:</strong> {recipe.servings}
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">Your Ingredients</h3>
                        <ul className="space-y-2 text-gray-700">
                            {recipe.ingredients.provided.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-emerald-500 mr-2 mt-1">&#10003;</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:col-span-2">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex gap-4" aria-label="Tabs">
                                <TabButton active={activeTab === 'instructions'} onClick={() => setActiveTab('instructions')} icon={<ChefHatIcon className="w-5 h-5"/>}>
                                    Instructions
                                </TabButton>
                                <TabButton active={activeTab === 'shoppingList'} onClick={() => setActiveTab('shoppingList')} icon={<ShoppingCartIcon className="w-5 h-5"/>}>
                                    Shopping List
                                </TabButton>
                                <TabButton active={activeTab === 'mealPrep'} onClick={() => setActiveTab('mealPrep')} icon={<ClipboardListIcon className="w-5 h-5"/>}>
                                    Meal Prep
                                </TabButton>
                            </nav>
                        </div>
                        <div className="mt-6">
                            {activeTab === 'instructions' && (
                                <ol className="space-y-4 text-gray-700 list-decimal list-inside">
                                    {recipe.instructions.map((step, index) => (
                                        <li key={index} className="pl-2 leading-relaxed">{step}</li>
                                    ))}
                                </ol>
                            )}
                            {activeTab === 'shoppingList' && (
                                recipe.ingredients.shoppingList.length > 0 ? (
                                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                                    {recipe.ingredients.shoppingList.map((item, index) => (
                                        <li key={index} className="pl-2">{item}</li>
                                    ))}
                                </ul>
                                ) : (
                                    <p className="text-gray-500 italic">Looks like you have everything you need. Happy cooking!</p>
                                )
                            )}
                             {activeTab === 'mealPrep' && (
                                recipe.mealPrep.length > 0 ? (
                                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                                    {recipe.mealPrep.map((tip, index) => (
                                        <li key={index} className="pl-2">{tip}</li>
                                    ))}
                                </ul>
                                ) : (
                                    <p className="text-gray-500 italic">No specific meal prep instructions for this recipe.</p>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
