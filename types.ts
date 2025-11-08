
export interface Recipe {
  recipeName: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  ingredients: {
    provided: string[];
    shoppingList: string[];
  };
  instructions: string[];
  mealPrep: string[];
}
