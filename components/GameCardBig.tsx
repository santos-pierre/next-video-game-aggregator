import { Game } from '../interfaces';
import Link from 'next/link';
import RatingProgress from './RatingProgress';
import Image from 'next/image';
import { myLoader } from './../utils';

type GameCardBigProps = {
    game: Game;
};

const GameCardBig: React.FC<GameCardBigProps> = ({ game }) => {
    return (
        <div className="mt-8">
            <div className="relative inline-block">
                <Link
                    href={{
                        pathname: '/games/[slug]',
                        query: { slug: game.slug },
                    }}
                >
                    <a className="hover:opacity-75 transition ease-in-out duration-150">
                        <Image
                            loader={myLoader}
                            src={game.cover}
                            alt={`${game.name}`}
                            width="200px"
                            height="300px"
                        />
                        {game.rating && (
                            <RatingProgress
                                slug={game.slug}
                                category="popular"
                                rating={game.rating}
                                style="absolute lg:-right-5 -right-2 -bottom-5"
                            />
                        )}
                    </a>
                </Link>
            </div>
            <Link
                href={{
                    pathname: '/games/[slug]',
                    query: { slug: game.slug },
                }}
            >
                <a className="block text-base font-bold leading-tight hover:text-gray-400 mt-8">
                    {game.name}
                </a>
            </Link>
        </div>
    );
};

export default GameCardBig;
