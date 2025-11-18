import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@/components/StyledText';

export const ScrollContainer = styled(ScrollView).attrs({
  contentContainerStyle: {
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 0,
    paddingLeft: 20,
  },
})`
  flex: 1;
`;

export const FieldWrapper = styled(View)`
  margin-bottom: 12px;
`;

export const InputLabel = styled(StyledText)`
  margin-bottom: 12px;
`;

export const SaveButtonWrapper = styled(View)`
  width: 100%;
  padding: 0 20px;
`;
