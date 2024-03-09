import { AnimeDetails, AnimeSource } from '@naikamu/shared';
import { useQuery } from '@tanstack/react-query';

import { useActiveSeriesStore } from '../../../services';
import { APIClient } from '../../APIClient';

export const useQuerySeriesDetails = (id: number | string) => {
  const apiClient = new APIClient();
  const store = useActiveSeriesStore(state => state.actions);

  const source =
    typeof id === 'string' ? AnimeSource.Local : AnimeSource.AniList;

  const { data, isError, isLoading, refetch } = useQuery<AnimeDetails>(
    ['anime', id, 'details'],
    async () => {
      const result = await apiClient.getAnimeDetails(id, source);

      store.setActiveSeries({
        id: result.id,
        title: result.title.romaji,
        episodeLength: result.duration,
        numOfAiredEpisodes: result.nextAiringEpisode?.episode
          ? result.nextAiringEpisode?.episode - 1
          : result.episodes ?? 12,
        posterUrl: result.coverImage.large,
        nextAiringEpisode: result.nextAiringEpisode,
      });

      return result;
    },
  );

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};
