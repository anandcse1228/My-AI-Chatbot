# AI Chatbot with Gemini 2.5 Flash

A modern, responsive AI chatbot built with Next.js, React, and the AI SDK, powered by Google's Gemini 2.5 Flash model. This project demonstrates real-time streaming AI responses, advanced UI components, and mobile-first design principles.
=======
# AI Chatbot with Gemini 2.5 Flash

A modern, responsive AI chatbot built with Next.js, React, and the AI SDK, powered by Google's Gemini 2.5 Flash model. This project demonstrates real-time streaming AI responses, advanced UI components, and mobile-first design principles.
=======
# AI Chatbot with Gemini 2.5 Flash

A modern, responsive AI chatbot built with Next.js, React, and the AI SDK, powered by Google's Gemini 2.5 Flash model. This project demonstrates real-time streaming AI responses, advanced UI components, and mobile-first design principles.
>>>>>>> 9f665d2 (Update README with detailed project documentation)
 🚀 Features

### Core Functionality
- **Real-time Streaming**: Instant AI responses streamed from Gemini 2.5 Flash
- **Multi-modal Input**: Support for text messages and file attachments
- **Conversation Management**: Create, manage, and switch between multiple conversations
- **Source Citations**: Display sources and reasoning for AI responses
- **Retry & Copy**: Easy retry failed messages and copy responses

### User Experience
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Voice Input**: Integrated voice-to-text functionality for mobile devices
- **Smooth Animations**: Framer Motion-powered transitions and interactions
- **Glassmorphism Theme**: Modern UI with neon effects and glass-like elements
- **Input Validation**: Prevents empty messages with user-friendly alerts
- **Welcome Messages**: Contextual greetings for new conversations

### Technical Highlights
- **Streaming API**: Efficient backend-to-frontend data streaming
- **Component Architecture**: Modular, reusable React components
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first styling with custom animations
- **AI SDK Integration**: Seamless connection to Google's AI services

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.1**: React framework with App Router
- **React 19.2.3**: UI library with modern hooks
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS v4**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth transitions
- **Radix UI**: Accessible UI primitives
- **Lucide Icons**: Beautiful, consistent icon set

### Backend & AI
- **AI SDK**: Vercel's AI SDK for seamless AI integration
- **Google AI SDK**: Direct integration with Gemini models
- **Node.js**: Server-side runtime

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **TypeScript Compiler**: Type checking

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Google Gemini API key (free tier available)

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/anandcse1228/My-AI-Chatbot.git
cd My-AI-Chatbot
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
AI_API_KEY=your_gemini_api_key_here
```

Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

### 5. Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000) and start chatting!

## 📁 Project Structure

```
My-AI-Chatbot/
├── app/                    # Next.js App Router
│   ├── api/chat/          # Chat API endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main chat page
├── components/            # React components
│   ├── ai-elements/       # AI-specific UI components
│   ├── ui/               # Reusable UI components
│   └── ChatLayout.tsx    # Main layout component
├── lib/                   # Utility functions
├── public/               # Static assets
└── types/                # TypeScript definitions
```

## 🎯 Key Components

### ChatLayout
Responsive layout component with mobile drawer functionality.

### VoiceInputButton
Voice-to-text input with mobile-optimized UX.

### AI Elements
- **Message**: Handles text, sources, and reasoning display
- **Conversation**: Manages chat history and state
- **Loader**: Loading states and animations
- **PromptInput**: Enhanced input with validation

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Mobile Responsiveness

The app is fully responsive with:
- Hidden sidebars on mobile (≤640px)
- Slide-in drawers for navigation
- Full-screen chat interface
- Touch-friendly buttons
- Sticky input bar

## 🎨 Design Philosophy

- **Mobile-First**: Optimized for mobile devices first
- **Glassmorphism**: Modern, translucent UI elements
- **Neon Accents**: Subtle glow effects for interactive elements
- **Smooth Animations**: 60fps animations with Framer Motion
- **Accessibility**: WCAG-compliant components via Radix UI

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repo to Vercel
2. Add `AI_API_KEY` environment variable
3. Deploy automatically on push

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- Self-hosted with Docker

## 🤝 Contributing

This is a learning project, but contributions are welcome! Areas for improvement:
- Additional AI model support
- Enhanced conversation persistence
- Advanced file upload handling
- Theme customization options

## 📚 Learning Outcomes

Through building this project, I explored:
- Real-time data streaming in web applications
- Advanced React patterns and hooks
- Mobile-first responsive design
- AI API integration and prompt engineering
- Modern CSS with Tailwind and animations
- TypeScript for scalable development

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Vercel AI SDK](https://sdk.vercel.ai/) for seamless AI integration
- [Google Gemini](https://ai.google.dev/) for powerful AI capabilities
- [Next.js](https://nextjs.org/) for the excellent React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

---

Built with ❤️ using Next.js, React, and Gemini AI

