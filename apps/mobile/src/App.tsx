import React from 'react';

import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import {
  MD3DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import QueryClientWrap from './api/QueryClientWrap';
import LanguagesProvider from './i18n/LanguagesProvider';
import Routes from './routes/Routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const CombinedDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: { ...NavigationDarkTheme.colors, ...PaperDarkTheme.colors },
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
