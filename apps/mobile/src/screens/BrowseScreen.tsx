import React, { useRef, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB } from 'react-native-paper';

import { Media } from '@aniwatch/shared';

import BrowseElement from '../components/browse/BrowseElement';
import { SeasonYearSelectButtons } from '../components';
import { useQuerySeriesList } from '../api/hooks';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { colors } from '../styles';
import {
  BrowseStackBrowseScreenProps,
  BrowseStackScreenNames,
  RootStackScreenNames,
  SeriesStackScreenNames,
} from '../routes';
import { useNavigation } from '@react-navigation/native';

export const BrowseScreen = ({}: BrowseStackBrowseScreenProps) => {
  const CONTENT_OFFSET_THRESHOLD = 300;
  const navigation = useNavigation<any>();
  const listRef = useRef<FlatList>(null);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const { api, season, year, setSeason, setYear } = useQuerySeriesList();
  const tabHeight = useBottomTabBarHeight();

  const renderItem = ({ item }: { item: Media }) => (
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
    <SafeAreaView style={[styles.container]}>
      <SeasonYearSelectButtons
        season={season}
        setSeason={setSeason}
        year={year}
        setYear={setYear}
      />
      {api.isLoading ? <ActivityIndicator size="large" /> : null}
      {api.data ? (
        <View>
          <FlatList
            contentInsetAdjustmentBehavior="automatic"
            style={[styles.flatList]}
            ref={listRef}
            data={api.data.pages.map(page => page.Page.media).flat()}
            renderItem={renderItem}
            numColumns={2}
            contentContainerStyle={[styles.flatListContent]}
            keyExtractor={(_, index) => index.toString()}
            onEndReachedThreshold={1}
            refreshing={api.isRefetching}
            onRefresh={api.refetch}
            onEndReached={() => api.fetchNextPage()}
            onScroll={event => {
              setContentVerticalOffset(event.nativeEvent.contentOffset.y);
            }}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ height: tabHeight * 2, width: '100%' }}
          />
          {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
            <FAB
              icon={'arrow-up-circle'}
              style={styles.fab}
              color="white"
              onPress={() => {
                listRef.current?.scrollToOffset({ offset: 0, animated: true });
              }}
            />
          )}
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background.color,
    marginHorizontal: 0,
  },
  flatList: {
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
    backgroundColor: colors.accent.color,
  },
  flatListContent: {
    flexGrow: 1,
  },
});
