import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCommonStore = create(
  persist(
    (set) => ({
      tabId: 0,
      openForm: null, // "task" | "edit" | "call" | null
      setOpenForm: (formName) => set({ openForm: formName }),
      clearOpenForm: () => set({ openForm: null }), // close
      setTabId: (tabId) => set({ tabId }),
    }),
    {
      name: "common-store",
      partialize: (state) => ({
        tabId: state.tabId,
      }),
    }
  )
);

export default useCommonStore;
