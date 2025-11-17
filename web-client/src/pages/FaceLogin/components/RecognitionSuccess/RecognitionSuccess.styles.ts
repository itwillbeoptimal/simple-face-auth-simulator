import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div<{ show?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.4s ease-in;
`;

export const LottieWrapper = styled.div<{ show?: boolean }>`
  width: 320px;
  margin-bottom: 24px;
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.5s ease-out 0.2s;
`;

export const MessageWrapper = styled.div<{ show?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: ${props => (props.show ? fadeInUp : 'none')} 0.5s ease-out 0.4s forwards;
`;

export const SuccessTitle = styled.h1`
  margin-bottom: 8px;
`;

export const SuccessMessage = styled.div`
  color: ${props => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 21px;
  margin-bottom: 24px;
`;
