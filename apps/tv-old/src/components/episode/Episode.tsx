import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Linking, StyleSheet } from 'react-native';

import { RootStackParamList, ScreenNames } from '../../routes/main';
import { AnimePlayer } from '@aniwatch/shared';
import { darkColor, darkStyle } from '../../styles/darkMode.style';

export const navigateToPlayer = async ({
  navigation,
  player,
  episodeTitle,
  animeTitle,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    ScreenNames.Episodes,
    undefined
  >;
  player: AnimePlayer;
  episodeTitle: string;
  animeTitle: string;
}) => {
  const name = player.player_name
    .replace(/[\u0250-\ue007]/g, '')
    .replace(/\s/g, '')
    .toLowerCase();

  switch (name) {
    case 'cda':
      return navigation.navigate(ScreenNames.WatchNative, {
        uri: player.player_link,
        title: animeTitle,
        episodeTitle: episodeTitle,
        player: name,
      });

    case 'pobierz':
      await Linking.canOpenURL(player.player_link);
      return Linking.openURL(player.player_link);

    default:
      return navigation.navigate(ScreenNames.WatchError, {
        playerName: name,
        animeTitle: animeTitle,
      });
  }
};

export const mainEpisodeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  poster: {
    height: 300,
  },
  title: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: darkStyle.card.backgroundColor,
    minHeight: 350,
    maxWidth: '100%',
    width: 550,
  },
  episodeContainer: {
    flex: 1,
    maxWidth: 700,
    maxHeight: 550,
    flexDirection: 'row',
    marginVertical: 10,
  },
  linksContainer: {
    width: '100%',
    height: '100%',
    maxWidth: 150,
    backgroundColor: darkColor.C800,
  },
  description: {
    width: '100%',
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
    maxHeight: 100,
  },
});
