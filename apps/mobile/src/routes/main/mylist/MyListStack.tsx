import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useTranslate } from '../../../i18n/useTranslate';
import { colors } from '../../../styles';

import {
  MyListStackParamList as MyListStackParameterList,
  MyListStackScreenNames,
} from './interface';
import { DownloadStack } from './offline';

const Tab = createMaterialTopTabNavigator<MyListStackParameterList>();

export function MyListStack() {
  const { translate } = useTranslate();

  return (
    <Tab.Navigator
      initialRouteName={MyListStackScreenNames.OfflineStack}
      screenOptions={{
        tabBarStyle: { backgroundColor: 'transparent' },
        tabBarIndicatorStyle: { backgroundColor: colors.accent.color },
      }}>
      <Tab.Screen
        component={DownloadStack}
        name={MyListStackScreenNames.OfflineStack}
        options={{
          title: translate('routes.' + MyListStackScreenNames.OfflineStack),
        }}
      />
    </Tab.Navigator>
  );
}