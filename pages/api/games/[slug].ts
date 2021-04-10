import { NextApiRequest, NextApiResponse } from 'next';
import { CoverImageGame, DetailedGame } from '../../../interfaces';
import { getGame } from '../../../utils';
import collect from 'collect.js';

export default async ({ query }: NextApiRequest, res: NextApiResponse) => {
    let { slug } = query;

    const unformattedGame = await getGame(slug as string);

    if (unformattedGame === undefined) {
        return res.status(404).json('Not Found');
    }
    return res.status(200).json(formatToView(unformattedGame));
};

const formatToView = (game: DetailedGame) => {
    return collect(game).merge({
        cover: game.cover.url ? game.cover.url.replace('thumb', 'cover_big') : '/img/cover_big.png',
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
                          screenshot_huge: screenshot.url.replace('thumb', '1080p'),
                          screenshot_big: screenshot.url.replace('thumb', 'screenshot_big'),
                      };
                  })
                  .take(9)
            : null,
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
                          cover: similar_game.cover.url
                              ? similar_game.cover.url.replace('thumb', 'cover_big')
                              : '/img/cover_big.png',
                          slug: similar_game.slug,
                      });
                  })
                  .take(6)
            : null,
        socials: collect({
            website: getSocialWebsiteUrl(game, ''),
            facebook: getSocialWebsiteUrl(game, 'facebook'),
            youtube: getSocialWebsiteUrl(game, 'youtube'),
            twitter: getSocialWebsiteUrl(game, 'twitter'),
        }),
    });
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
