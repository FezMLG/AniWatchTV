import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActionType } from '../../enums';

export enum ScreenNames {
  Settings = 'Settings',
  SettingsStack = 'SettingsStack',
  Browse = 'Browse',
  Search = 'Search',
  HomeDrawer = 'HomeDrawer',
  SearchResults = 'SearchResults',
  Series = 'Series',
  WatchNative = 'WatchNative',
  WatchError = 'WatchError',
  Episodes = 'Episodes',
  ActionConfirm = 'ActionConfirm',
}

export type RootStackParamList = {
  [ScreenNames.Settings]: undefined;
  [ScreenNames.SettingsStack]: undefined;
  [ScreenNames.ActionConfirm]: { action: () => void; type: ActionType };
  [ScreenNames.Browse]: undefined;
  [ScreenNames.Search]: undefined;
  [ScreenNames.HomeDrawer]: undefined;
  [ScreenNames.SearchResults]: { phrase?: string };
  [ScreenNames.Series]: { title: string; id: number };
  [ScreenNames.Episodes]: {
    title: string;
    numOfAiredEpisodes: number;
    posterUrl: string;
  };
  [ScreenNames.WatchNative]: {
    uri: string;
    title: string;
    episodeTitle: string;
    player: string;
  };
  [ScreenNames.WatchError]: { playerName: string; animeTitle: string };
};

export type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Settings
>;
export type SettingsStackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.SettingsStack
>;
export type ActionConfirmScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.ActionConfirm
>;
export type BrowseScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Browse
>;
export type SearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Search
>;
export type HomeDrawerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.HomeDrawer
>;
export type SearchResultsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.SearchResults
>;
export type SeriesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Series
>;
export type EpisodesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Episodes
>;
export type WatchNativeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.WatchNative
>;
export type WatchErrorScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.WatchError
>;
