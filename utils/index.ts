import axios from 'axios';
import { collect } from 'collect.js';
import dayjs from 'dayjs';
import LRU from 'lru-cache';

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

        return Promise.resolve(response.data);
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

        return Promise.resolve(response.data.shift());
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getGamesSlug = async () => {
    let allSlugs = collect()
        .concat(collect(await getGames('reviewed')).pluck('slug'))
        .concat(collect(await getGames('anticipated')).pluck('slug'))
        .concat(collect(await getGames('coming_soon')).pluck('slug'))
        .concat(collect(await getGames('popular')).pluck('slug'));

    let formattedSlugs = allSlugs.map((item: any) => {
        return { params: { slug: item } };
    });

    return formattedSlugs.all();
};
