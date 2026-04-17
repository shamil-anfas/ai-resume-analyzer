from pydantic import BaseModel
from typing import List

# What the AI analysis returns
class ATSAnalysis(BaseModel):
    ats_score: int                      # 0-100
    matched_keywords: List[str]         # keywords found in resume
    missing_keywords: List[str]         # keywords in JD but not resume
    suggestions: List[str]              # actionable improvements
    summary: str                        # overall summary paragraph

# What the API sends back to frontend
class AnalysisResponse(BaseModel):
    success: bool
    data: ATSAnalysis
    message: str = ""