"use client";
import { useBreweryStore } from "@/stores/breweryStore";
import Button from "@/UI/Button";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
    const { rendered, scrollNext, scrollPrev, loading, fetchBreweries, toggleRClick, selectedIDs, deleteIDs } =
        useBreweryStore();

    useEffect(() => {
        if (rendered.length === 0) {
            fetchBreweries();
        }
    }, []);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const handleScroll = () => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                const scrollTop = window.scrollY;
                const viewportHeight = window.innerHeight;
                const fullHeight = document.documentElement.scrollHeight;
                const isBottom = scrollTop + viewportHeight >= fullHeight - 10;

                if (isBottom) scrollNext();
            }, 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flex gap-5 flex-col min-h-screen items-center text-white  p-5 bg-black/90 ">
            {selectedIDs.length > 0 && <Button onClick={deleteIDs}>Delete</Button>}
            <div className="flex w-full justify-evenly items-center">
                <p className="py-3 px-5  rounded-lg border-2 text-2xl font-semibold border-white/20">Breweries</p>
                <p className="py-3 px-5  rounded-lg border-2 text-2xl font-semibold border-white/20">
                    Selected count: {selectedIDs.length ?? 0}
                </p>
            </div>

            <div className="rounded-lg p-5 border-2 border-white/20 flex flex-col gap-3">
                {rendered.map((brew) => (
                    <Link
                        href={`${brew.id}`}
                        onContextMenu={(e) => toggleRClick(e, brew)}
                        key={brew.id}
                        className={`${
                            selectedIDs.includes(brew.id) && "bg-white/20"
                        } cursor-pointer flex flex-col gap-5 items-center rounded-lg p-5 border border-white/10`}
                    >
                        <p>{brew.name}</p>
                        <p>{brew.city}</p>
                        <p>{brew.state}</p>
                        <p>{brew.country}</p>
                        <p>{brew.phone}</p>
                    </Link>
                ))}
                {loading && <p className="w-full h-full text-3xl text-center">Loading...</p>}
            </div>
        </div>
    );
}
