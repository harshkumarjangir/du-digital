import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../redux/slices/newsSlice";
import NewsCoverage from "../components/news-and-events/NewsCoverage";
import NewsAndMediaHero from "../components/news-and-events/NewsHero";
import PageTabs from "../components/news-and-events/PageTabs";
import newsData from '../data/newsPage.json';

const NewsAndMedia = () => {
    const dispatch = useDispatch();
    const { news, loading, error } = useSelector((state) => state.news);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    return (
        <div>
            <NewsAndMediaHero data={newsData.hero} />
            <PageTabs />

            {loading && (
                <div className="py-20 text-center">
                    <p className="text-gray-600">Loading news...</p>
                </div>
            )}

            {error && (
                <div className="py-20 text-center">
                    <p className="text-red-600">Error: {error}</p>
                </div>
            )}

            {!loading && !error && (
                <NewsCoverage data={news} />
            )}
        </div>
    );
};

export default NewsAndMedia;
