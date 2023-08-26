import { useQuery } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';

export const useQuerySeriesEpisodes = (
  id: string,
  numberOfAiredEpisodes: number,
) => {
  const apiClient = new APIClient();
  const episodes = useQuery(['anime', id, 'episodes'], () =>
    apiClient.getEpisodes(id, numberOfAiredEpisodes),
  );

  return {
    episodes,
  };
};
