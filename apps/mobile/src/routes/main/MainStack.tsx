import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NativeVideoPlayerScreen from '../../screens/series/episodes/player/VideoPlayerScreen';
import SeriesScreen from '../../screens/series/SeriesScreen';
import EpisodesListScreen from '../../screens/series/episodes/EpisodesListScreen';
import WebViewPlayerScreen from '../../screens/series/episodes/player/WebViewPlayerScreen';
import ErrorPlayerScreen from '../../screens/series/episodes/player/ErrorPlayerScreen';
import { RootStackParamList, ScreenNames } from './interfaces';
import SearchResultsScreen from '../../screens/search/SearchResultsScreen';
import { useTranslate } from '../../i18n/useTranslate';
import { BottomTabNavigation } from './BottomTabNavigation';

export const defaultSubHeaderOptions = ({ title }: { title?: string }) => {
  return {
    title: title,
  };
};

const StackAuthorized = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  const { translate } = useTranslate();

  return (
    <StackAuthorized.Navigator initialRouteName={ScreenNames.Browse}>
      <StackAuthorized.Screen
        name={ScreenNames.HomeDrawer}
        component={BottomTabNavigation}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
      <StackAuthorized.Screen
        name={ScreenNames.SearchResults}
        component={SearchResultsScreen}
        options={{
          ...defaultSubHeaderOptions({ title: ScreenNames.SearchResults }),
          animation: 'slide_from_right',
        }}
      />
      <StackAuthorized.Screen
        name={ScreenNames.Series}
        component={SeriesScreen}
        options={({ route }: any) => ({
          ...defaultSubHeaderOptions({ title: route.params.title }),
          animation: 'slide_from_right',
        })}
      />
      <StackAuthorized.Screen
        name={ScreenNames.Episodes}
        component={EpisodesListScreen}
        options={({ route }: any) => ({
          ...defaultSubHeaderOptions({
            title: `${translate('routes.' + ScreenNames.Episodes)}: ${
              route.params.title
            }`,
          }),
          animation: 'slide_from_right',
        })}
      />
      <StackAuthorized.Screen
        name={ScreenNames.WatchNative}
        component={NativeVideoPlayerScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
      <StackAuthorized.Screen
        name={ScreenNames.WatchWebView}
        component={WebViewPlayerScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
      <StackAuthorized.Screen
        name={ScreenNames.WatchError}
        component={ErrorPlayerScreen}
        options={{
          ...defaultSubHeaderOptions({ title: 'Go To App' }),
          animation: 'slide_from_right',
        }}
      />
    </StackAuthorized.Navigator>
  );
};

export default MainStack;
