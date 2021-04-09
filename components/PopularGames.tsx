import { Game } from '../interfaces';
import GameCardBig from './GameCardBig';

type PopularGamesProps = {
    games: Game[];
};

const PopularGames: React.FC<PopularGamesProps> = ({ games }) => {
    return (
        <>
            <h2 className="text-blue-500 uppercase tracking-wide font-bold text-xl mt-8">Popular Games</h2>
            <div className="grid grid-cols-2 gap-12 pb-16 text-sm border-b border-gray-800 popular-game lg:grid-cols-6 md:grid-cols-4">
                {games.map((game) => {
                    return <GameCardBig game={game} key={game.slug} />;
                })}
            </div>
        </>
    );
};

export default PopularGames;
