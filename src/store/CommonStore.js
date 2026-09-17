import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Clean up legacy localStorage entry so it does not persist across browser sessions
try {
  localStorage.removeItem("common-store");
} catch (_) {}

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
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        tabId: state.tabId,
      }),
    }
  )
);

export default useCommonStore;
