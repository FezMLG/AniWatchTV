import { create } from 'zustand';
import { User } from '@aniwatch/shared';

interface UserState {
  user: User | null;
  actions: {
    getUser: () => User | null;
    setUser: (userToSet: User | null) => void;
    updateUser: (update: Partial<User>) => void;
  };
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  actions: {
    getUser: () => {
      return get().user;
    },
    setUser: (userToSet: User | null) => {
      set({
        user: userToSet,
      });
    },
    updateUser: (update: Partial<User>) => {
      set(state => ({
        user: {
          ...state.user!,
          ...update,
        },
      }));
    },
  },
}));
