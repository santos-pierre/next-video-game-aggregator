import Link from 'next/link';
import { Game } from '../interfaces';
import RatingProgress from './RatingProgress';

type ReviewedGameCardProps = {
    game: Game;
};

const ReviewedGameCard: React.FC<ReviewedGameCardProps> = ({ game }) => {
    return (
        <div className="mt-8 space-y-12">
            <div className="flex px-6 py-6 bg-gray-800 rounded-lg shadow-md game">
                <div className="relative flex-none">
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
                                className="w-24 transition duration-150 ease-in-out lg:w-48 hover:opacity-75"
                            />
                        </a>
                    </Link>
                    {game.rating && (
                        <RatingProgress
                            slug={game.slug}
                            category="review"
                            style="absolute -bottom-4 -right-6"
                            rating={game.rating}
                        />
                    )}
                </div>
                <div className="ml-12">
                    <Link
                        href={{
                            pathname: '/games/[slug]',
                            query: { slug: game.slug },
                        }}
                    >
                        <a className="block mt-4 text-lg font-bold leading-tight hover:text-gray-400">
                            {game.name}
                        </a>
                    </Link>
                    {game.platforms && <div className="mt-1 text-gray-400">{game.platforms}</div>}
                    {game.summary && (
                        <div className="hidden mt-6 text-gray-400 lg:block">
                            {game.summary.length > 544 ? `${game.summary.slice(0, 544)} ...` : game.summary}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewedGameCard;
