import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTranslate } from '../../i18n/useTranslate';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import SettingsActionConfirmScreen from '../../screens/settings/ActionConfirmScreen';
import {
  SettingsScreenNames,
  SettingsScreenProps,
  SettingsStackParamList,
} from './interfaces';
import UserSettingsScreen from '../../screens/settings/UserSettingsScreen';
import { defaultHeaderOptions } from '../main/BottomTabNavigation';
import AppSettingsScreen from '../../screens/settings/AppSettings';
import SettingsActionScreen from '../../screens/settings/ActionScreen';
import { defaultSubHeaderOptions } from '../main';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsStack = () => {
  const { translate } = useTranslate();

  return (
    <Stack.Navigator initialRouteName={SettingsScreenNames.Settings}>
      <Stack.Screen
        name={SettingsScreenNames.Settings}
        component={SettingsScreen}
        options={({}: SettingsScreenProps) => ({
          ...defaultHeaderOptions({
            title: translate('settings.' + SettingsScreenNames.Settings),
          }),
          animation: 'slide_from_right',
        })}
      />
      <Stack.Screen
        name={SettingsScreenNames.UserSettings}
        component={UserSettingsScreen}
        options={() => ({
          ...defaultSubHeaderOptions({
            title: translate('settings.' + SettingsScreenNames.Settings),
          }),
          animation: 'slide_from_right',
        })}
      />
      <Stack.Screen
        name={SettingsScreenNames.AppSettings}
        component={AppSettingsScreen}
        options={() => ({
          ...defaultSubHeaderOptions({
            title: translate('settings.' + SettingsScreenNames.Settings),
          }),
          animation: 'slide_from_right',
        })}
      />
      <Stack.Screen
        name={SettingsScreenNames.SettingsActionConfirm}
        component={SettingsActionConfirmScreen}
        options={{
          ...defaultSubHeaderOptions({
            title: translate(
              'settings.categories.' +
                SettingsScreenNames.SettingsActionConfirm,
            ),
          }),
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name={SettingsScreenNames.SettingsAction}
        component={SettingsActionScreen}
        options={{
          ...defaultSubHeaderOptions({
            title: translate(
              'settings.categories.' + SettingsScreenNames.SettingsAction,
            ),
          }),
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
