import { NextApiRequest, NextApiResponse } from 'next';
import { searchGame } from '../../../../utils';
export default async ({ query }: NextApiRequest, res: NextApiResponse) => {
    let { search } = query;

    try {
        const game = await searchGame(search as string);

        res.status(200).json(game);
    } catch (error) {
        res.status(400).json(error);
    }
};
