import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SettingsState {
  savePortainerUrl: boolean;
  savedUrl: string;

  setSavePortainerUrl: (value: boolean) => void;
  setSavedUrl: (url: string) => void;
  clearSavedUrl: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      savePortainerUrl: false,
      savedUrl: "",

      setSavePortainerUrl: (value: boolean) => {
        set({ savePortainerUrl: value });
        if (!value) {
          set({ savedUrl: "" });
        }
      },

      setSavedUrl: (url: string) => {
        set({ savedUrl: url });
      },

      clearSavedUrl: () => {
        set({ savedUrl: "" });
      },
    }),
    {
      name: "app-settings",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        savePortainerUrl: state.savePortainerUrl,
        savedUrl: state.savedUrl,
      }),
    }
  )
);
