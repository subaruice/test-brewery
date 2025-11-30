import { Brewery } from "@/types/brewery";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type MouseEvent } from "react";

const PAGE_SIZE = 15;
const VISIBLE_COUNT = 5;

export interface BreweryState {
    breweries: Brewery[];
    rendered: Brewery[];
    loading: boolean;
    error: null | any;
    currentPage: number;
    selectedIDs: string[];
    renderedStart: number;
    fetchBreweries: () => Promise<void>;
    toggleRClick: (e: MouseEvent, brew: Brewery) => void;
    deleteIDs: () => void;
    lazyLoading: () => void;
    updateRendered: () => void;
    scrollPrev: () => void;
    scrollNext: () => void;
}

export const useBreweryStore = create<BreweryState>(
    devtools((set, get) => ({
        breweries: [],
        rendered: [],
        loading: false,
        error: null,
        currentPage: 0,
        selectedIDs: [],
        renderedStart: 0,
        lazyLoading: () => {},
        fetchBreweries: async () => {
            if (get().loading) {
                return;
            }
            const nextPage = get().currentPage + 1;
            set({ loading: true, error: null });
            try {
                const res = await fetch(`https://api.openbrewerydb.org/v1/breweries?per_page=15&page=${nextPage}`, {
                    cache: "no-store",
                });

                const data = await res.json();

                set((s) => ({
                    breweries: [...s.breweries, ...data],
                    currentPage: nextPage,
                }));

                get().updateRendered();
            } catch (err) {
                console.error(err);
                set({ error: err });
            } finally {
                set({ loading: false });
            }
        },
        toggleRClick: (e, brew) => {
            set((s) => {
                e.preventDefault();
                const exist = s.selectedIDs.some((index) => index === brew.id);
                return {
                    selectedIDs: exist ? s.selectedIDs.filter((id) => id !== brew.id) : [...s.selectedIDs, brew.id],
                };
            });
        },
        deleteIDs: () => {
            set((s) => {
                return {
                    breweries: s.breweries.filter((brew) => !s.selectedIDs.some((id) => brew.id === id)),
                    selectedIDs: [],
                };
            });
            get().updateRendered();
        },
        updateRendered: () => {
            const s = get();

            if (s.breweries.length < PAGE_SIZE) {
                get().fetchBreweries();
                return;
            }

            set({
                rendered: s.breweries.slice(s.renderedStart, s.renderedStart + PAGE_SIZE),
            });
        },

        scrollNext: () => {
            const s = get();
            const nextStart = s.renderedStart + VISIBLE_COUNT;
            set({ renderedStart: nextStart });
            get().updateRendered();

            if (nextStart + PAGE_SIZE > s.breweries.length) {
                get().fetchBreweries();
            }
        },

        scrollPrev: () => {
            const s = get();
            const prevStart = Math.max(0, s.renderedStart - VISIBLE_COUNT);
            set({ renderedStart: prevStart });
            get().updateRendered();
        },
    }))
);
