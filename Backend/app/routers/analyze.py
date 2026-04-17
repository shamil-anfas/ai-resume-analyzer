from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.parser import extract_text
from app.services.analyzer import analyze_resume
from app.models.schemas import AnalysisResponse

router = APIRouter()

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    # Validate file type
    if resume.content_type not in [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]:
        raise HTTPException(status_code=400, detail="Only PDF or DOCX files allowed")

    # Read file bytes
    file_bytes = await resume.read()

    # Extract plain text from resume
    resume_text = extract_text(file_bytes, resume.content_type)

    if not resume_text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from resume")

    # Run AI analysis
    try:
        result = await analyze_resume(resume_text, job_description)
        return AnalysisResponse(success=True, data=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))