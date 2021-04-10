import { Game } from '../interfaces';
import Link from 'next/link';

type GameCardSmallProps = {
    game: Game;
};

const GameCardSmall: React.FC<GameCardSmallProps> = ({ game }) => {
    return (
        <div className="flex">
            <Link
                href={{
                    pathname: '/games/[slug]',
                    query: { slug: game.slug },
                }}
            >
                <a>
                    <img
                        src={game.cover}
                        alt="game cover"
                        className="w-16 hover:opacity-75 transition ease-in-out duration-150"
                    />
                </a>
            </Link>
            <div className="ml-4">
                <Link
                    href={{
                        pathname: '/games/[slug]',
                        query: { slug: game.slug },
                    }}
                >
                    <a className="block text-sm font-bold hover:text-gray-400">{game.name}</a>
                </Link>
                <div className="text-gray-400 text-sm mt-1">{game.first_release_date}</div>
            </div>
        </div>
    );
};

export default GameCardSmall;
