import { Game } from '../interfaces';
import GameCardSmall from './GameCardSmall';
import SectionTitle from './SectionTitle';

type SideSectionGamesProps = {
    games: Game[];
    title: string;
    category: string;
};

const SideSectionGames: React.FC<SideSectionGamesProps> = ({ games, title, category }) => {
    return (
        <div>
            <SectionTitle>{title}</SectionTitle>
            <div className="mt-8 space-y-10">
                {games.map((game) => {
                    return <GameCardSmall game={game} key={`${game.slug}-${category}`} />;
                })}
                {games.length === 0 && <h3 className="text-center text-lg text-gray-500">Games not found</h3>}
            </div>
        </div>
    );
};

export default SideSectionGames;
