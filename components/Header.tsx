
import React from 'react';
import { ChefHatIcon } from './icons/ChefHatIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
            <ChefHatIcon className="h-8 w-8 mr-3" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Vibe-Coded Recipe Generator
            </h1>
        </div>
      </div>
    </header>
  );
};
