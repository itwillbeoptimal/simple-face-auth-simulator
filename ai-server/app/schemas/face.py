from pydantic import BaseModel
from typing import Optional, List

class FaceRecognitionResponse(BaseModel):
    success: bool
    user_id: Optional[str] = None
    confidence: Optional[float] = None
    message: str

class FaceEmbeddingResponse(BaseModel):
    success: bool
    message: str
    embedding: Optional[List[float]] = None
