import axios from 'axios';
import { collect } from 'collect.js';
import dayjs from 'dayjs';
import LRU from 'lru-cache';
import { CoverImageGame, DetailedGame, Game } from '../interfaces';

export let cache = new LRU();

export const getIDGBAccessToken = async () => {
    try {
        const response = await axios.post(
            `https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_SECRET}&grant_type=client_credentials`
        );
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getGames = async (filter?: 'popular' | 'reviewed' | 'anticipated' | 'coming_soon') => {
    let query = '';
    switch (filter) {
        case 'popular':
            query = `fields slug, name, rating, first_release_date, platforms.abbreviation, cover.url, total_rating_count;
            where platforms = (130, 6, 48, 49)
            & (first_release_date >= ${dayjs().subtract(2, 'month').unix()}
            & first_release_date < ${dayjs().add(2, 'month').unix()}
            & total_rating_count > 5);
            sort total_rating_count desc;
            limit 12;`;
            break;
        case 'anticipated':
            query = `fields name, cover.url, first_release_date, total_rating_count, platforms.abbreviation, rating, rating_count, summary, slug;
            where platforms = (48,49,130,6)
            & (first_release_date >= ${dayjs().unix()}
            & first_release_date < ${dayjs().add(4, 'month').unix()});
            sort total_rating_count desc;
            limit 4;`;
            break;
        case 'coming_soon':
            query = `fields name, cover.url, first_release_date, platforms.abbreviation, rating, rating_count, summary, slug;
            where platforms = (48,49,130,6)
            & (first_release_date >= ${dayjs().unix()});
            sort first_release_date asc;
            limit 4;`;
            break;
        case 'reviewed':
            query = `fields slug, storyline, name, summary, rating, first_release_date, platforms.abbreviation, cover.url, total_rating_count;
            where platforms = (130, 6, 48, 49)
            & (first_release_date >= ${dayjs().subtract(2, 'month').unix()}
            & first_release_date <= ${dayjs().add(2, 'month').unix()})
            & rating_count < 5;
            sort total_rating_count desc;
            limit 3;`;
            break;
        default:
            query = '';
            break;
    }

    try {
        if (!cache.get('igdb_access_token')) {
            const { access_token, expires_in } = (await getIDGBAccessToken()).data;
            cache.set('igdb_access_token', access_token, expires_in);
        }

        const response = await axios({
            method: 'POST',
            url: 'https://api.igdb.com/v4/games',
            headers: {
                Authorization: `Bearer ${cache.get('igdb_access_token')}`,
                'Client-ID': process.env.IGDB_CLIENT_ID!,
                'Content-Type': 'application/json',
            },
            data: query,
        });

        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getGame = async (slug: string) => {
    let query = `fields slug, name, storyline, summary, websites.url, videos.video_id,involved_companies.company.name, rating, platforms.abbreviation, genres.name,
    screenshots.url, cover.url, aggregated_rating,
    similar_games.name, similar_games.platforms.name, similar_games.cover.url, similar_games.slug, similar_games.rating;
    where slug=\"${slug}\";`;

    try {
        if (!cache.get('igdb_access_token')) {
            const { access_token, expires_in } = (await getIDGBAccessToken()).data;
            cache.set('igdb_access_token', access_token, expires_in);
        }

        const response = await axios({
            method: 'POST',
            url: 'https://api.igdb.com/v4/games',
            headers: {
                Authorization: `Bearer ${cache.get('igdb_access_token')}`,
                'Client-ID': process.env.IGDB_CLIENT_ID!,
                'Content-Type': 'application/json',
            },
            data: query,
        });

        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const searchGame = async (search: string) => {
    let query = `search \"${search}\";
                fields name, slug, first_release_date, cover.url;
                limit 6;`;

    try {
        if (!cache.get('igdb_access_token')) {
            const { access_token, expires_in } = (await getIDGBAccessToken()).data;
            cache.set('igdb_access_token', access_token, expires_in);
        }

        const response = await axios({
            method: 'POST',
            url: 'https://api.igdb.com/v4/games',
            headers: {
                Authorization: `Bearer ${cache.get('igdb_access_token')}`,
                'Client-ID': process.env.IGDB_CLIENT_ID!,
                'Content-Type': 'application/json',
            },
            data: query,
        });

        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getGamesSlug = async () => {
    let allSlugs = collect()
        .concat(collect((await getGames('reviewed')).data).pluck('slug'))
        .concat(collect((await getGames('anticipated')).data).pluck('slug'))
        .concat(collect((await getGames('coming_soon')).data).pluck('slug'))
        .concat(collect((await getGames('popular')).data).pluck('slug'));

    let formattedSlugs = allSlugs.map((item: any) => {
        return { params: { slug: item } };
    });

    return formattedSlugs.all();
};

//================== FORMAT GAMES ===============//

export const formatToView = (unformattedGames: Game[], imgSize: 'big' | 'thumb'): Game[] => {
    return collect(unformattedGames)
        .map((game) => {
            return collect(game)
                .merge({
                    first_release_date: game.first_release_date
                        ? dayjs.unix(game.first_release_date).format('d MMM, YYYY')
                        : 'N/A',
                    platforms: game.platforms
                        ? collect(game.platforms).pluck('abbreviation').implode(', ')
                        : 'N/A',
                    rating: game.rating ? Math.round(game.rating) / 100 : null,
                    cover: game.cover
                        ? imgSize === 'big'
                            ? `https://${game.cover.url.replace('thumb', 'cover_big')}`
                            : `https://${game.cover.url}`
                        : '/img/cover_big.png',
                })
                .all();
        })
        .toArray();
};

export const formatGameToView = (game: DetailedGame) => {
    return collect(game)
        .merge({
            cover: game.cover ? game.cover.url.replace('thumb', 'cover_big') : '/img/cover_big.png',
            genres: game.genres ? collect(game.genres).pluck('name').implode(', ') : 'Undefined Genres',
            involved_companies: game.involved_companies
                ? collect(game.involved_companies).pluck('company.name').implode(', ')
                : 'Undefined Company',
            platforms: game.platforms ? collect(game.platforms).pluck('abbreviation').implode(', ') : 'N/A',
            rating: game.rating ? Math.round(game.rating) / 100 : null,
            aggregated_rating: game.aggregated_rating ? Math.round(game.aggregated_rating) / 100 : null,
            summary: game.summary ? game.summary : null,
            images: game.screenshots
                ? collect(game.screenshots)
                      .map((screenshot: CoverImageGame) => {
                          return {
                              screenshot_huge: `https://${screenshot.url.replace('thumb', '1080p')}`,
                              screenshot_big: `https://${screenshot.url.replace('thumb', 'screenshot_big')}`,
                          };
                      })
                      .take(9)
                      .all()
                : [],
            trailer: collect(game.videos).isNotEmpty()
                ? `https://youtube.com/embed/${game.videos[0].video_id}`
                : null,
            similar_games: game.similar_games
                ? collect(game.similar_games)
                      .map((similar_game) => {
                          return collect({
                              name: similar_game.name,
                              platforms: similar_game.platforms
                                  ? collect(similar_game.platforms).pluck('name').implode(', ')
                                  : 'N/A',
                              rating: similar_game.rating ? Math.round(similar_game.rating) / 100 : null,
                              cover: similar_game.cover
                                  ? `https://${similar_game.cover.url.replace('thumb', 'cover_big')}`
                                  : '/img/cover_big.png',
                              slug: similar_game.slug,
                          }).all();
                      })
                      .take(6)
                      .all()
                : null,
            socials: collect({
                website: getSocialWebsiteUrl(game, ''),
                facebook: getSocialWebsiteUrl(game, 'facebook'),
                youtube: getSocialWebsiteUrl(game, 'youtube'),
                twitter: getSocialWebsiteUrl(game, 'twitter'),
            }).all(),
        })
        .all();
};

const getSocialWebsiteUrl = (game: DetailedGame, social: string) => {
    if (social) {
        let website: any = collect(game.websites)
            .filter((website: any) => {
                return website.url.includes(social);
            })
            .first();
        if (website) {
            return website.url;
        } else {
            return null;
        }
    } else {
        if (collect(game.websites).first()) {
            return game.websites[0].url;
        } else {
            return null;
        }
    }
};
