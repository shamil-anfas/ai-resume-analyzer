import json
import re
from langchain_groq import ChatGroq  # Switched from Google to Groq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.globals import set_llm_cache  # Added for caching support
from langchain_core.caches import InMemoryCache  # Added to enable in-memory caching
from app.models.schemas import ATSAnalysis
from app.config import settings

# Initialize in-memory cache to save API costs and speed up repeat requests
set_llm_cache(InMemoryCache())

# Initialize Groq client with Llama 3.3 70B
llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=settings.groq_api_key,
    temperature=0,
    max_tokens=2000,
    max_retries=1
)
print(f"--- [SERVICE] LOADED MODEL: {llm.model_name} (GROQ) ---", flush=True)

str_parser = StrOutputParser()

def clean_text(text: str) -> str:
    """Removes extra blank lines and excessive whitespace for cleaner LLM input."""
    # Replace multiple newlines with a single newline
    text = re.sub(r'\n+', '\n', text)
    # Strip leading/trailing whitespace
    return text.strip()

# Prompt template remains consistent for ATS analysis
prompt = ChatPromptTemplate.from_messages([
    ("system", """You are an expert ATS (Applicant Tracking System) analyst.
Analyze the resume against the job description and return ONLY valid JSON.
No markdown fences, no extra text.

Return this exact JSON structure:
{{
  "ats_score": <integer 0-100>,
  "matched_keywords": [<list of keywords found in both resume and JD>],
  "missing_keywords": [<list of important JD keywords missing from resume>],
  "suggestions": [<list of 3-5 specific, actionable improvements>],
  "summary": "<2-3 sentence overall assessment>"
}}
"""),
    ("human", "RESUME:\n{resume_text}\n\nJOB DESCRIPTION:\n{job_description}\n\nReturn JSON only.")
])

# Chain structure kept exactly as prompt | llm | parser
chain = prompt | llm | str_parser

def _clean_json(raw: str) -> str:
    """Helper to strip potential markdown fences from LLM output."""
    raw = raw.strip()
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)
    return raw.strip()

async def analyze_resume(resume_text: str, job_description: str) -> ATSAnalysis:
    try:
        # Pre-process text to remove noise before sending to AI
        clean_resume = clean_text(resume_text)
        clean_jd = clean_text(job_description)

        # Invoke the chain using cleaned inputs
        raw_output = await chain.ainvoke({
            "resume_text": clean_resume,
            "job_description": clean_jd
        })
        
        cleaned_json = _clean_json(raw_output)
        data = json.loads(cleaned_json)
        return ATSAnalysis(**data)
        
    except Exception as e:
        raise e