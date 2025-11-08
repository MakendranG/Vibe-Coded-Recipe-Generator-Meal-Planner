
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: { type: Type.STRING, description: 'Creative name of the recipe.' },
    description: { type: Type.STRING, description: 'A short, enticing description of the dish.' },
    prepTime: { type: Type.STRING, description: 'Estimated preparation time, e.g., "15 minutes".' },
    cookTime: { type: Type.STRING, description: 'Estimated cooking time, e.g., "30 minutes".' },
    servings: { type: Type.STRING, description: 'Number of servings the recipe makes, e.g., "4 servings".' },
    ingredients: {
      type: Type.OBJECT,
      properties: {
        provided: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'List of ingredients identified from the user\'s images.'
        },
        shoppingList: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'List of additional ingredients needed to complete the recipe. If none, this should be an empty array.'
        }
      },
      required: ['provided', 'shoppingList']
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Step-by-step cooking instructions.'
    },
    mealPrep: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Suggestions for preparing ingredients or parts of the meal in advance.'
    }
  },
  required: ['recipeName', 'description', 'prepTime', 'cookTime', 'servings', 'ingredients', 'instructions', 'mealPrep']
};


export const generateRecipe = async (
  images: { data: string; mimeType: string }[],
  preferences: string
): Promise<Recipe> => {
  const prompt = `You are an expert chef and creative meal planner. Based on the following image(s) of ingredients and user preferences, create a delicious and unique recipe.

User preferences: "${preferences || 'None specified. Feel free to be creative!'}"

Your task is to:
1. Identify all the edible ingredients visible in the image(s).
2. Create a unique and appealing recipe name.
3. Write a short, enticing description of the dish.
4. Estimate prep time, cook time, and the number of servings.
5. List the ingredients you identified in the images.
6. Create a shopping list of any *additional* ingredients required for the recipe. If no other ingredients are needed, this must be an empty array.
7. Provide clear, step-by-step cooking instructions.
8. Provide helpful meal prep suggestions to save time later (e.g., "chop all vegetables beforehand," "make the sauce a day ahead").

You MUST return your response as a single, valid JSON object that adheres to the provided schema. Do not include any text, markdown formatting, or code fences outside of the JSON object.`;

  const imageParts = images.map(image => ({
    inlineData: {
      data: image.data,
      mimeType: image.mimeType,
    },
  }));
  
  const contents = {
      parts: [...imageParts, { text: prompt }],
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });
    
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as Recipe;

  } catch (error) {
    console.error("Error generating recipe from Gemini:", error);
    throw new Error("Failed to parse recipe from AI response. The chef might be on a break.");
  }
};
