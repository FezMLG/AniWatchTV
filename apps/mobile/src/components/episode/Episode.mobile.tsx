import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, List, Text } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { AnimeEpisode, AnimePlayer, AnimePlayers } from '@aniwatch/shared';

import { darkColor, darkStyle } from '../../styles/darkMode.style';
import { mainEpisodeStyles, navigateToPlayer } from './Episode';
import { defaultRadius } from '../../styles/global.style';
import { PlayerMenu } from './PlayerMenu';
import { useTranslate } from '../../i18n/useTranslate';
import { UpdateEpisodeWatchStatus } from '../molecules';
import { useQuerySeriesEpisodePlayers } from '../../api/hooks';
import { RootStackParamList } from '../../routes/main';

export const EpisodeMobileLink = ({
  animeName,
  episodeTitle,
  players,
}: {
  animeName: string;
  episodeTitle: string;
  players: AnimePlayers;
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <>
      {players.players.map((player: AnimePlayer, index: number) => {
        // TODO on long press user can choose if he want to open in webview or open external browser (mobile only)
        return (
          <List.Item
            key={index}
            title={player.translator_name + ' ' + player.player_name}
            onPress={async () => {
              await navigateToPlayer({
                navigation: navigation,
                player: player,
                episodeTitle: episodeTitle,
                animeTitle: animeName,
                episodeNumber: players.episode_number,
              });
            }}
            right={() => <PlayerMenu player={player} />}
          />
        );
      })}
    </>
  );
};

export const EpisodeMobile = ({
  num,
  episode,
  posterUrl,
  id,
  animeName,
  isWatched,
}: {
  num: number;
  episode: AnimeEpisode;
  posterUrl: string;
  id: string;
  animeName: string;
  isWatched: boolean;
}) => {
  const { translate } = useTranslate();
  const { data, refetch } = useQuerySeriesEpisodePlayers(id, num);

  return (
    <SafeAreaView style={[styles.episodeContainerMobile]}>
      <View style={[styles.card, darkStyle.card]}>
        <Image
          style={[styles.poster, styles.borderRadius]}
          source={{ uri: episode.poster_url ?? posterUrl }}
        />
        <View style={styles.titleRow}>
          <Text
            variant="titleLarge"
            accessible={false}
            numberOfLines={2}
            style={[styles.title, darkStyle.font]}>
            {num + '. ' + episode.title}
          </Text>
          <UpdateEpisodeWatchStatus
            animeId={id}
            isWatched={isWatched}
            episode={episode.number}
          />
        </View>
        <Text
          variant="bodyMedium"
          accessible={false}
          style={[styles.description, darkStyle.font]}>
          {episode.description}
        </Text>
        <List.Accordion
          title={translate('anime_episodes.available_players')}
          left={props => <List.Icon {...props} icon="folder" />}
          onPress={() => refetch()}
          style={styles.playersList}>
          {data ? (
            <EpisodeMobileLink
              animeName={animeName}
              players={data}
              episodeTitle={'E' + episode.number + ' ' + episode.title}
            />
          ) : (
            <ActivityIndicator size="large" />
          )}
        </List.Accordion>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...mainEpisodeStyles,
  episodeContainerMobile: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    marginVertical: 10,
  },
  description: {
    width: '100%',
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  borderRadius: {
    borderTopRightRadius: defaultRadius,
    borderTopLeftRadius: defaultRadius,
  },
  playersList: {
    backgroundColor: darkColor.C900,
    borderBottomRightRadius: defaultRadius,
    borderBottomLeftRadius: defaultRadius,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 45,
  },
  title: {
    ...mainEpisodeStyles.title,
    width: 'auto',
    maxWidth: 300,
  },
});
