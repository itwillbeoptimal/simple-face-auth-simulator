import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@/components/StyledText';

export const Container = styled(View)`
  flex: 1;
`;

export const ScrollContainer = styled(ScrollView).attrs({
  contentContainerStyle: {
    paddingBottom: 20,
  },
})`
  flex: 1;
`;

export const Form = styled(View)`
  flex: 1;
  gap: 12px;
`;

export const Title = styled(StyledText)`
  font-size: 24px;
  margin-bottom: 8px;
  letter-spacing: -1px;
`;

export const Subtitle = styled(StyledText)`
  font-size: 16px;
  margin-bottom: 32px;
  letter-spacing: -0.5px;
`;

export const FieldWrapper = styled(View)``;

export const InputLabel = styled(StyledText)`
  margin: 0 4px 8px 0;
`;
