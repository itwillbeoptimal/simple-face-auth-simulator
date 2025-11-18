import { LogBox } from 'react-native';
import { Provider as JotaiProvider } from 'jotai';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { queryClient } from '@/utils/queryClient';
import { store } from '@/store';
import theme from '@/styles/theme';
import RootNavigator from '@/components/RootNavigator';

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <JotaiProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <NavigationContainer>
            <ThemeProvider theme={theme}>
              <RootNavigator />
            </ThemeProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </JotaiProvider>
  );
};

export default App;
