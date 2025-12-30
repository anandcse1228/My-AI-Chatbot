## About

A beginner-friendly AI chatbot project using Gemini 2.5 Flash via AI SDK. Built as a learning exercise to explore frontend-backend streaming AI responses, custom prompts, and UX improvements.

Gemini Chatbot 💬

Hi there! 👋 I built this AI chatbot as a learning project using Gemini 2.5 Flash via the AI SDK.

I wanted to experiment with streaming AI responses, see how sources and reasoning can be displayed, and get some hands-on practice connecting a React frontend to a backend AI API. It’s not production-ready, but it’s a fun way to learn and explore AI development.

🚀 What it does

Sends messages to Gemini 2.5 Flash and streams the responses in real time

Shows sources and reasoning for the AI’s answers

Lets you send attachments in messages

UX-friendly: shows a welcome message when chat is empty, and alerts you if you try to send an empty message

Includes retry and copy buttons for AI responses

🛠️ Tech I used

Frontend: React + AI SDK UI components

Backend: Node.js + AI SDK streaming API

AI model: Gemini 2.5 Flash

Icons/UI: Lucide Icons

⚡ How to run it

Clone the repo

git clone https://github.com/yourusername/gemini-chatbot.git
cd gemini-chatbot


Install dependencies

npm install
# or
yarn install


Add your Gemini API key
Create a .env file in the root:

AI_API_KEY=your_free_gemini_api_key_here


Start the app

npm run dev
# or
yarn dev


Open http://localhost:3000
 and start chatting!

💡 How I adapted this project

I started with the AI SDK examples and made it my own by:

Customizing the system prompt to make the assistant more helpful

Aligning frontend & backend so only Gemini 2.5 Flash is used

Adding UX improvements, like a welcome message and input validation

Adding error handling and comments to show understanding

Removing extra features I wasn’t using, keeping it clean and simple

📚 What I learned

How to stream AI responses from backend to frontend

How to handle multiple message types: text, sources, reasoning

How to make a small but usable chat UI using React + AI SDK components

The importance of honest, maintainable code (even if starting from examples!)

