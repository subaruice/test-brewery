import type { Brewery } from "@/types/brewery";

interface Props {
    params: {
        id: string;
    };
}

export async function generateStaticParams() {
    const data = await fetch(`https://api.openbrewerydb.org/v1/breweries`);
    const breweries = await data.json();
    return breweries.map((brew: Brewery) => ({ id: brew.id }));
}

export default async function Brewerys({ params }: Props) {
    const { id } = await params;
    const data = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
    const brewery: Brewery = await data.json();

    return (
        <div className="min-h-screen flex p-5 bg-black/90">
            <div className="text-white w-full bg-black/90 p-5 flex flex-col justify-center items-center gap-2 border border-white/20 rounded-xl">
                <p>{brewery.name}</p>
                <p>{brewery.city}</p>
                <p>{brewery.country}</p>
                <p>{brewery.state}</p>
                <p>{brewery.phone}</p>
                <p>{brewery.address_1}</p>
                <p>{brewery.address_2}</p>
                <p>{brewery.address_3}</p>
                <p>{brewery.street}</p>
                <p>{brewery.brewery_type}</p>
            </div>
        </div>
    );
}
