import axios from 'axios';
import Link from 'next/link';
import Layout from '../components/Layout';

const IndexPage = () => {
    const testApi = async () => {
        try {
            const response = await axios.get('api/games/coming');
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return <Layout></Layout>;
};

export default IndexPage;
