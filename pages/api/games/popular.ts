import { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';
import { getGames } from '../../../utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const query = `fields slug, name, rating, first_release_date, platforms.abbreviation, cover.url, total_rating_count;
            where platforms = (130, 6, 48, 49)
            & (first_release_date >= ${dayjs().subtract(2, 'month').unix()}
            & first_release_date < ${dayjs().add(2, 'month').unix()}
            & total_rating_count > 5);
            sort total_rating_count desc;
            limit 12;`;
        const unformattedGames = await getGames(query);
        res.status(200).json(unformattedGames);
    } catch (error) {
        res.status(400).json(error);
    }
};
