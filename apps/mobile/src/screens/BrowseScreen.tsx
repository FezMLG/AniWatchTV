import React from 'react';

import { IAnimeListItem } from '@naikamu/shared';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useQuerySeriesList } from '../api/hooks';
import {
  SeasonYearSelectButtons,
  BrowseElement,
  PageLayout,
  useLayout,
} from '../components';
import { useAnimatedHeader } from '../components/atoms/Animated';
import {
  BrowseStackBrowseScreenProps,
  RootStackScreenNames,
  SeriesStackScreenNames,
} from '../routes';
import { colors } from '../styles';

const headerHeight = 60;

export function BrowseScreen({}: BrowseStackBrowseScreenProps) {
  const layout = useLayout();
  const navigation = useNavigation<any>();
  const { api, currentSeason, season, year, setSeason, setYear } =
    useQuerySeriesList();
  const tabHeight = useBottomTabBarHeight();

  const { scrollHandler, animatedStyle } = useAnimatedHeader(headerHeight);

  const renderItem = ({ item }: { item: IAnimeListItem }) => (
    <BrowseElement
      anime={item}
      handlePageChange={() => {
        navigation.navigate(RootStackScreenNames.SeriesStack, {
          screen: SeriesStackScreenNames.Series,
          params: {
            title: item.title.romaji,
            id: item.id,
          },
        });
      }}
    />
  );

  return (
    <PageLayout.Default style={[styles.container]} {...layout}>
      <SeasonYearSelectButtons
        currentSeason={currentSeason}
        season={season}
        setSeason={setSeason}
        setYear={setYear}
        transform={animatedStyle}
        year={year}
      />
      <PageLayout.Loading isLoading={api.isLoading} />
      <PageLayout.Error isError={api.isError} refetch={api.refetch} />
      {api.data ? (
        <Animated.FlatList
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{ height: tabHeight * 2, width: '100%' }}
          contentContainerStyle={[styles.flatListContent]}
          contentInsetAdjustmentBehavior="automatic"
          data={api.data.pages.flatMap(page => page.data)}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          onEndReached={() => api.fetchNextPage()}
          onEndReachedThreshold={1}
          onRefresh={api.refetch}
          onScroll={scrollHandler}
          refreshing={api.isRefetching}
          renderItem={renderItem}
          scrollEventThrottle={16}
          style={[styles.flatList]}
        />
      ) : null}
    </PageLayout.Default>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background.color,
    marginHorizontal: 0,
  },
  flatList: {},
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
    backgroundColor: colors.accent.color,
  },
  flatListContent: {
    flexGrow: 1,
    marginTop: headerHeight,
  },
});
