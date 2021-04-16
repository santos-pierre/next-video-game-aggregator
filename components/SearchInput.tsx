import axios from 'axios';
import { ChangeEvent, useRef, useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import Image from 'next/image';
import { myLoader } from '../utils';

const SearchInput: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [results, setResults] = useState<any[]>([]);
    const [lazy, setLazy] = useState<any>(0);
    const [search, setSearch] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setIsLoading(true);
        if (lazy) clearTimeout(lazy);

        setLazy(
            setTimeout(async () => {
                if (e.target.value) {
                    try {
                        let data = (await axios.get(`/api/games/search/${e.target.value}`)).data;

                        setResults(data);
                    } catch (error) {
                        setResults([]);
                    } finally {
                        setIsLoading(false);
                        clearTimeout(lazy);
                    }
                }
            }, 1000)
        );
    };

    const handleClick = () => {
        if (inputRef && inputRef.current) inputRef.current.value = '';
        setSearch('');
        setIsLoading(false);
        clearTimeout(lazy);
    };

    const displayResult = () => {
        if (isLoading) {
            return (
                <div>
                    <span className="flex w-3 h-3">
                        <span className="absolute inline-flex w-full h-full bg-blue-400 rounded-full opacity-75 animate-ping"></span>
                    </span>
                </div>
            );
        }

        if (results.length === 0) {
            return <h3 className="mt-3 text-lg text-center text-gray-500">No Result Found</h3>;
        }

        return (
            <ul className="space-y-2 game-list">
                {results.map((game) => {
                    return (
                        <Link
                            href={{
                                pathname: '/games/[slug]',
                                query: { slug: game.slug },
                            }}
                            key={`${game.slug}-result-element`}
                        >
                            <a
                                className="block transition duration-150 ease-in-out hover:bg-blue-900 focus:outline-none focus:bg-gray-50"
                                onClick={handleClick}
                            >
                                <div className="flex items-center">
                                    <div className="flex items-center flex-1 min-w-0">
                                        <div className="flex-shrink-0 p-2">
                                            <Image
                                                loader={myLoader}
                                                src={
                                                    game.cover
                                                        ? `https:${game.cover.url.replace(
                                                              'thumb',
                                                              'cover_big'
                                                          )}`
                                                        : '/img/cover_big.png'
                                                }
                                                alt={`${game.name}-cover-search`}
                                                width="50px"
                                                height="75px"
                                            />
                                        </div>
                                        <div>
                                            <div className="ml-4">
                                                <span className="block text-sm font-bold hover:text-gray-400">
                                                    {game.name}
                                                </span>
                                                <div className="mt-1 text-sm text-white">
                                                    {game.first_release_date
                                                        ? dayjs
                                                              .unix(game.first_release_date)
                                                              .format('d MMM, YYYY')
                                                        : 'N/A'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="flex flex-col">
            <div className="relative z-20">
                <input
                    type="text"
                    className="w-64 px-3 py-1 pl-8 text-sm bg-gray-800 rounded-full focus:outline-none focus:shadow-outline"
                    placeholder="Search Game"
                    onChange={handleSearch}
                    ref={inputRef}
                />
                <div className="absolute top-0 flex items-center h-full ml-2">
                    <svg
                        className="w-4 text-gray-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            {search && (
                <>
                    <div
                        className="absolute z-50 w-64 h-64 mt-10 overflow-scroll overflow-x-hidden bg-gray-800 border border-blue-500 rounded-sm"
                        style={{ scrollbarWidth: 'none' }}
                    >
                        {displayResult()}
                    </div>
                    <div
                        className="fixed z-10 inset-0 bg-gray-500 bg-opacity-50 transition-opacity"
                        aria-hidden="true"
                        onClick={handleClick}
                    ></div>
                </>
            )}
        </div>
    );
};

export default SearchInput;
