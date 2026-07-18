# 📄 AI Resume Optimizer & ATS Analyzer

A high-performance web application that uses **Large Language Models (Llama 3.3 via Groq)** to analyze resumes against job descriptions. It provides a real-time ATS score, keyword matching, and actionable improvement suggestions.

## 🚀 Live Demo

**Try the application:** https://ai-resume-analyzer-olive-kappa.vercel.app/

> Note: The backend is hosted on Render's free tier, so the first request may take longer while the server starts.

## ✨ Features

- **ATS Scoring**: Get an instant compatibility score (0-100).
- **Keyword Analysis**: Identifies matched and missing keywords from the job description.
- **Actionable Suggestions**: AI-generated tips to improve resume matching.
- **Modern UI**: Sleek, responsive design with dark/light mode support.
- **Fast Analysis**: Powered by Groq for near-instant inference.

## 🛠️ Tech Stack

### Backend

- **FastAPI**: High-performance Python web framework.
- **LangChain**: Framework for building LLM-powered applications.
- **Groq / Llama 3.3**: Ultra-fast inference for the analysis logic.
- **PyMuPDF / python-docx**: Robust text extraction from PDF and Word documents.

### Frontend

- **React.js**: For a dynamic, component-based user interface.
- **Tailwind CSS (v4)**: Modern styling with utility-first classes.
- **Lucide React**: Premium icon set.
- **Axios**: For seamless API communication.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. Setup Backend

```bash
cd Backend
# Create virtual environment
python -m venv venv
# Activate it (Windows)
.\venv\Scripts\activate
# Install dependencies
pip install -r requirements.txt
```

**Configure `.env` in the `Backend` folder:**

```env
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

---

## 🏃 Running the Project

### Start Backend

In the `Backend` folder (with venv activated):

```bash
uvicorn app.main:app --reload --port 8000
```

### Start Frontend

In the `frontend` folder:

```bash
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 📁 Project Structure

- `Backend/`: FastAPI server, LLM logic, and file parsers.
- `frontend/`: React application, components, and styling.
