import React, { useRef, useState } from 'react';

import { AnimeEpisode } from '@naikamu/shared';
import {
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  Text,
  View,
  Pressable,
} from 'react-native';

import { useQuerySeriesEpisodes } from '../../api/hooks';
import { Episode, PageLayout } from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import { SeriesStackEpisodeScreenProps } from '../../routes';
import { useSelectedSeriesStore } from '../../services';
import {
  colors,
  DarkColor,
  darkStyle,
  defaultRadius,
  fontStyles,
  globalStyle,
} from '../../styles';

function sliceIntoChunks<T>(array: T[], chunkSize = 10) {
  const result: T[][] = [];

  for (let index = 0; index < array.length; index += chunkSize) {
    const chunk = array.slice(index, index + chunkSize);

    result.push(chunk);
  }

  return result;
}

export const EpisodeNumber = ({
  items,
  onPress,
}: {
  items: AnimeEpisode[];
  onPress: () => void;
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Pressable
      onBlur={() => setIsFocus(() => false)}
      onFocus={() => {
        setIsFocus(() => true);
      }}
      onPress={onPress}
      style={[
        {
          justifyContent: 'center',
          width: '100%',
          height: 40,
          maxWidth: 200,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'blue',
          backgroundColor: DarkColor.C800,
          borderRadius: defaultRadius,
          paddingHorizontal: 10,
          marginTop: 15,
        },
        isFocus
          ? { borderColor: colors.accent.color }
          : { borderColor: 'transparent' },
      ]}>
      <Text style={[fontStyles.text, colors.textLight]}>
        {items.at(0)?.number} - {items.at(-1)?.number}
      </Text>
    </Pressable>
  );
};

export function EpisodesListScreen({ route }: SeriesStackEpisodeScreenProps) {
  const series = useSelectedSeriesStore(store => store.series);
  const scrollViewRef = useRef<ScrollView>(null);

  const { translate } = useTranslate();
  const {
    data: episodes,
    isError,
    isLoading,
    refetch,
  } = useQuerySeriesEpisodes();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageLayout.Loading isLoading={isLoading} />
      <PageLayout.Error isError={isError} refetch={refetch} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <ScrollView
          style={{
            width: '30%',
          }}>
          <Text>Episodes</Text>
          {episodes
            ? sliceIntoChunks(episodes.episodes).map((item, index) => (
                <EpisodeNumber
                  items={item}
                  key={index}
                  onPress={() => {
                    scrollViewRef.current?.scrollTo({
                      y: ((item.at(0)?.number ?? 1) - 1) * 190,
                      animated: true,
                    });
                  }}
                />
              ))
            : null}
        </ScrollView>
        <ScrollView ref={scrollViewRef} style={styles.scrollView}>
          <Image
            resizeMode="contain"
            source={require('../../assets/logo_docchi.png')}
            style={[styles.logo]}
          />
          {episodes
            ? episodes.episodes.map((episode: AnimeEpisode, index: number) => (
                <Episode
                  episode={episode}
                  isWatched={episode.isWatched}
                  key={index}
                />
              ))
            : null}
          <Text style={[globalStyle.disclaimer, darkStyle.font]}>
            {translate('anime_episodes.disclaimer')}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: '70%',
    marginHorizontal: 10,
  },
  logo: {
    marginTop: 10,
    height: 20,
    width: 75,
    opacity: 0.75,
  },
});
