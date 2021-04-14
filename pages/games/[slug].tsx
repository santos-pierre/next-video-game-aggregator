import { GetStaticPathsResult, GetStaticProps, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import GameCardBig from '../../components/GameCardBig';
import RatingProgress from '../../components/RatingProgress';
import SectionTitle from '../../components/SectionTitle';
import Layout from '../../components/Layout';
import { DetailedGame, Screenshots } from '../../interfaces';
import { formatGameToView, getGame, getGamesSlug } from '../../utils';
import Image from 'next/image';
import Modal from '../../components/Modal';
import { useState } from 'react';

type ShowGameProps = {
    game: DetailedGame;
};

const ShowGame: React.FC<ShowGameProps> = ({ game }) => {
    const router = useRouter();
    const [show, setShow] = useState<boolean>(false);

    if (router.isFallback) {
        return (
            <Layout>
                <div className="container mx-auto px-4 mt-8">
                    <div className="game-details border-b border-gray-800 pb-12 flex flex-col lg:flex-row animate-pulse">
                        <div className="flex-none">
                            <div className="h-64 w-56 bg-gray-800 rounded"> </div>
                        </div>
                        <div className="ml-0 lg:ml-12 lg:mr-64 mr-0">
                            <h2 className="text-transparent rounded bg-gray-800">
                                The magnificent name of that game
                            </h2>
                            <div className="text-transparent mt-3">
                                <span className="rounded bg-gray-800">My genres</span>·
                                <span className="rounded bg-gray-800">My awesome company</span>·
                                <span className="rounded bg-gray-800">My awesome platforms</span>
                            </div>
                            <div className="flex flex-wrap items-center mt-8">
                                <div className="flex items-center">
                                    <div className="h-16 w-16 bg-gray-800 rounded-full" />
                                </div>
                                <div className="flex items-center ml-12">
                                    <div className="h-16 w-16 bg-gray-800 rounded-full" />
                                </div>
                                <div className="flex items-center space-x-4 mt-6 lg:mt-0 lg:ml-12 ml-0">
                                    <div className="rounded-full bg-gray-800 w-8 h-8" />
                                    <div className="rounded-full bg-gray-800 w-8 h-8" />
                                    <div className="rounded-full bg-gray-800 w-8 h-8" />
                                    <div className="rounded-full bg-gray-800 w-8 h-8" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="lg:mt-12 mt-4 rounded bg-gray-800 text-transparent">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod nobis
                                        vel odit eligendi voluptatibus consequatur quaerat quasi aut
                                        repellendu
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-800 pb-12 mt-8 animate-pulse">
                        <SectionTitle>Images</SectionTitle>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
                            {Array(9).map((_element, index) => {
                                return (
                                    <div key={`${index}-images`}>
                                        <div className="w-64 h-44 rounded bg-gray-800"> </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="pb-12 mt-8">
                        <SectionTitle>Similar Games</SectionTitle>
                        <div className="similar-game text-sm grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-12 pb-16">
                            {Array(6).map((_element, index) => {
                                return (
                                    <div className="mt-8 animate-pulse" key={`${index}-games`}>
                                        <div className="inline-block relative">
                                            <div className="h-64 w-44 bg-gray-800 rounded " />
                                        </div>
                                        <div className="block text-lg bg-gray-800 text-transparent leading-tight mt-4 rounded">
                                            My amazing title
                                        </div>
                                        <div className="inline-block bg-gray-800 text-transparent rounded mt-1">
                                            my platforms
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 mt-8">
                {/* START GAME DETAILS */}
                <div className="border-b border-gray-800 pb-12 flex flex-col lg:flex-row">
                    <div className="flex-none">
                        <img
                            src={game.cover}
                            alt="game cover"
                            className="hover:opacity-75 transition ease-in-out duration-150"
                        />
                    </div>
                    <div className="ml-0 lg:ml-12 lg:mr-64 mr-0">
                        {/* START GAME INFO */}
                        <h2 className="font-semibold text-4xl leading-tight lg:mt-0 mt-2">{game.name}</h2>
                        <div className="text-gray-400 space-x-1 flex items-center">
                            <span>{game.genres}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 inline"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M18 12H6"
                                />
                            </svg>
                            <span>{game.involved_companies}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 inline"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M18 12H6"
                                />
                            </svg>
                            <span>{game.platforms}</span>
                        </div>
                        {/* END GAME INFO */}
                        <div className="flex flex-wrap items-center mt-8">
                            {/* START RATINGS */}
                            <div className="flex items-center">
                                <div className="w-16 h-16 bg-gray-800 rounded-full relative">
                                    <RatingProgress
                                        slug={`${game.slug}-memberCritics`}
                                        category="user-review"
                                        rating={game.rating}
                                        style={'font-semibold text-xs absolute'}
                                    />
                                </div>
                                <div className="ml-4 text-sm font-bold">
                                    Member <br /> Score
                                </div>
                            </div>
                            <div className="flex items-center ml-12">
                                <div className="w-16 h-16 bg-gray-800 rounded-full relative">
                                    <RatingProgress
                                        slug={`${game.slug}-aggregated`}
                                        category="global-review"
                                        rating={game.aggregated_rating}
                                        style={'font-semibold text-xs absolute'}
                                    />
                                </div>
                                <div className="ml-4 text-sm font-bold">
                                    Critics <br /> Score
                                </div>
                            </div>
                            {/* END RATINGS */}
                            {/* START SOCIALS LINKS */}
                            <div className="flex items-center space-x-4 mt-6 lg:mt-0 lg:ml-12 ml-0">
                                {game.socials.website && (
                                    <div className="rounded-full bg-gray-800 w-8 h-8 flex justify-center items-center">
                                        <a
                                            href={game.socials.website}
                                            className="hover:text-gray-400"
                                            target="_blanck"
                                        >
                                            <svg
                                                className="w-5 h-5 fill-current"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                            >
                                                <path d="M8 .266C3.582.266 0 3.952 0 8.5s3.582 8.234 8 8.234 8-3.686 8-8.234S12.418.266 8 .266zm2.655 11.873l-.365.375a.8.8 0 00-.2.355c-.048.188-.087.378-.153.56l-.561 1.556c-.444.1-.903.156-1.376.156v-.91c.055-.418-.246-1.203-.73-1.701-.194-.2-.302-.47-.302-.752v-1.062c0-.387-.203-.742-.531-.93a52.733 52.733 0 00-1.575-.866 4.648 4.648 0 01-1.02-.722l-.027-.024a3.781 3.781 0 01-.582-.689c-.303-.457-.796-1.209-1.116-1.698a6.581 6.581 0 013.33-3.383l.774.399c.343.177.747-.08.747-.475v-.375c.257-.043.52-.07.787-.08l.912.939a.542.542 0 010 .751l-.15.156-.334.343c-.101.104-.101.272 0 .376l.15.155c.102.104.102.272 0 .376l-.257.265a.255.255 0 01-.183.078h-.29a.254.254 0 00-.18.076l-.32.32a.269.269 0 00-.05.31l.502 1.035c.086.176-.039.384-.23.384h-.182a.253.253 0 01-.17-.065l-.299-.268a.51.51 0 00-.501-.102l-1.006.345a.386.386 0 00-.19.144.405.405 0 00.14.587l.357.184c.304.156.639.238.978.238.34 0 .729.906 1.032 1.062h2.153c.274 0 .537.112.73.311l.442.455c.184.19.288.447.288.716a1.584 1.584 0 01-.442 1.095zm2.797-3.033a.775.775 0 01-.457-.331l-.58-.896a.812.812 0 010-.883l.632-.976a.78.78 0 01.298-.27l.419-.216c.436.894.688 1.9.688 2.966 0 .288-.024.57-.06.848l-.94-.242z" />
                                            </svg>
                                        </a>
                                    </div>
                                )}
                                {game.socials.youtube && (
                                    <div className="rounded-full bg-gray-800 w-8 h-8 flex justify-center items-center">
                                        <a
                                            href={game.socials.youtube}
                                            className="hover:text-gray-400"
                                            target="_blanck"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                )}
                                {game.socials.twitter && (
                                    <div className="rounded-full bg-gray-800 w-8 h-8 flex justify-center items-center">
                                        <a
                                            href={game.socials.twitter}
                                            className="hover:text-gray-400"
                                            target="_blanck"
                                        >
                                            <svg
                                                className="w-5 h-5 fill-current"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                            >
                                                <path d="M6.382 15h-.06a8.152 8.152 0 01-3.487-.818 1.035 1.035 0 01-.585-1.08 1.057 1.057 0 01.87-.885 4.972 4.972 0 001.905-.667 7.117 7.117 0 01-2.633-6.803 1.058 1.058 0 01.75-.862 1.012 1.012 0 011.073.308 5.317 5.317 0 003.66 2.062A3.375 3.375 0 018.932 3.93a3.352 3.352 0 014.778.142.525.525 0 00.585.075 1.043 1.043 0 011.455 1.2 4.993 4.993 0 01-.96 1.95A8.093 8.093 0 016.382 15zm0-1.5h.06a6.592 6.592 0 006.818-6.442.99.99 0 01.277-.638c.183-.232.34-.483.465-.75a1.92 1.92 0 01-1.432-.638 1.836 1.836 0 00-1.32-.532 1.875 1.875 0 00-1.343.518 1.897 1.897 0 00-.54 1.814l.195.856-.877.06a6.225 6.225 0 01-4.905-1.8 5.34 5.34 0 002.797 4.845l.713.405-.473.675a4.216 4.216 0 01-2.01 1.44 6.25 6.25 0 001.568.187h.007z" />
                                            </svg>
                                        </a>
                                    </div>
                                )}
                                {game.socials.facebook && (
                                    <div className="rounded-full bg-gray-800 w-8 h-8 flex justify-center items-center">
                                        <a
                                            href={game.socials.facebook}
                                            className="hover:text-gray-400"
                                            target="_blanck"
                                        >
                                            <svg
                                                className="w-5 h-5 fill-current"
                                                viewBox="0 0 14 16"
                                                fill="none"
                                            >
                                                <path d="M14 2.5v11a1.5 1.5 0 01-1.5 1.5H9.834V9.463h1.894L12 7.35H9.834V6c0-.612.17-1.028 1.047-1.028H12V3.084A15.044 15.044 0 0010.369 3C8.756 3 7.65 3.984 7.65 5.794v1.56h-1.9v2.112h1.903V15H1.5A1.5 1.5 0 010 13.5v-11A1.5 1.5 0 011.5 1h11A1.5 1.5 0 0114 2.5z" />
                                            </svg>
                                        </a>
                                    </div>
                                )}
                            </div>
                            {/* END SOCIALS LINKS */}
                            {/* START SUMMARY/TRAILER */}
                            <div className="flex flex-col space-y-3">
                                <p className="lg:mt-12 mt-4">{game.summary}</p>
                                {game.trailer && (
                                    <div className="mt-12">
                                        <button
                                            className="flex font-bold bg-blue-500 text-white px-4 py-4 hover:bg-blue-600 rounded transition ease-in-out duration-150"
                                            onClick={() => setShow(true)}
                                        >
                                            <svg className="w-6 fill-current" viewBox="0 0 24 24">
                                                <path d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                                            </svg>
                                            <span className="ml-4"> Play Trailer </span>
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* END SUMMARY TRAILER */}
                        </div>
                    </div>
                </div>
                {/* END GAME DETAILS */}
                {/* START IMAGE GAME SECTION */}
                <div className="image-container border-b border-gray-800 pb-12 mt-8">
                    <SectionTitle>Images </SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
                        {game.images &&
                            game.images.map((screenshot: Screenshots, index) => {
                                return (
                                    <div key={`images-${game.slug}-${index}`}>
                                        <a
                                            href={screenshot.screenshot_huge}
                                            target="_blank"
                                            className="hover:opacity-75 transition ease-in-out duration-150"
                                        >
                                            <Image
                                                src={screenshot.screenshot_big}
                                                alt={`${game.name}-reviewed-cover`}
                                                width="500px"
                                                height="300px"
                                            />
                                        </a>
                                    </div>
                                );
                            })}
                    </div>
                    {game.images.length === 0 && (
                        <h3 className="text-center text-lg text-gray-500">
                            No screenshots available for the moment
                        </h3>
                    )}
                </div>
                {/* END IMAGE GAME SECTION */}
                <div className="pb-12 mt-8">
                    {/* START SIMILAR GAME */}
                    <SectionTitle>Similar Games</SectionTitle>
                    <section className="text-sm grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-12 pb-16">
                        {game.similar_games &&
                            game.similar_games.map((similar) => {
                                return <GameCardBig game={similar} key={`similar-${similar.slug}`} />;
                            })}
                    </section>

                    {game.similar_games === null && (
                        <h3 className="text-center text-lg text-gray-500">No similar games for the moment</h3>
                    )}
                    {/* END SIMILAR GAME */}
                </div>
            </div>
            <Modal show={show} onClose={() => setShow(false)}>
                <iframe
                    src={game.trailer}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    width="560"
                    height="315"
                ></iframe>
            </Modal>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }): Promise<GetStaticPropsResult<any>> => {
    if (params) {
        try {
            const game = formatGameToView((await getGame(params.slug as string)).data.shift());

            if (!game) {
                return {
                    notFound: true,
                };
            }

            return {
                props: { game: game },
            };
        } catch (error) {
            return {
                notFound: true,
            };
        }
    }
    return {
        notFound: true,
    };
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult<any>> => {
    const slugs = await getGamesSlug();

    return {
        paths: slugs,
        fallback: true,
    };
};
export default ShowGame;
