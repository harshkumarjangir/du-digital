import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../redux/slices/newsSlice';
import { fetchOfficialPartners } from '../redux/slices/partnerSlice';
import data from '../data/governmentEmbassies.json'
import GovernmentEmbHero from '../components/government-embassies/GovernmentEmbHero'
import WhoWeAre from '../components/reusable/WhoWeAre'
import Timeline from "../components/reusable/Timeline";
import NewsHome from '../components/reusable/NewsHome';
import { Link } from 'react-router-dom';
import OurStrengths from '../components/reusable/OurStrengths';
import OurFootprints from '../components/reusable/OurFootprints';
import ConnectWithUs from '../components/reusable/ConnectWithUs';

const ForGovernmentEmbassies = () => {
    const dispatch = useDispatch();
    const { news } = useSelector((state) => state.news);
    const { officialPartners, loadingOfficialPartners } = useSelector((state) => state.partner);

    // useEffect(() => {
    //     dispatch(fetchNews());
    //     dispatch(fetchOfficialPartners());
    // }, [dispatch]);
    useEffect(() => {
        dispatch(fetchNews());

        if (!officialPartners.length) {
            dispatch(fetchOfficialPartners());
        }
    }, [dispatch, officialPartners.length]);


    const sortedPartners = [...officialPartners].sort(
        (a, b) => Number(a.year) - Number(b.year)
    );

    return (
        <div>
            <GovernmentEmbHero data={data.hero} />
            <WhoWeAre data={data.whoWeAre} />
            <Timeline data={sortedPartners} />

            {/* NEWS SECTION */}
            <div className="py-10 bg-white">
                <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">News and Media</h2>
                </div>
                <NewsHome data={news.slice(0, 3)} />
                <Link to="/news-and-media" className="block text-center pt-8">
                    <button className="px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] cursor-pointer">
                        View All News
                    </button>
                </Link>
            </div>

            <OurStrengths data={data.strengths} />
            <OurFootprints aboutSection={data.aboutSection} data={data.footprints} />
            <ConnectWithUs data={data.connect} />

        </div>
    )
}

export default ForGovernmentEmbassies