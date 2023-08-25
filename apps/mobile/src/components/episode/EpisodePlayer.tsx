import React from 'react';

import { AnimePlayer } from '@aniwatch/shared';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { BrowseStackParamList as BrowseStackParameterList } from '../../routes';
import { colors, darkColor } from '../../styles';

import { navigateToPlayer } from './navigateToPlayer';
import { PlayerMenu } from './PlayerMenu';

export function EpisodePlayer({
  seriesId,
  episodeTitle,
  player,
  episodeNumber,
  isDownloaded,
  handleDownload,
}: {
  seriesId: string;
  episodeTitle: string;
  player: AnimePlayer;
  episodeNumber: number;
  isDownloaded: boolean;
  handleDownload: (player: AnimePlayer) => void;
}) {
  const navigation = useNavigation<NavigationProp<BrowseStackParameterList>>();

  return (
    <Pressable
      onPress={() => {
        navigateToPlayer({
          navigation: navigation,
          player: player,
          episodeTitle: episodeTitle,
          episodeNumber,
          seriesId,
        });
      }}
      style={[
        styles.playersListItem,
        player.player_name.toLocaleLowerCase() === 'cda'
          ? { borderColor: colors.accent.color }
          : { height: 50 },
      ]}>
      <View style={styles.rowCenter}>
        {player.player_name.toLocaleLowerCase() === 'cda' ? (
          <Icon
            name="play"
            size={24}
            style={[{ marginHorizontal: 10 }, colors.textLight]}
          />
        ) : (
          <Icon
            name="open-in-new"
            size={24}
            style={[{ marginHorizontal: 10 }, colors.textLight]}
          />
        )}
        <Text style={[colors.textLight]}>
          {player.translator_name +
            ' - ' +
            player.player_name.toLocaleLowerCase()}
        </Text>
      </View>
      <View style={styles.rowCenter}>
        <Image
          resizeMode="contain"
          source={require('../../../assets/logo_docchi.png')}
          style={[styles.logo, { maxWidth: 100 }]}
        />
        {player.player_name.toLocaleLowerCase() === 'cda' ? (
          <>
            {isDownloaded ? null : (
              <Icon
                name={
                  isDownloaded ? 'download-circle' : 'download-circle-outline'
                }
                onPress={() => handleDownload(player)}
                size={24}
                style={[{ paddingHorizontal: 10 }, colors.textLight]}
              />
            )}
          </>
        ) : null}
        <PlayerMenu player={player} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  playersListItem: {
    height: 70,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: darkColor.C800,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: 20,
    opacity: 0.75,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
