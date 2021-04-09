import axios from 'axios';
import { GetStaticPropsResult } from 'next';
import Layout from '../components/Layout';
import PopularGames from '../components/PopularGames';
import ReviewedGames from '../components/ReviewedGames';
import { Game } from '../interfaces';

type IndexPageProps = {
    popularGames: Game[];
    reviewedGames: Game[];
    comingSoonGames: Game[];
    anticipatedGames: Game[];
};

const IndexPage: React.FC<IndexPageProps> = ({ popularGames, reviewedGames }) => {
    return (
        <Layout>
            <PopularGames games={popularGames} />
            <div className="flex lg:flex-row flex-col my-10">
                <div className="lg:w-3/4 w-full lg:mr-32 mr-0">
                    <ReviewedGames games={reviewedGames} />
                </div>
            </div>
        </Layout>
    );
};

export const getStaticProps = async (): Promise<GetStaticPropsResult<any>> => {
    let popularGames = [];
    let reviewedGames = [];
    let comingSoonGames = [];
    let anticipatedGames = [];

    try {
        popularGames = (await axios.get('http://localhost:3000/api/games/filter/popular')).data;
        reviewedGames = (await axios.get('http://localhost:3000/api/games/filter/reviewed')).data;
        comingSoonGames = (await axios.get('http://localhost:3000/api/games/filter/coming_soon')).data;
        anticipatedGames = (await axios.get('http://localhost:3000/api/games/filter/anticipated')).data;
    } catch (error) {
        console.log(error);
    }

    return {
        props: {
            popularGames,
            reviewedGames,
            comingSoonGames,
            anticipatedGames,
        },
    };
};

export default IndexPage;
