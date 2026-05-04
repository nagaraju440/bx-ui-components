import type { NextRouter } from "next/router";
import { create } from "zustand";

interface NavigationStore {
  url: string;
  setUrl: (url: string) => void;
  routeChangeModalOpen: boolean;
  setRouteChangeModalOpen: (open: boolean) => void;
  conditionalNavigate: (url: string, router: NextRouter) => void;
}

export const navigationStore = create<NavigationStore>((set) => ({
  url: "",
  setUrl: (url) => set({ url }),
  routeChangeModalOpen: false,
  setRouteChangeModalOpen: (open) => set({ routeChangeModalOpen: open }),
  conditionalNavigate: (url, router) => {
    set({ url, routeChangeModalOpen: true });
    router.events.emit("routeChangeError");
    throw new Error("Route change aborted. User confirmation required.");
  }
}));
