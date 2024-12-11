import { useState } from 'react';

import { IAnimeListItem, Paginate } from '@naikamu/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getAnimeSeason } from '../../../utils';
import { apiClient } from '../../APIClient';

export const useQuerySeriesList = () => {
  const [currentSeason] = useState(getAnimeSeason());
  const [season, setSeason] = useState(getAnimeSeason());
  const [year, setYear] = useState(new Date().getFullYear());

  const { isLoading, isError, data, refetch, fetchNextPage, isRefetching } =
    useInfiniteQuery<Paginate<IAnimeListItem[]>>(
      ['browse', season, year],
      ({ pageParam }) =>
        apiClient.getAnimeList({
          page: pageParam,
          season: season.value,
          seasonYear: year,
        }),
      {
        getNextPageParam: lastPage => lastPage.pageInfo.currentPage + 1,
      },
    );

  return {
    api: {
      isLoading,
      isError,
      data,
      refetch,
      fetchNextPage,
      isRefetching,
    },
    currentSeason,
    season,
    year,
    setSeason,
    setYear,
  };
};
