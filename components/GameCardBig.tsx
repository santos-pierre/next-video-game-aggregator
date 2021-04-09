import { Game } from '../interfaces';
import Link from 'next/link';
import RatingProgress from './RatingProgress';

type GameCardBigProps = {
    game: Game;
};

const GameCardBig: React.FC<GameCardBigProps> = ({ game }) => {
    return (
        <div className="mt-8">
            <div className="relative inline-block">
                <Link href="/">
                    <a>
                        <img
                            src={game.cover}
                            alt="game cover"
                            className="hover:opacity-75 transition ease-in-out duration-150"
                        />
                        {game.rating && (
                            <RatingProgress
                                slug={game.slug}
                                category="popular"
                                rating={game.rating}
                                style="absolute bottom-0 -right-5 -bottom-5"
                            />
                            // <div
                            //     className="absolute bottom-0 right-0 w-16 h-16 bg-gray-800 rounded-full"
                            //     style={{ right: '-15px', bottom: '-15px' }}
                            // >
                            //     <div
                            //         id={game.slug}
                            //         className="font-semibold text-sm flex justify-center items-center h-full"
                            //         ref={ratingProgress}
                            //     ></div>
                            // </div>
                        )}
                    </a>
                </Link>
            </div>
            <Link href="/">
                <a className="block text-base font-bold leading-tight hover:text-gray-400 mt-8">
                    {game.name}
                </a>
            </Link>
        </div>
    );
};

export default GameCardBig;
