# Caption Crafty 🚀

<p align="center">
  <img src="https://img.freepik.com/free-vector/ai-powered-content-creation-isometric-concept-with-chatbot-laptop-screen-3d-vector-illustration_1284-82523.jpg" alt="AI powered content creation" width="400">
</p>

<p align="center">
  <strong>Effortless AI Captions that Engage & Convert</strong>
  <br />
  <a href="#key-features">Key Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#how-it-works">How It Works</a>
</p>

---

**Caption Crafty** is a modern, full-stack web application built with Next.js that leverages the power of Google's Gemini generative AI to create high-quality, platform-specific content. Users can upload media or provide a text topic to generate engaging captions for social media platforms like Instagram, X, and LinkedIn, or even full-length blog posts.

## Key Features

✨ **Instant Creativity**: Generate multiple engaging captions or full blog posts in seconds. Overcome writer's block and save precious time.

🧠 **Advanced AI**: Powered by Google's Gemini model through Genkit to understand your media and deliver high-quality, relevant content.

🛠️ **Fully Customizable**:
- **Multi-Platform Support**: Tailor content for Instagram, X, LinkedIn, YouTube, or as a Blog Post.
- **Tone & Mood**: Adjust the AI's voice to be Professional, Casual, Funny, or Trendy.
- **Flexible Input**: Generate content from an uploaded image/video or a simple text description.
- **Output Formatting**: Choose between paragraph or bullet-point styles for your content.

🎨 **Modern & Sleek UI**:
- A professional, responsive interface built with ShadCN UI and Tailwind CSS.
- Beautiful, seamless light and dark mode themes with subtle gradients.
- Smooth animations and transitions for a superior user experience.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **AI/Generative**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with [Google Gemini](https://deepmind.google/technologies/gemini/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- `npm`, `yarn`, or `pnpm`

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/caption-crafty.git
    cd caption-crafty
    ```

2.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google AI API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```
    # .env
    GOOGLE_API_KEY=your_google_api_key_here
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development servers:**
    This project requires two concurrent development processes: one for the Next.js frontend and another for the Genkit AI backend.

    - **Terminal 1: Start the Next.js app:**
      ```bash
      npm run dev
      ```
      This will start the web application, typically on `http://localhost:9002`.

    - **Terminal 2: Start the Genkit server:**
      ```bash
      npm run genkit:dev
      ```
      This starts the Genkit development UI, which you can use to inspect and test your AI flows, typically on `http://localhost:4000`.

## Project Structure

The project is organized to separate UI concerns from AI logic, making it clean and scalable.

```
.
├── src
│   ├── app/                # Next.js App Router (UI pages, layouts, styles)
│   │   ├── page.tsx        # Main landing page component
│   │   └── globals.css     # Global styles and theme variables (CSS HSL)
│   │
│   ├── ai/                 # All Genkit AI-related code
│   │   ├── flows/
│   │   │   └── generate-caption.ts # The core Genkit flow for content generation
│   │   └── genkit.ts       # Genkit initialization & configuration
│   │
│   ├── components/         # Reusable React components
│   │   ├── ui/             # ShadCN UI components
│   │   ├── caption-generator.tsx # Main interactive component
│   │   ├── features.tsx    # Features section component
│   │   └── ...             # Other landing page components
│   │
│   ├── lib/                # Utility functions (e.g., cn for classnames)
│   └── hooks/              # Custom React hooks (e.g., useToast)
│
├── public/                 # Static assets (images, fonts, etc.)
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── package.json
```

## How It Works

### 1. Frontend (`src/components/caption-generator.tsx`)

- **State Management**: Uses `useState` to manage all UI state, including the selected file, text input, dropdown options, loading status, and final results.
- **User Input**:
    - `FileUploader`: A custom component for handling drag-and-drop and click-to-upload for media files.
    - `Textarea`: Allows users to input a topic or context directly.
    - `Select`, `RadioGroup`: ShadCN components used for customizing the output (platform, tone, etc.).
- **API Call**: On submission, the component calls the `generatePlatformOptimizedCaption` server function. It converts the uploaded file to a Base64 data URI if present and passes all user-selected options.
- **Displaying Results**: It conditionally renders a loading skeleton, an error alert, or the `CaptionCard` components based on the state of the API call.

### 2. AI Backend (`src/ai/flows/generate-caption.ts`)

This file is the heart of the AI functionality.

- **`'use server'`**: This Next.js directive marks the file's exports as Server Actions, allowing them to be called securely from client-side components.
- **Zod Schemas**:
    - `GeneratePlatformOptimizedCaptionInputSchema`: Defines the exact shape and type of the input the AI flow expects. This provides strong type safety and validation.
    - `GeneratePlatformOptimizedCaptionOutputSchema`: Defines the structure of the JSON output we expect from the AI model. This is crucial for ensuring the model returns data in a predictable format that the UI can easily parse.
- **`ai.definePrompt`**:
    - This creates the prompt template that is sent to the Gemini model.
    - **Handlebars Templating**: It uses Handlebars (`{{{...}}}`) to dynamically insert user inputs (like `platform`, `moodTone`) into the prompt text.
    - **Structured Output**: It passes the `output` schema to the model, instructing it to return a response in the specified JSON format.
    - **Multimedia Input**: The `{{media url=photoDataUri}}` helper is used to include the image data directly in the prompt when a file is provided.
- **`ai.defineFlow`**:
    - This wraps the prompt logic into a managed Genkit "flow."
    - It takes the user input, calls the defined prompt, and returns the structured output from the AI model.
    - The exported `generatePlatformOptimizedCaption` function is a simple wrapper around this flow, making it easy to invoke from the frontend.

---

This project serves as a powerful example of how to integrate modern generative AI into a polished, user-friendly web application using the latest industry-standard tools.
