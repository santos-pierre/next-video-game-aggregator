import { NextApiRequest, NextApiResponse } from 'next';
import { getGames } from '../../../utils';
import dayjs from 'dayjs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const query = `fields name, cover.url, first_release_date, platforms.abbreviation, rating, rating_count, summary, slug;
        where platforms = (48,49,130,6)
        & (first_release_date >= ${dayjs().unix()});
        sort first_release_date asc;
        limit 4;`;
        const unformattedGames = await getGames(query);
        res.status(200).json(unformattedGames);
    } catch (error) {
        res.status(400).json(error);
    }
};
