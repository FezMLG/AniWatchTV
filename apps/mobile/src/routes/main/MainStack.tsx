import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import NativeVideoPlayerScreen from '../../screens/series/episodes/player/VideoPlayerScreen';
import SeriesScreen from '../../screens/series/SeriesScreen';
import EpisodesListScreen from '../../screens/series/episodes/EpisodesListScreen';
import { RootStackParamList, ScreenNames } from './interfaces';
import SearchResultsScreen from '../../screens/search/SearchResultsScreen';
import { useTranslate } from '../../i18n/useTranslate';
import { BottomTabNavigation } from './BottomTabNavigation';

export const defaultSubHeaderOptions = ({
  title,
}: {
  title?: string;
}): NativeStackNavigationOptions => {
  return {
    title: title,
    animation: 'slide_from_right',
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
        }}
      />
      <StackAuthorized.Screen
        name={ScreenNames.Series}
        component={SeriesScreen}
        options={({ navigation }) => ({
          ...defaultSubHeaderOptions({}),
          headerLeft: () => (
            <Icon
              name="chevron-left"
              size={30}
              color={'white'}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: 100,
              }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerTransparent: true,
          headerTitle: '',
        })}
      />
      <StackAuthorized.Screen
        name={ScreenNames.Episodes}
        component={EpisodesListScreen}
        options={({ navigation, route }) => ({
          ...defaultSubHeaderOptions({
            title: `${translate('routes.' + ScreenNames.Episodes)}: ${
              route.params.title
            }`,
          }),
          headerLeft: () => (
            <Icon
              name="chevron-left"
              size={30}
              color={'white'}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <StackAuthorized.Screen
        name={ScreenNames.WatchNative}
        component={NativeVideoPlayerScreen}
        options={{
          ...defaultSubHeaderOptions({}),
          headerShown: false,
        }}
      />
    </StackAuthorized.Navigator>
  );
};

export default MainStack;
