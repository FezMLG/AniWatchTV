import React from 'react';

import { Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';

import { Button } from '../components';
import { useTranslate } from '../i18n/useTranslate';
import { AuthStackActionRequiredScreenProps } from '../routes';
import { colors, fontStyles, globalStyle } from '../styles';

export function ActionRequiredScreen({
  navigation,
}: AuthStackActionRequiredScreenProps) {
  const appVersion = require('../../package.json').version;
  const { translate } = useTranslate();

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      }),
    [navigation],
  );

  return (
    <SafeAreaView style={[styles.container]}>
      <View>
        <Text style={[colors.textLight, fontStyles.screenHeader]}>
          {translate('important.requireAppUpdate.title')}
        </Text>
        <View style={[globalStyle.spacer]} />
        <Text style={[colors.textLight, fontStyles.headerSmall]}>
          {translate('important.requireAppUpdate.message')}
        </Text>
      </View>
      <View>
        <Button
          icon="open-in-new"
          label={translate('important.requireAppUpdate.action')}
          onPress={() =>
            Linking.openURL('https://github.com/FezMLG/AniWatch/releases')
          }
          type="primary"
        />
        <Button
          label={translate('important.requireAppUpdate.actionAlt')}
          onPress={() =>
            Linking.openURL('https://github.com/FezMLG/AniWatch/issues')
          }
          type="link"
        />
        <View style={globalStyle.spacerSmall} />
        <Text style={[globalStyle.textCenter]}>
          app ver.: {appVersion} / {Config.ENV}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
  },
  buttons: {
    margin: 16,
  },
  logo: {
    maxWidth: 200,
    maxHeight: 200,
  },
  centerBox: {
    alignItems: 'center',
  },
});
