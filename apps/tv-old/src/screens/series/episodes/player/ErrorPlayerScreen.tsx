import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Text } from 'react-native-paper';

import { darkStyle } from '../../../../styles/darkMode.style';
import { maxHeight, maxWidth } from '../../../../components/maxDimensions';
import { fontStyles, globalStyle } from '../../../../styles/global.style';
import { WatchErrorScreenProps } from '../../../../routes/main';

const ErrorPlayerScreen = ({ route }: WatchErrorScreenProps) => {
  const { playerName, animeTitle } = route.params;
  //TODO styling for this page
  return (
    <SafeAreaView style={[styles.container]}>
      <Text
        variant="headlineLarge"
        style={[darkStyle.font, globalStyle.spacer, fontStyles.warning]}>
        Source {playerName} is not yet implemented!
      </Text>
      <Text
        variant="titleLarge"
        style={[darkStyle.font, globalStyle.spacer, styles.description]}>
        To watch video from this source on your tv, please scan QR code or open
        AniWatchTV mobile app, select this source and use built in cast to
        Chromecast feature if available
      </Text>
      <QRCode
        size={maxHeight() / 3}
        quietZone={10}
        value={`aniwatch://browse/${encodeURI(animeTitle)}?source=anilist&id=`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: maxWidth(),
    height: maxHeight(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    textAlign: 'center',
  },
});

export default ErrorPlayerScreen;
