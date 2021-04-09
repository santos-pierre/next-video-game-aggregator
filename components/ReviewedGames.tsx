import { Game } from '../interfaces';
import ReviewedGameCard from './ReviewedGameCard';
import SectionTitle from './SectionTitle';

type ReviewedGamesProps = {
    games: Game[];
};

const ReviewedGames: React.FC<ReviewedGamesProps> = ({ games }) => {
    return (
        <>
            <SectionTitle>Recently Reviewed</SectionTitle>
            {games.map((game) => {
                return <ReviewedGameCard game={game} key={`${game.slug}-reviewed`} />;
            })}
        </>
    );
};

export default ReviewedGames;
