import { GetStaticPropsResult } from 'next';
import Layout from '../components/Layout';
import PopularGames from '../components/PopularGames';
import ReviewedGames from '../components/ReviewedGames';
import SideSectionGames from '../components/SideSectionGames';
import { Game } from '../interfaces';
import { formatToView, getGames } from '../utils';

type IndexPageProps = {
    popularGames: Game[];
    reviewedGames: Game[];
    comingSoonGames: Game[];
    anticipatedGames: Game[];
};

const IndexPage: React.FC<IndexPageProps> = ({
    popularGames,
    reviewedGames,
    anticipatedGames,
    comingSoonGames,
}) => {
    return (
        <Layout>
            <PopularGames games={popularGames} />
            <div className="flex lg:flex-row flex-col my-10">
                <ReviewedGames games={reviewedGames} />
                <div className="lg:w-1/4 w-full lg:mt-0 mt-12">
                    <SideSectionGames
                        games={anticipatedGames}
                        category="anticipated"
                        title="Most Anticipated"
                    />
                    <SideSectionGames games={comingSoonGames} category="coming" title="Coming Soon" />
                </div>
            </div>
        </Layout>
    );
};

export const getStaticProps = async (): Promise<GetStaticPropsResult<any>> => {
    let popularGames: Game[] = [];
    let reviewedGames: Game[] = [];
    let comingSoonGames: Game[] = [];
    let anticipatedGames: Game[] = [];

    try {
        popularGames = formatToView((await getGames('popular')).data, 'big');
        reviewedGames = formatToView((await getGames('reviewed')).data, 'big');
        comingSoonGames = formatToView((await getGames('coming_soon')).data, 'thumb');
        anticipatedGames = formatToView((await getGames('anticipated')).data, 'thumb');
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
        revalidate: 60 * 60 * 24,
    };
};

export default IndexPage;
