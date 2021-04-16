import Head from 'next/head';
import { DetailedGame, Game } from '../../interfaces';

type SEOProps = {
    game?: Game | DetailedGame;
    title?: string;
};

const SEO: React.FC<SEOProps> = ({ game, title = 'Santos Pierre | Games' }) => {
    const defaultMeta = (): JSX.Element => {
        return (
            <>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Video Game Aggregator display nicely. Build with NextJS" />
                <meta property="og:site_name" content="games.santospierre.com" />
                <meta property="og:type" content="website" />
                <link rel="icon" href="/img/logo.png" />
                <meta name="twitter:image:alt" content="games.santospierre.com" />
            </>
        );
    };

    if (game) {
        return (
            <Head>
                {defaultMeta()}
                <title>{`${game.name} | Games`}</title>
                <meta property="og:title" content={`${game.name} | Games`} />
                <meta property="og:url" content={`games.santospierre.com/games/${game.slug}`} />
                <meta name="twitter:card" content={game.cover} />
            </Head>
        );
    }

    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="og:url" content="games.santospierre.com" />
            {defaultMeta()}
        </Head>
    );
};

export default SEO;
