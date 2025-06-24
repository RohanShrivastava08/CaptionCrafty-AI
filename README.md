# 🌟 🚀 CaptionCrafty AI – Smart Caption & Blog Generator Powered by Gemini



- CaptionCrafty AI is a full-stack, generative AI web app that creates platform-optimized social media captions and long-form blog content from an image, video, or simple text input.
- It’s powered by Google Gemini through Firebase Genkit and wrapped in a sleek, modern UI using Next.js and ShadCN.


## 📋 Table of Contents
- Introduction
- Features
- Project Implementation Process
- File Structure
- Technology Stack
- Installation
- Usage
- Screenshots
- Contributing
- License
- Contact

## 📘 Introduction

- CaptionCrafty AI revolutionizes how content creators, marketers, and influencers create text for digital platforms.
- Instead of brainstorming for captions or blog ideas, simply upload an image/video or type a topic, and let the AI generate creative, platform-specific content for:

- Instagram, LinkedIn, X (Twitter), YouTube, or full Blog Posts

- In tones like Professional, Casual, Funny, or Trendy

- In paragraph or bullet format


## ✨ Features

🧠 Generative AI Writing
→ Create high-quality social captions or full-length blogs using minimal input.

📸 Media + Text Input
→ Upload an image/video or enter a topic manually to start generating content.

🌐 Platform-Specific Output
→ Tailor your content to different platforms like Instagram, X, LinkedIn, YouTube, or Blogs.

🎭 Tone & Mood Personalization
→ Adjust voice and style: Professional, Trendy, Funny, or Casual.

🧾 Format Control
→ Choose between paragraph-style or bullet-point output.

💡 Modern UI
→ Responsive card-based layout with smooth animations, gradients, and dark/light modes.

📤 Export & Reuse
→ Easily copy or download content for sharing or reuse.

## 🛠 Project Implementation Process

#### 1. Input Flow
- Upload image/video or enter a text topic
- Select platform, tone, and format
- Submit to trigger AI generation flow

#### 2. AI Content Generation
- Powered by generate-caption.ts Genkit flow
- Uses Handlebars templating to dynamically insert user data
- Supports both text and Base64-encoded media as inputs
- Gemini model outputs structured JSON based on Zod schema

#### 3. UI/UX Highlights
- Smooth transitions using ShadCN + Tailwind CSS
- Real-time state updates with React Hooks
- Loading skeletons, error handling, and reset functionality
- Responsive layout with dark/light support


## 📁 File Structure

```bash
caption-crafty/
├── src/
│   ├── app/                 # App Router layouts, pages, global styles
│   ├── components/
│   │   ├── caption-generator.tsx   # Main interactive logic
│   │   ├── features.tsx            # Landing section
│   │   ├── layout/, ui/, etc.      # UI & layout components
│   ├── ai/
│   │   ├── flows/
│   │   │   └── generate-caption.ts # Core Gemini prompt & flow
│   │   ├── genkit.ts               # Genkit setup & model config
│   ├── lib/                 # Utility functions
│   ├── hooks/               # Custom React hooks
│   └── types/               # Type definitions
├── public/                  # Static assets (images, logos)
├── .env.local               # Environment variables
├── next.config.ts           # Next.js config
├── tailwind.config.ts       # Tailwind theme setup
└── README.md


```

## 💻 Technology Stack

Category	Tech Used

🧠 AI Engine	Firebase Genkit + Google Gemini

⚛️ Frontend	Next.js 15 (App Router), React 18

🎨 Styling	Tailwind CSS, ShadCN UI

🔠 Language	TypeScript

✅ Form Validation	Zod + React Hook Form

🧪 State	React Hooks

🚀 Deployment	Vercel or Firebase Hosting


## 🛠 Installation

Follow these steps to set up and run the Techny project locally:

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/caption-crafty.git
cd caption-crafty
```

#### 2. Install dependencies

```bash
npm install
# or
yarn install
```

#### 3. Set Up Environment Variables

- Create a .env.local file in the root:

```bash
GOOGLE_API_KEY=your_google_ai_api_key
```

Get your API key at: Google AI Studio

#### 4. Run Genkit (AI server)

```bash
npm run genkit:dev
# or for hot reload
npm run genkit:watch
```

### 5. Run the app

```bash
npm run dev
```
Visit: http://localhost:9002

## 🚀 Usage
- Upload a media file or type a topic
- Select platform, tone, and output format
- Click “Generate”
- Review and copy or download the output
- Click “Start Over” to reset

🤖 AI Capabilities

| Feature           | AI Flow               | Input Type    | Output                     |
| ----------------- | --------------------- | ------------- | -------------------------- |
| Caption Generator | `generate-caption.ts` | Media or Text | Platform-optimized caption |
| Blog Generator    | `generate-caption.ts` | Topic only    | Full blog content          |


## 📸 Screenshots




## 🤝 Contributing
We welcome community contributions! Follow the steps below to contribute:

#### Fork the repository
- Create a new branch:
```bash
git checkout -b feature/YourFeature
```

- Commit your changes:
```bash
git commit -m 'Add your feature'
```

- Push to the branch:
```bash
git push origin feature/YourFeature
```

- Open a pull request with detailed explanations of your changes.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact
For any questions or suggestions, feel free to reach out:

- Email: rohansh0808@gmail.com
- GitHub: Rohansh0808
