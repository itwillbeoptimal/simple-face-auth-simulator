import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const shrinkToZero = keyframes`
  0% {
    width: 400px;
    height: 400px;
    opacity: 1;
  }
  100% {
    width: 0;
    height: 0;
    opacity: 0;
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
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.03) 0%, rgba(80, 227, 194, 0.03) 100%);
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
  color: ${props => props.theme.COLORS.LABEL.PRIMARY};
`;

export const Subtitle = styled.p`
  font-size: 21px;
  color: ${props => props.theme.COLORS.LABEL.SECONDARY};
  text-align: center;
  margin-bottom: -60px;
`;

export const VideoWrapper = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BlurLottieWrapper = styled.div<{ fadeOut?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  opacity: ${props => (props.fadeOut ? 0 : 1)};
  transition: opacity 0.3s ease-out;
  pointer-events: none;
`;

export const GuideText = styled.div<{ fadeOut?: boolean }>`
  font-size: 18px;
  max-width: 400px;
  margin-top: -60px;
  color: ${props => props.theme.COLORS.LABEL.TERTIARY};
  text-align: center;
  opacity: ${props => (props.fadeOut ? 0 : 1)};
  transition: opacity 0.3s ease-out;
`;

export const VideoContainer = styled.div<{ fadeOut?: boolean }>`
  position: relative;
  width: 400px;
  height: 400px;
  background-color: black;
  border-radius: 50%;
  overflow: hidden;
  z-index: 1;
  animation: ${props => (props.fadeOut ? shrinkToZero : 'none')} 0.8s ease-in-out forwards;
`;

export const Video = styled.video`
  width: 400px;
  height: 400px;
  display: block;
  object-fit: cover;
`;

export const Canvas = styled.canvas`
  display: none;
`;
