import face_recognition
import numpy as np
from PIL import Image
import io
import httpx
from typing import Optional, Tuple, List
from app.config import CORE_SERVER_URL
from app.schemas.face import FaceRecognitionResponse, FaceEmbeddingResponse

class FaceRecognitionService:
    RECOGNITION_THRESHOLD = 0.6
    CORE_SERVER_TIMEOUT = 10.0

    @staticmethod
    async def extract_face_encoding(image_bytes: bytes) -> Optional[np.ndarray]:
        try:
            image = Image.open(io.BytesIO(image_bytes))
            image_array = np.array(image)
            face_encodings = face_recognition.face_encodings(image_array)

            return face_encodings[0] if face_encodings else None

        except Exception as e:
            print(f"Error extracting face encoding: {e}")
            return None

    @staticmethod
    async def extract_embedding(image_bytes: bytes) -> FaceEmbeddingResponse:
        face_encoding = await FaceRecognitionService.extract_face_encoding(image_bytes)

        if face_encoding is None:
            return FaceEmbeddingResponse(
                success=False,
                message="얼굴을 감지할 수 없습니다",
                embedding=None
            )

        return FaceEmbeddingResponse(
            success=True,
            message="임베딩 추출 성공",
            embedding=face_encoding.tolist()
        )

    @staticmethod
    async def fetch_stored_embeddings() -> List[dict]:
        try:
            async with httpx.AsyncClient(timeout=FaceRecognitionService.CORE_SERVER_TIMEOUT) as client:
                response = await client.get(f"{CORE_SERVER_URL}/api/face-embeddings")
                response.raise_for_status()
                return response.json()

        except httpx.HTTPError as e:
            print(f"HTTP error fetching embeddings: {e}")
            return []
        except Exception as e:
            print(f"Error fetching embeddings: {e}")
            return []

    @staticmethod
    async def find_matching_user(face_encoding: np.ndarray) -> Optional[Tuple[str, float]]:
        users = await FaceRecognitionService.fetch_stored_embeddings()

        if not users:
            return None

        best_match_user_id = None
        best_match_distance = float('inf')

        for user in users:
            if not user.get('face_embedding'):
                continue

            stored_embedding = np.array(user['face_embedding'])
            distance = face_recognition.face_distance([stored_embedding], face_encoding)[0]

            if distance < best_match_distance:
                best_match_distance = distance
                best_match_user_id = user['id']

        if best_match_distance < FaceRecognitionService.RECOGNITION_THRESHOLD:
            confidence = 1 - best_match_distance
            return (best_match_user_id, confidence)

        return None

    @staticmethod
    async def recognize_face(image_bytes: bytes) -> FaceRecognitionResponse:
        face_encoding = await FaceRecognitionService.extract_face_encoding(image_bytes)

        if face_encoding is None:
            return FaceRecognitionResponse(
                success=False,
                user_id=None,
                confidence=None,
                message="얼굴을 감지할 수 없습니다"
            )

        match_result = await FaceRecognitionService.find_matching_user(face_encoding)

        if match_result is None:
            return FaceRecognitionResponse(
                success=False,
                user_id=None,
                confidence=None,
                message="일치하는 사용자를 찾을 수 없습니다"
            )

        user_id, confidence = match_result
        return FaceRecognitionResponse(
            success=True,
            user_id=user_id,
            confidence=confidence,
            message="얼굴 인식 성공"
        )
