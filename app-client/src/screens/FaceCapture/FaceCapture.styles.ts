import { View, TouchableOpacity } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import styled from 'styled-components/native';
import StyledText from '@/components/StyledText';

export const Container = styled(View)`
  display: flex;
  flex: 1;
  padding: 20px;
`;

export const GuideArea = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const GuideText = styled(StyledText)`
  font-size: 21px;
  letter-spacing: -1px;
`;

export const CameraArea = styled(View)`
  position: relative;
  flex: 2;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ProgressContainer = styled(View)`
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const CameraContainer = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
`;

export const CameraWrapper = styled(View)<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  overflow: hidden;
`;

export const CameraView = styled(Camera)`
  width: 100%;
  height: 100%;
`;

export const EmptyView = styled(View)`
  width: 100%;
  height: 100%;
  background-color: black;
`;

export const ControlArea = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const CaptureButton = styled(TouchableOpacity)<{ active: boolean }>`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: white;
  justify-content: center;
  align-items: center;
  opacity: ${props => (props.disabled ? 0.2 : 1)};
`;

export const CaptureButtonInner = styled(View)<{ active: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border: 2px solid ${props => props.theme.COLORS.BACKGROUND};
`;
