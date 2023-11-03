import React, { useCallback, useEffect, useState } from 'react';

import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import {
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { default as Config } from 'react-native-config';
import semver from 'semver';

import { APIClient } from '../api/APIClient';
import { useQueryApiHealth } from '../api/hooks';
import Logo from '../assets/logo.svg';
import { ActivityIndicator } from '../components';
import { useTranslate } from '../i18n/useTranslate';
import {
  AuthStackAppLoadingScreenProps,
  AuthStackRoutesNames,
} from '../routes';
import {
  fireGetIdToken,
  fireGetNewIdToken,
  useUserService,
  useUserStore,
} from '../services';
import { colors, fontStyles, globalStyle } from '../styles';
import { logger } from '../utils';

export function AppLoadScreen({ navigation }: AuthStackAppLoadingScreenProps) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires,unicorn/prefer-module
  const supportedApiVersion = require('../../package.json').apiVersion;
  const { translate } = useTranslate();
  const [, setLongLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const userService = useUserService();
  const user = useUserStore(state => state.user);
  const [netInfo] = useState<NetInfoState>();

  useEffect(() => {
    checkConnection();
    setTimeout(() => {
      setLongLoading(false);
      setApiError(true);
    }, 15_000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkConnection = useCallback(async () => {
    await NetInfo.fetch().then(async state => {
      logger('NetInfo').info('Connection type', state.type);
      logger('NetInfo').info('Is connected?', state.isConnected);
      if (state.isConnected) {
        handleLoginCheck();

        await apiCheck.refetch();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apiCheck = useQueryApiHealth(async () => {
    const apiClient = new APIClient();
    const data = await apiClient.getApiHealth();

    logger('useQueryApiHealth').warn(data);
    if (semver.satisfies(data.version, supportedApiVersion)) {
      handleLoginCheck();
    } else {
      logger('API Version Check').warn(
        'Wrong version',
        'API',
        data.version,
        'Supported',
        supportedApiVersion,
      );
      navigation.navigate(AuthStackRoutesNames.ActionRequired);
    }

    return data;
  });

  const handleLoginCheck = useCallback(async () => {
    const token = await fireGetIdToken();

    if (token) {
      await fireGetNewIdToken();
      await userService.setLoggedUser();
      logger('handleLoginCheck').info(user);
    } else {
      navigation.navigate(AuthStackRoutesNames.Hello);
    }
  }, [navigation, user, userService]);

  return (
    <SafeAreaView>
      <Logo style={styles.logo} width="90%" />
      <View style={[globalStyle.spacer]} />
      <ActivityIndicator size="large" />
      {apiError && (
        <Pressable
          onPress={() =>
            Linking.openURL('https://github.com/FezMLG/Naikamu/issues')
          }
          style={styles.centerBox}>
          <Text style={[fontStyles.text, colors.error, globalStyle.textCenter]}>
            {translate('welcomeScreen.apiError')}
          </Text>
          <Text
            style={[
              fontStyles.text,
              fontStyles.underline,
              globalStyle.textCenter,
              colors.textLight,
            ]}>
            {translate('welcomeScreen.apiContact')}
          </Text>
        </Pressable>
      )}
      {apiCheck.isError ? (
        <Text style={[fontStyles.text, colors.textLight]}>
          There was an error
          {JSON.stringify(apiCheck.error)}
        </Text>
      ) : null}
      {Config.ENV !== 'production' && (
        <Text style={[fontStyles.text, colors.textLight]}>
          api_url: {Config.API_URL}
          {JSON.stringify(netInfo)}
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    margin: 16,
  },
  logo: {
    alignSelf: 'center',
    width: '90%',
  },
  centerBox: {
    alignItems: 'center',
  },
});