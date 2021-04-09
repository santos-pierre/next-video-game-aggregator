import { Game } from '../interfaces';
import ReviewedGameCard from './ReviewedGameCard';
import SectionTitle from './SectionTitle';

type ReviewedGamesProps = {
    games: Game[];
};

const ReviewedGames: React.FC<ReviewedGamesProps> = ({ games }) => {
    return (
        <div className="lg:w-3/4 w-full lg:mr-32 mr-0">
            <SectionTitle>Recently Reviewed</SectionTitle>
            {games.map((game) => {
                return <ReviewedGameCard game={game} key={`${game.slug}-reviewed`} />;
            })}
        </div>
    );
};

export default ReviewedGames;
