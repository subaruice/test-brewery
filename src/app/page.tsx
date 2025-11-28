"use client";
import { useBreweryStore } from "@/stores/breweryStore";
import { useEffect, useState } from "react";

export default function Home() {
    const [count, setCount] = useState(0);
    const { breweries, loading, fetchBreweries } = useBreweryStore();

    useEffect(() => {
        fetchBreweries();
    }, []);

    return (
        <div className="flex gap-5 flex-col min-h-screen items-center text-white  p-5 bg-black/90 ">
            <div className="flex w-full justify-evenly items-center">
                <p className="py-3 px-5  rounded-lg border-2 text-2xl font-semibold border-white/20">Breweries</p>
                <p className="py-3 px-5  rounded-lg border-2 text-2xl font-semibold border-white/20">
                    Selected count: {count}
                </p>
            </div>
            {loading ? (
                <p className="w-full h-full text-3xl text-center">Loading...</p>
            ) : (
                <div className="rounded-lg p-5 border-2 border-white/20 flex flex-col gap-3">
                    {breweries.map((brew) => (
                        <div key={brew.id} className="flex gap-5 items-center rounded-lg p-5 border border-white/10">
                            <p>{brew.name}</p>
                            <p>{brew.city}</p>
                            <p>{brew.state}</p>
                            <p>{brew.country}</p>
                            <p>{brew.phone}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
