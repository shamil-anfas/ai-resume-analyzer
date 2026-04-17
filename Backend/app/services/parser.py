import fitz          # PyMuPDF
import docx          # python-docx
import io

def extract_text(file_bytes: bytes, content_type: str) -> str:
    """Extract plain text from PDF or DOCX bytes."""

    if content_type == "application/pdf":
        return _parse_pdf(file_bytes)

    elif "wordprocessingml" in content_type:
        return _parse_docx(file_bytes)

    return ""

def _parse_pdf(file_bytes: bytes) -> str:
    text = ""
    # Open PDF from bytes (not a file path)
    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text.strip()

def _parse_docx(file_bytes: bytes) -> str:
    text = ""
    # python-docx needs a file-like object
    doc = docx.Document(io.BytesIO(file_bytes))
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    return text.strip()