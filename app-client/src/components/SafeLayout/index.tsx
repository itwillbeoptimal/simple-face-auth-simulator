import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${props => props.theme.COLORS.BACKGROUND};
`;

const SafeLayout = ({ children }: { children: React.ReactNode }) => {
  return <SafeArea>{children}</SafeArea>;
};

export default SafeLayout;
