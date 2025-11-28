import { Brewery } from "@/types/brewery";
import { create } from "zustand";
 
interface BreweryState {
    breweries: Brewery[];
    loading: boolean;
    error: null | any;
    page: number;
    fetchBreweries: () => Promise<void>;
}

export const useBreweryStore = create<BreweryState>((set, get) => ({
    breweries: [],
    loading: false,
    error: null,
    page: 1,
    fetchBreweries: async () => {
        const {page, breweries} = get()
        set({loading: true, error: null})
        try{
            const res = await fetch(`https://api.openbrewerydb.org/v1/breweries?per_page=15&page=${page}`)
            const data = await res.json()
            set({
                breweries: [...breweries, ...data]
            })
        } catch(err){
            console.error(err)
        } finally {
            set({loading: false})
        }
    }
}))