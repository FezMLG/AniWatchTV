import React from 'react';

import {
  DarkTheme as NavigationDarkTheme,
  Theme,
} from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  MD3DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import QueryClientWrap from './api/QueryClientWrap';
import LanguagesProvider from './i18n/LanguagesProvider';
import Routes from './routes/Routes';
import { colors } from './styles';

const CombinedDarkTheme: Theme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: colors.accent.color,
  },
};

function App() {
  return (
    <QueryClientWrap>
      <PaperProvider
        settings={{
          icon: props => <Icon {...props} />,
        }}
        theme={CombinedDarkTheme}>
        <LanguagesProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Routes theme={CombinedDarkTheme} />
          </GestureHandlerRootView>
        </LanguagesProvider>
      </PaperProvider>
    </QueryClientWrap>
  );
}

export default App;
