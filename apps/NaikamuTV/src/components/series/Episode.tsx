import React, { useState } from 'react';

import { AnimeEpisode, AnimePlayer } from '@naikamu/shared';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useQuerySeriesEpisodePlayers } from '../../api/hooks';
import { useSelectedSeriesStore } from '../../services';
import {
  colors,
  DarkColor,
  darkStyle,
  defaultRadius,
  fontStyles,
} from '../../styles';
import { ProgressiveImage, Selectable } from '../atoms';
import { PageLayout } from '../PageLayout';

import {
  EpisodePlayer,
  EpisodePlayerEmpty,
  EpisodePlayerError,
} from './EpisodePlayer';
import { EpisodeWatchProgress } from './EpisodeWatchProgress';

export function Episode({
  episode,
  isWatched,
}: {
  episode: AnimeEpisode;
  isWatched: boolean;
}) {
  const series = useSelectedSeriesStore(store => store.details)!;

  const { data, refetch, isLoading, isError } = useQuerySeriesEpisodePlayers(
    series.id,
    episode.number,
  );
  const [isSelected, setIsSelected] = useState(false);
  const [episodeWidth, setEpisodeWidth] = useState(0);

  const openDetails = () => {
    setIsSelected(previous => !previous);
    refetch();
  };

  return (
    <View style={[styles.episodeContainer]}>
      <Selectable
        customStyles={[styles.mainContainer]}
        onLayout={event => setEpisodeWidth(event.nativeEvent.layout.width)}
        onPress={openDetails}>
        <ProgressiveImage
          source={episode.poster_url ?? series.coverImage.extraLarge}
          style={{
            width: '40%',
            height: '100%',
          }}
        />
        <View style={styles.detailsContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={[fontStyles.headerSmall, colors.textLight]}>
              {episode.number + '. ' + episode.title}
            </Text>
            <Icon
              color={colors.textLight.color}
              name={isWatched ? 'check-circle' : 'check-circle-outline'}
              size={fontStyles.header.fontSize}
            />
          </View>
          <Text numberOfLines={2} style={[fontStyles.label, colors.textLight]}>
            {series.duration} min
          </Text>
          {episode.description ? (
            <Text numberOfLines={4} style={[darkStyle.font, fontStyles.text]}>
              {episode.description}
            </Text>
          ) : null}
          <Icon
            color={colors.textLight.color}
            name={isSelected ? 'chevron-down' : 'chevron-up'}
            size={fontStyles.header.fontSize}
            style={{
              alignSelf: 'flex-end',
            }}
          />
        </View>
      </Selectable>
      <EpisodeWatchProgress
        episodeNumber={episode.number}
        width={episodeWidth}
      />
      {isSelected ? (
        <View style={styles.playersListContainer}>
          {isError ? <EpisodePlayerError /> : null}
          <PageLayout.Loading isLoading={isLoading} />
          {data ? (
            data.players.length > 0 ? (
              <>
                {data.players
                  .filter(player => player.playerType === 'native')
                  .map((player: AnimePlayer, index: number) => (
                    <EpisodePlayer
                      episodeNumber={episode.number}
                      episodeTitle={'E' + episode.number + ' ' + episode.title}
                      key={player.playerType + index}
                      player={player}
                    />
                  ))}
              </>
            ) : (
              <EpisodePlayerEmpty />
            )
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  episodeContainer: {
    marginVertical: 16,
    width: '100%',
    maxWidth: 550,
  },
  mainContainer: {
    width: '100%',
    height: 150,
    flex: 1,
    borderColor: DarkColor.C700,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: defaultRadius,
    flexDirection: 'row',
  },
  detailsContainer: {
    width: '60%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  playersListContainer: {
    width: '100%',
    marginTop: 20,
    gap: 10,
  },
});
