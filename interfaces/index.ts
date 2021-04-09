export type CoverImageGame = {
    id: number;
    url: string;
} & string;

export type Game = {
    id: number;
    slug: string;
    name: string;
    cover: CoverImageGame;
    rating: number;
    platforms: string;
    summary: string;
    first_release_date: number;
};
