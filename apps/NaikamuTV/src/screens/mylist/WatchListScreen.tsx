import React from 'react';

import { IWatchListSeries } from '@naikamu/shared';
import { useNavigation } from '@react-navigation/native';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient, Stop } from 'react-native-svg';

import { useInfiniteQueryUserWatchList } from '../../api/hooks';
import {
  ActivityIndicator,
  ProgressiveImage,
  SeriesDetails,
  WatchListElement,
} from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import { MyListStackWatchListScreenProps } from '../../routes';
import { useSelectedSeriesStore, useUserService } from '../../services';
import { colors, fontStyles } from '../../styles';
import { maxHeight, maxWidth } from '../../utils';

const numberOfColumns = Math.floor(maxWidth() / 160);

export const WatchListScreen = ({}: MyListStackWatchListScreenProps) => {
  const { translate } = useTranslate();
  const userService = useUserService();
  const selectedSeries = useSelectedSeriesStore(state => state.series);
  const { api } = useInfiniteQueryUserWatchList();
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: IWatchListSeries }) => (
    <WatchListElement
      anime={item}
      // handlePageChange={() => {
      //   navigation.navigate(RootStackScreenNames.SeriesStack, {
      //     screen: SeriesStackScreenNames.Series,
      //     params: {
      //       title: item.title,
      //       id: item.animeId,
      //     },
      //   });
      // }}
    />
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      {/*<Header />*/}
      <View
        style={{
          height: '45%',
          flexDirection: 'row',
          flex: 1,
        }}>
        <View
          style={{
            gap: 15,
            width: '60%',
            flex: 1,
            zIndex: 10,
            marginLeft: 10,
            marginTop: 10,
          }}>
          {/*<Button*/}
          {/*  label={translate('auth.logout')}*/}
          {/*  onPress={() => userService.logoutUser()}*/}
          {/*  type="secondary"*/}
          {/*/>*/}
          <View>
            <SeriesDetails.Title
              romaji={selectedSeries?.title}
              styles={{
                width: '100%',
              }}
            />
            <Text style={[colors.textLight, fontStyles.normal]}>
              project No. 9
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 20,
            }}>
            <Text style={[colors.textLight, fontStyles.normal]}>
              Popularność: 89%
            </Text>
            <Text style={[colors.textLight, fontStyles.normal]}>Zima 2022</Text>
            <Text style={[colors.textLight, fontStyles.normal]}>
              {selectedSeries?.id}
            </Text>
          </View>
          <SeriesDetails.Genres
            genres={['Thriller', 'Action', 'Ecchi', 'Harem']}
          />
        </View>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            right: 0,
            width: '65%',
            height: '100%',
          }}>
          <ProgressiveImage
            resizeMode="cover"
            source={selectedSeries?.poster ?? ''}
            style={{
              zIndex: 1,
              width: '100%',
              height: '100%',
            }}
          />
          <View
            style={{
              zIndex: 5,
              backgroundColor: 'rgba(0,0,0,0.6)',
              width: '30%',
              height: '100%',
              position: 'absolute',
            }}
          />
        </View>
      </View>
      <View style={{ height: '55%' }}>
        <Text
          style={[colors.textLighter, fontStyles.normal, { marginLeft: 10 }]}>
          Your watchlist
        </Text>
        {api.isLoading ? <ActivityIndicator size="large" /> : null}
        {api.data ? (
          <FlatList
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ width: '100%' }}
            contentContainerStyle={[styles.flatListContent]}
            data={api.data.pages.flatMap(page => page.data)}
            keyExtractor={(_, index) => index.toString()}
            numColumns={numberOfColumns}
            onEndReached={() => api.fetchNextPage()}
            onEndReachedThreshold={1}
            onRefresh={api.refetch}
            refreshing={api.isRefetching}
            renderItem={renderItem}
            style={[styles.flatList]}
          />
        ) : (
          <Text style={colors.textLight}>No data</Text>
        )}
      </View>
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
