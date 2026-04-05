# NextStep: AI-Powered Career Roadmap Generator

**Transforming Static Advice into Actionable, Living Guidance.**

NextStep is a premium "Living System" designed to bridge the gap between career ambitions and reality. Unlike static lists, NextStep uses advanced AI to diagnose your skill gaps, engineer a personalized weekly plan, and adapt to your progress.

![Hero Preview](https://via.placeholder.com/1200x600.png?text=NextStep+Interface+Preview)

---

## 🚀 Key Features

- **Adaptive Career Engineering**: AI-generated roadmaps tailored to your unique background and goals.
- **Skill Gap Diagnosis**: Visual analysis of what you have vs. what you need.
- **Actionable Weekly Plans**: Granular tasks (Weeks 1-4+) to ensure consistent progress.
- **Interactive Progress Tracking**: Mark tasks complete, flag steps as "stuck," and watch your roadmap adapt.
- **Mentor-Driven AI**: Prompt architecture designed to provide specific, professional, and encouraging coaching.
- **Premium UI/UX**: A state-of-the-art dark-themed interface built with Framer Motion, GSAP, and Three.js.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+**: Application framework for high-performance rendering.
- **Tailwind CSS**: Utility-first styling for precise, premium UI control.
- **Framer Motion & GSAP**: Sophisticated animations and scroll-triggered effects.
- **Three.js**: Immersive WebGL backgrounds for a "Tesla-grade" aesthetic.

### Backend
- **FastAPI**: High-performance, asynchronous Python API framework.
- **SQLAlchemy (Async)**: Non-blocking ORM for the "Living System" persistence.
- **SQLite + aiosqlite**: Efficient, portable database optimized for production-readiness.
- **SlowAPI**: Integrated rate limiting for API protection.

### AI Engine
- **OpenRouter (GPT-3.5/4)**: Unified AI integration with tailored prompt engineering.

---

## 🚦 How It Works (System Flow)

1. **User Profiling**: User inputs background, skills, interests, and career goal.
2. **AI Synthesis**: FastAPI backend constructs a complex, mentor-like prompt and sends it to OpenRouter.
3. **Structured Mapping**: The AI returns a deeply nested JSON object containing gaps, tasks, and mini-projects.
4. **Persistence**: The roadmap is saved to the SQLite database using an async session.
5. **Interactive Guidance**: The frontend renders a "Living Roadmap." Users interact with tasks, triggering `PATCH` updates to the backend.
6. **Adaptive Loop**: When a user flags a step as "stuck," the system is designed to regenerate the roadmap based on current progress.

---

## 📦 Getting Started

### Prerequisites
- **Node.js**: v18 or later
- **Python**: v3.10 or later
- **Pip**: Python package manager
- **OpenRouter API Key**: Obtain from [openrouter.ai](https://openrouter.ai/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd NextStep
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Configuration
Create a `.env` file in the `backend/` directory:
```env
OPENROUTER_API_KEY=your_key_here
```

---

## ⚡ Running the Project

Experience the power of shared development environments with a single command.

In the **root directory**, run:
```bash
npm run dev
```
*This command uses `concurrently` to launch both the Next.js frontend (port 3000) and FastAPI backend (port 8000) in a unified terminal session.*

---

## 🏗️ Project Structure

```text
NextStep/
├── frontend/           # Next.js Application
│   ├── src/app/
│   │   ├── components/ # Modular UI (Hero, Form, Detail)
│   │   └── page.tsx    # Single Page Orchestration
│   └── tailwind.config.ts
├── backend/            # FastAPI Implementation
│   ├── main.py         # API Endpoints & Logic
│   ├── models.py       # DB Schema (SQLAlchemy)
│   ├── database.py     # Async Session Management
│   └── requirements.txt
└── package.json        # Unified workspace scripts
```

---

## 🛡️ Security & Performance

- **Rate Limiting**: Protected against API abuse via `SlowAPI`.
- **Input Validation**: Strict `Pydantic` schemas with field-level constraints.
- **Async I/O**: Fully non-blocking database and network operations for maximum concurrency on free-tier hosting (e.g., Render/Vercel).
- **CORS Handling**: Configured for secure local and production cross-origin requests.

---

## 🎓 Author & Contributions
Built as a premium demonstration of AI-driven career guidance. Contributions and feedback are welcome at [GitHub](https://github.com/).
