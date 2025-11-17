import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100dvh;
  padding: 40px;
`;

export const VideoContainer = styled.div<{ fadeOut?: boolean }>`
  position: relative;
  margin-bottom: 24px;
  border-radius: 50%;
  overflow: hidden;
  animation: ${props => (props.fadeOut ? fadeOut : 'none')} 0.3s ease-out forwards;
`;

export const Video = styled.video`
  width: 480px;
  height: 480px;
  display: block;
  object-fit: cover;
`;

export const Canvas = styled.canvas`
  display: none;
`;
