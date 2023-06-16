import { create } from 'zustand';

interface EpisodeDownloadJob {
  jobId: number;
  seriesId: string;
  episodeNumber: number;
  progress?: number;
}

interface DownloadsState {
  activeDownloads: EpisodeDownloadJob[];
  actions: {
    addDownload: (job: EpisodeDownloadJob) => void;
    removeDownload: (jobId: number) => void;
    changeProgress: (jobId: number, progress: number) => void;
  };
}

export const useDownloadsStore = create<DownloadsState>(set => ({
  activeDownloads: [],
  actions: {
    addDownload: job => {
      set(state => ({
        activeDownloads: [...state.activeDownloads, job],
      }));
    },
    removeDownload: jobId => {
      set(state => ({
        activeDownloads: state.activeDownloads.filter(
          job => job.jobId !== jobId,
        ),
      }));
    },
    changeProgress: (jobId, progress) => {
      set(state => ({
        activeDownloads: state.activeDownloads.map(job =>
          job.jobId === jobId ? { ...job, progress } : job,
        ),
      }));
    },
  },
}));