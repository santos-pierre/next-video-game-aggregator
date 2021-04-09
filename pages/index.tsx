import axios from 'axios';
import { GetStaticPropsResult } from 'next';
import Layout from '../components/Layout';
import { Game } from '../interfaces';

type IndexPageProps = {
    popularGames: Game[];
    reviewedGames: Game[];
    comingSoonGames: Game[];
    anticipatedGames: Game[];
};

const IndexPage: React.FC<IndexPageProps> = ({}) => {
    return <Layout></Layout>;
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
