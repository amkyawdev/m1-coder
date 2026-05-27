# M1-Coder 🤖

> AI-Powered Coding Assistant with Deep Thinking Capabilities

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-brightgreen.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688.svg)](https://fastapi.tiangolo.com/)

**M1-Coder** is a modern, production-ready AI coding assistant that leverages advanced language models to help developers write better code faster.

</div>

---

## ✨ Features

### 🎯 Core Features
- **Multi-Model Support** — Works with Claude, GPT-4, Gemini, and any OpenRouter-compatible model
- **Deep Thinking Mode** — Enable advanced reasoning for complex coding tasks
- **File Upload** — Attach code files for context-aware assistance
- **Conversation History** — Persistent chat history with session management

### 🎨 UI/UX
- **Dark Mode** — Eye-friendly dark theme by default
- **Glass Morphism** — Modern, sleek interface design
- **Smooth Animations** — Polished transitions with Framer Motion
- **Responsive** — Optimized for desktop and mobile

### 🔒 Security & Privacy
- **Client-Side API Keys** — Your keys stay in your browser
- **Firebase Auth** — Secure authentication with email & Google
- **No Data Collection** — Your conversations remain private

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- API keys (OpenRouter, OpenAI, Anthropic, or Google AI)

### Installation

```bash
# Clone the repository
git clone https://github.com/amkyawdev/m1-coder.git
cd m1-coder

# Install frontend dependencies
cd frontend
npm install

# Start development server
npm run dev
```

### Environment Setup

Create a `.env` file in the `frontend` directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_API_URL=https://your-backend-url.railway.app
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🏗️ Project Structure

```
m1-coder/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/          # Base components (Button, Input, Dialog, Switch)
│   │   │   └── chat/        # Chat components (ChatBubble, ChatInput, etc.)
│   │   ├── context/         # React Context (Auth, Theme, APIKey)
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services (Firebase, Supabase)
│   │   └── lib/             # Utility functions
│   └── public/              # Static assets
│
├── backend/                  # FastAPI backend
│   ├── app/
│   │   ├── routes/          # API endpoints
│   │   ├── utils/          # Helper functions
│   │   └── main.py         # Application entry point
│   └── requirements.txt    # Python dependencies
│
├── api/                      # API documentation
└── vercel.json              # Vercel deployment config
```

---

## 🎨 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| [React 18](https://reactjs.org/) | UI framework |
| [Vite](https://vitejs.dev/) | Build tool |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Lucide React](https://lucide.dev/) | Icons |
| [React Router](https://reactrouter.com/) | Routing |
| [Firebase](https://firebase.google.com/) | Authentication |

### Backend
| Technology | Purpose |
|------------|---------|
| [FastAPI](https://fastapi.tiangolo.com/) | API framework |
| [Uvicorn](https://www.uvicorn.org/) | ASGI server |
| [HTTPX](https://www.python-httpx.org/) | HTTP client |
| [Pydantic](https://docs.pydantic.dev/) | Data validation |

### Deployment
| Service | Purpose |
|---------|---------|
| [Vercel](https://vercel.com/) | Frontend hosting |
| [Railway](https://railway.app/) | Backend hosting |
| [OpenRouter](https://openrouter.ai/) | AI model gateway |

---

## 📖 Usage

### 1. Authentication
Sign up with email or Google account. Your session is securely managed by Firebase.

### 2. API Keys
Navigate to **Settings → API Keys** to configure your AI provider:
- **OpenRouter** (recommended) — Access to multiple models
- **OpenAI** — GPT-4 and GPT-3.5
- **Anthropic** — Claude models
- **Google AI** — Gemini models

### 3. Chat Interface
- Select your preferred AI model from the dropdown
- Toggle **Deep Thinking** for complex tasks
- Upload files for context-aware responses
- View conversation history in the sidebar

### 4. Deep Thinking Mode
When enabled, the AI uses extended reasoning chains to provide:
- Detailed problem analysis
- Multiple solution approaches
- Code explanations with trade-offs
- Best practices recommendations

---

## 🔧 Development

### Running Locally

```bash
# Frontend
cd frontend
npm run dev

# Backend (separate terminal)
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Building for Production

```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/`

---

## 🌐 Deployment

### Vercel (Frontend)

1. Connect your GitHub repository to Vercel
2. Set root directory to `frontend`
3. Add environment variables
4. Deploy

```bash
# Or use CLI
cd frontend
npx vercel --prod
```

### Railway (Backend)

1. Create new Railway project
2. Connect GitHub repository
3. Set root directory to `backend`
4. Add `OPENROUTER_API_KEY` environment variable
5. Deploy

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Aung Myo Kyaw**

- GitHub: [@amkyawdev](https://github.com/amkyawdev)
- Website: [amkyawdev.neocities.org](https://amkyawdev.neocities.org)

---

## 🙏 Acknowledgments

- [OpenRouter](https://openrouter.ai/) for unified AI model access
- [Vercel](https://vercel.com/) for excellent hosting
- [Railway](https://railway.app/) for reliable backend deployment
- All open-source contributors

---

<div align="center">

**Built with ❤️ for developers**

</div>