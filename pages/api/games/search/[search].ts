import { collect } from 'collect.js';
import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { Game } from '../../../../interfaces';
import { searchGame } from '../../../../utils';
export default async ({ query }: NextApiRequest, res: NextApiResponse) => {
    let { search } = query;

    try {
        const unformattedGames = await searchGame(search as string);

        res.status(200).json(unformattedGames);
    } catch (error) {
        res.status(400).json(error);
    }
};

const formatToView = (unformattedGames: Game[], imgSize: 'big' | 'thumb') => {
    return collect(unformattedGames).map((game) => {
        return collect(game).merge({
            first_release_date: game.first_release_date
                ? dayjs.unix(game.first_release_date).format('d MMM, YYYY')
                : 'N/A',
            cover: game.cover.url
                ? imgSize === 'big'
                    ? game.cover.url.replace('thumb', 'cover_big')
                    : game.cover.url
                : '/img/cover_big.png',
        });
    });
};
