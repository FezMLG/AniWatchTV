import RNFS from 'react-native-fs';
import { IOfflineSeries, IOfflineSeriesEpisodes } from './interfaces';
import { offlineFS } from './offline.fs';
import { offlineStorage } from './offline.storage';
import { useDownloadsStore } from './offline.store';

const getAllOfflineSeries = async (): Promise<IOfflineSeries[]> => {
  const series = await offlineStorage.getAllOfflineSeries();
  return series;
};

const addOfflineSeries = async (series: IOfflineSeries) => {
  const exist = await offlineStorage.getOfflineSeries(series.seriesId);
  if (!exist) {
    await offlineStorage.saveOrReplaceOfflineSeries(series);
  }
};

const deleteEpisodeOffline = async (
  seriesId: string,
  episodeNumber: number,
) => {
  const episode = await offlineStorage.getOfflineEpisode(
    seriesId,
    episodeNumber,
  );
  if (!episode) {
    throw new Error('Episode not found');
  }
  if (!episode.pathToFile) {
    throw new Error('Episode not downloaded');
  }
  await offlineFS.deleteFile(episode.pathToFile);
};

const deleteSeriesOffline = async (seriesId: string) => {
  const series = await offlineStorage.getOfflineSeries(seriesId);
  if (!series) {
    throw new Error('Series not found');
  }
  if (!series.episodes) {
    throw new Error('Series not downloaded');
  }
  await Promise.all(
    series.episodes.map(async episode => {
      if (!episode.pathToFile) {
        throw new Error('Episode not downloaded');
      }
      await offlineFS.deleteFile(episode.pathToFile);
    }),
  );
};

export const useOfflineService = () => {
  const jobs = useDownloadsStore(state => state.activeDownloads);
  const actions = useDownloadsStore(state => state.actions);

  return {
    activeDownloads: jobs,
    addOfflineSeries,
    getAllOfflineSeries,
    getOfflineEpisodes: async (seriesId: string) => {
      const series = await offlineStorage.getOfflineSeries(seriesId);
      if (!series) {
        throw new Error('Series not found');
      }
      return series.episodes;
    },
    saveEpisodeOffline: async (
      seriesId: string,
      episode: IOfflineSeriesEpisodes,
      fileUrl: string,
    ) => {
      const series = await offlineStorage.getOfflineSeries(seriesId);
      if (!series) {
        throw new Error('Series not found');
      }

      const beginDownload = async (res: RNFS.DownloadBeginCallbackResult) => {
        console.log('begin download');
        actions.addDownload({
          jobId: res.jobId,
          series,
          episode,
        });
      };

      const progressDownload = async (
        res: RNFS.DownloadProgressCallbackResult,
      ) => {
        console.log(
          'progress download',
          Math.round((res.bytesWritten / res.contentLength) * 100),
        );
        actions.changeProgress(jobId, res.bytesWritten / res.contentLength);
      };

      const [pathToFile, jobId, job] = await offlineFS.startDownloadingFile(
        seriesId,
        episode.number,
        fileUrl,
        beginDownload,
        progressDownload,
      );

      console.log('download started', jobId, pathToFile);

      job.then(async result => {
        actions.removeDownload(jobId);
        episode.size = result.bytesWritten;
        episode.pathToFile = pathToFile;
        series.episodes.push(episode);
        console.log('job done', series);
        await offlineStorage.saveOrReplaceOfflineSeries(series);
      });
    },
    checkIfEpisodeIsDownloaded: async (
      seriesId: string,
      episodeNumber: number,
    ): Promise<boolean> => {
      const series = await offlineStorage.getOfflineSeries(seriesId);
      if (!series) {
        return false;
      }
      const episode = series.episodes.find(e => e.number === episodeNumber);
      return !!episode;
    },
    deleteEpisodeOffline,
    deleteSeriesOffline,
    clearOffline: async () => {
      offlineStorage.clearOffline();
    },
  };
};
