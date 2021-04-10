export type CoverImageGame = {
    id: number;
    url: string;
} & string;

export type VideosUrlGame = {
    id: number;
    video_id: string;
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

export type Social = {
    facebook: string | null;
    twitter: string | null;
    website: string | null;
    youtube: string | null;
};

export type Screenshots = {
    screenshot_huge: string;
    screenshot_big: string;
};

export type DetailedGame = {
    genres: string;
    involved_companies: string;
    aggregated_rating: number;
    screenshots: CoverImageGame[];
    images: Screenshots[];
    trailer: string;
    similar_games: Game[];
    socials: Social;
    videos: VideosUrlGame[];
    websites: any;
} & Game;
