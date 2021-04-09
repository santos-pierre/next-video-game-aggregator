import { NextApiRequest, NextApiResponse } from 'next';
import { getGames } from '../../../../utils';
import collect from 'collect.js';
import dayjs from 'dayjs';
import { Game } from '../../../../interfaces';

export default async ({ query }: NextApiRequest, res: NextApiResponse) => {
    let { filter } = query;
    let unformattedGames = [];

    try {
        switch (filter) {
            case 'coming_soon':
                unformattedGames = await getGames('coming_soon');
                res.status(200).json(formatToView(unformattedGames));
                break;
            case 'reviewed':
                unformattedGames = await getGames('reviewed');
                res.status(200).json(formatToView(unformattedGames));
                break;
            case 'popular':
                unformattedGames = await getGames('popular');
                res.status(200).json(formatToView(unformattedGames));
                break;
            case 'anticipated':
                unformattedGames = await getGames('anticipated');
                res.status(200).json(formatToView(unformattedGames));
                break;
            default:
                res.status(200).json([]);
                break;
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

const formatToView = (unformattedGames: Game[]) => {
    return collect(unformattedGames).map((game) => {
        return collect(game).merge({
            first_release_date: game.first_release_date
                ? dayjs.unix(game.first_release_date).format('d MMM, YYYY')
                : 'N/A',
            platforms: game.platforms ? collect(game.platforms).pluck('abbreviation').implode(', ') : 'N/A',
            rating: game.rating ? Math.round(game.rating) : null,
            cover: game.cover.url ? game.cover.url : '/public/img/cover_big.png',
        });
    });
};
