import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { recognizedUserIdAtom } from '@/atoms/userAtom';
import type { RecognitionResult } from '@/pages/FaceLogin/types/RecognitionResult';

const useFaceRecognition = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const intervalRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const recognizedUserId = useAtomValue(recognizedUserIdAtom);
  const setRecognizedUserId = useSetAtom(recognizedUserIdAtom);

  useEffect(() => {
    if (recognizedUserId) {
      return;
    }

    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('카메라 접근 실패:', err);
      }
    };

    void initCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [recognizedUserId]);

  useEffect(() => {
    if (recognizedUserId) {
      return;
    }

    const ws = new WebSocket(
      `${import.meta.env.VITE_AI_SERVER_WS_URL}/api/face/ws/recognition`,
    );
    wsRef.current = ws;

    ws.onopen = () => {
      intervalRef.current = window.setInterval(() => {
        if (!videoRef.current || !canvasRef.current || !wsRef.current) {
          return;
        }
        if (wsRef.current.readyState !== WebSocket.OPEN) {
          return;
        }

        const canvas = canvasRef.current;
        const video = videoRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return;
        }

        ctx.drawImage(video, 0, 0, 480, 480);

        canvas.toBlob(blob => {
          if (blob && wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(blob);
          }
        }, 'image/jpeg');
      }, 1000);
    };

    ws.onerror = error => {
      console.error('WebSocket 에러:', error);
    };

    ws.onmessage = event => {
      const result = JSON.parse(event.data as string) as RecognitionResult;

      if (result.success && result.user_id) {
        setRecognizedUserId(result.user_id);

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        if (wsRef.current) {
          wsRef.current.close();
          wsRef.current = null;
        }
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      }
    };

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [recognizedUserId, setRecognizedUserId]);

  return {
    videoRef,
    canvasRef,
  };
};

export default useFaceRecognition;
