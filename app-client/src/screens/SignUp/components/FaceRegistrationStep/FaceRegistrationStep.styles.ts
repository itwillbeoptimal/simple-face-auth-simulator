import { View, Image, Animated } from 'react-native';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import StyledText from '@/components/StyledText';

export const Container = styled(View)`
  flex: 1;
`;

export const Form = styled(View)`
  flex: 1;
`;

export const Title = styled(StyledText)`
  font-size: 24px;
  margin-bottom: 8px;
  letter-spacing: -1px;
`;

export const Subtitle = styled(StyledText)`
  font-size: 16px;
  margin-bottom: 20px;
  letter-spacing: -0.5px;
`;

export const ContentWrapper = styled(View)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ImageWrapper = styled(Animated.View)`
  position: relative;
  width: 90%;
  aspect-ratio: 1024/864;
`;

export const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const BlurredImage = styled(Animated.Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const StyledLottieView = styled(LottieView)`
  width: 100%;
  height: 100%;
`;

export const SafetyMessageWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  gap: 4px;
  background-color: ${props => props.theme.COLORS.SURFACE};
  border-radius: 16px;
`;

export const SafetyMessage = styled(StyledText)`
  color: ${props => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 14px;
  letter-spacing: -0.4px;
`;

export const ButtonWrapper = styled(View)`
  display: flex;
  gap: 8px;
`;
