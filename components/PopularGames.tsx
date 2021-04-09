import { Game } from '../interfaces';
import GameCardBig from './GameCardBig';
import SectionTitle from './SectionTitle';

type PopularGamesProps = {
    games: Game[];
};

const PopularGames: React.FC<PopularGamesProps> = ({ games }) => {
    return (
        <>
            <SectionTitle>Popular Games</SectionTitle>
            <div className="grid grid-cols-2 gap-12 pb-16 text-sm border-b border-gray-800 popular-game lg:grid-cols-6 md:grid-cols-4">
                {games.map((game) => {
                    return <GameCardBig game={game} key={game.slug} />;
                })}
            </div>
        </>
    );
};

export default PopularGames;
