import React, { useState } from 'react';

import { IWatchListSeries } from '@naikamu/shared';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// import { useTranslate } from '../../i18n/useTranslate';
import { useSelectedSeriesStore } from '../../services';
import { colors, darkStyle, defaultRadius } from '../../styles';
import { maxHeight } from '../../utils';
import { ProgressiveImage } from '../atoms';

export function WatchListElement({
  anime, // handlePageChange,
}: {
  anime: IWatchListSeries;
  // handlePageChange: ((event: GestureResponderEvent) => void) | null | undefined;
}) {
  const [isFocus, setIsFocus] = useState(false);
  const [textHeight, setTextHeight] = useState(140);
  const selectedSeriesService = useSelectedSeriesStore(state => state.actions);
  // const { translate } = useTranslate();

  return (
    <TouchableOpacity
      activeOpacity={1}
      key={anime.id}
      onBlur={() => setIsFocus(previous => !previous)}
      onFocus={() => {
        setIsFocus(previous => !previous);
        selectedSeriesService.setSeries(anime);
      }}
      // onPress={handlePageChange}
      style={[
        styles.container,
        isFocus
          ? { borderColor: colors.accent.color }
          : { borderColor: 'transparent' },
      ]}>
      <View style={[styles.poster, { backgroundColor: '#000000' }]}>
        <ProgressiveImage source={anime.poster} style={styles.poster} />
      </View>
      {isFocus ? null : (
        <View
          onLayout={event => setTextHeight(event.nativeEvent.layout.height)}
          style={[styles.titleContainer, { bottom: textHeight }]}>
          <Text numberOfLines={4} style={[darkStyle.font, styles.title]}>
            {anime.title}
          </Text>
          {/*<Text*/}
          {/*  numberOfLines={1}*/}
          {/*  style={[{ color: '#FFFFFF' }, styles.subTitle]}>*/}
          {/*  {anime.studios[0]?.name ?? ''}*/}
          {/*</Text>*/}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: maxHeight() / 2 - 50,
    maxWidth: 150,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: defaultRadius,
    margin: 5,
    marginTop: 0,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: defaultRadius - 2,
    resizeMode: 'cover',
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  subTitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
  },
  titleContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'relative',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderBottomStartRadius: defaultRadius - 2,
    borderBottomEndRadius: defaultRadius - 2,
  },
});
