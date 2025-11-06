from fastapi import APIRouter, File, UploadFile, HTTPException, WebSocket, WebSocketDisconnect
from app.services.face_recognition import FaceRecognitionService
from app.schemas.face import FaceRecognitionResponse, FaceEmbeddingResponse

router = APIRouter(prefix="/api/face", tags=["face"])

@router.post("/recognize", response_model=FaceRecognitionResponse)
async def recognize_face(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="이미지 파일만 업로드할 수 있습니다")

    image_bytes = await file.read()
    return await FaceRecognitionService.recognize_face(image_bytes)

@router.post("/extract-embedding", response_model=FaceEmbeddingResponse)
async def extract_embedding(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="이미지 파일만 업로드할 수 있습니다")

    image_bytes = await file.read()
    return await FaceRecognitionService.extract_embedding(image_bytes)

@router.websocket("/ws/recognition")
async def recognition_websocket(websocket: WebSocket):
    await websocket.accept()
    print("WebSocket connected")

    try:
        while True:
            image_bytes = await websocket.receive_bytes()
            result = await FaceRecognitionService.recognize_face(image_bytes)
            await websocket.send_json(result.model_dump())

    except WebSocketDisconnect:
        print("WebSocket disconnected")
    except Exception as e:
        print(f"WebSocket error: {e}")
        await websocket.close()

@router.get("/health")
async def health_check():
    return {"status": "healthy"}
