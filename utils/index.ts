import axios, { AxiosPromise } from 'axios';
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

export const getGames = async (query?: string): Promise<AxiosPromise<any>> => {
    try {
        if (!cache.get('igdb_access_token')) {
            const { access_token, expires_in } = await (await getIDGBAccessToken()).data;
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
        return Promise.reject({ status: 404, message: 'Not Found' });
    }
};
