# Vibe-Coded Recipe Generator & Meal Planner

<img width="770" height="960" alt="image" src="https://github.com/user-attachments/assets/5094809a-5b6a-4acd-8edd-55b11adfa14a" />


Snap a pic of your ingredients, add your vibe, and get a custom AI-generated recipe, shopping list, and meal plan in seconds. This app uses the Google Gemini API's powerful multimodal capabilities to turn what's in your fridge into a delicious meal.



## ✨ Features

-   **Image-to-Recipe:** Upload photos of your ingredients.
-   **AI-Powered:** Uses the Google Gemini `gemini-2.5-flash` model to generate creative recipes.
-   **Personalized Results:** Add your dietary needs or preferences (e.g., "vegan", "quick meal").
-   **Complete Meal Plan:** Generates a full recipe, a shopping list for missing items, and meal prep instructions.
-   **Modern UI:** Clean, responsive, and user-friendly interface built with React and Tailwind CSS.
-   **Structured Output:** Leverages Gemini's JSON Mode for reliable and consistent recipe data.

## 🚀 How It's Built

-   **Frontend:** React, TypeScript, Tailwind CSS
-   **AI:** Google Gemini API (`@google/genai` SDK)
-   **Deployment:** Google Cloud Run

The application is a single-page app that communicates directly with the Google Gemini API. By defining a strict JSON schema, we ensure the data returned from the AI is always structured correctly, making the application robust and reliable.

## ⚙️ Getting Started

### Prerequisites

-   A Google Cloud project with billing enabled.
-   A Gemini API Key.

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MakendranG/Vibe-Coded-Recipe-Generator-Meal-Planner.git
    cd Vibe-Coded-Recipe-Generator-Meal-Planner
    ```

2.  **Set up your API Key:**
    Create a `.env` file in the root of the project and add your API key:
    ```
    API_KEY=your_gemini_api_key_here
    ```

3.  **Install dependencies and run:**
    This project is set up to run in an environment like AI Studio. To run locally, you would typically use a development server like Vite.
    ```bash
    npm install
    npm run dev
    ```

### ☁️ Deploying to Cloud Run

Click the **"Deploy to Cloud Run"** button at the top of this README to deploy this application directly to your Google Cloud account.

## 💡 What I Learned

This project was a fantastic exploration of building practical applications with multimodal AI. The key takeaway was the power of using structured data outputs (JSON Mode) to create reliable integrations with generative AI, moving from simple chatbots to complex, data-driven applications.
