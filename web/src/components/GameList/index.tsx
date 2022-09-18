// libs
import axios from "axios";

// react
import { useEffect, useState } from "react";

// components
import GameBanner from "./GameBanner";

export interface Game {
    idGame: string,
    title: string
    bannerUrl: string,
    _count: { ads: number },
}
export default function GameList() {
    const [games, setGames] = useState<Game[]>([]);
    useEffect(() => {
        axios('http://localhost:3333/games', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => setGames(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='grid grid-cols-6 gap-6 mt-16'>
            {games.map(game => (
                <GameBanner
                    key={game.idGame}
                    title={game.title}
                    bannerUrl={game.bannerUrl}
                    adsCount={game._count.ads}
                />
            ))}
        </div>
    );
}