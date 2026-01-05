import homeData from "../data/homedata.json";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../redux/slices/eventsSlice';
import { fetchNews } from '../redux/slices/newsSlice';
import { fetchBlogs } from '../redux/slices/BlogsSlice';
import EventsGrid from '../components/news-and-events/EventsGrid';
import NewsHome from '../components/reusable/NewsHome';
import { Blog } from '../components/BlogsComponents/Blog';
import HomeSlider from "../components/home/HomeSlider";
import VisaServices from "../components/home/VisaServices";
import HomeAboutSection from "../components/home/HomeAboutSection";
import OurFootprints from "../components/home/OurFootprints";
import Testimonials from "../components/home/Testimonials";
import IsoCertificates from "../components/home/IsoCertificates";
import WhyUsSection from "../components/reusable/WhyUsSection";
import { Link } from "react-router-dom";
import OurBusinesses from "../components/home/OurBusinesses";

const Home = () => {
    const dispatch = useDispatch();
    const { events } = useSelector((state) => state.events);
    const { news } = useSelector((state) => state.news);
    const { Blogs: blogs } = useSelector((state) => state.blog);

    useEffect(() => {
        dispatch(fetchEvents());
        dispatch(fetchNews());
        dispatch(fetchBlogs(1));
    }, [dispatch]);
    return (
        <div className="relative">

            {/* HERO SLIDER */}
            <HomeSlider data={homeData.slider} />

            {/* VISA SERVICES (OVERLAP) */}
            <div className="-mt-32 relative z-20">
                <VisaServices data={homeData.visaServiceSection} />
            </div>

            <OurBusinesses data={homeData.ourBusinessesSection} />

            <HomeAboutSection data={homeData.aboutSection} />



            <OurFootprints data={homeData.ourFootprintsSection} />
            <Testimonials data={homeData.testimonials} />
            <IsoCertificates data={homeData.certificationsSection} />
            <WhyUsSection data={homeData.whyUsSection} />

            {/* BLOGS SECTION */}
            <div className="py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 mb-2 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Our Latest Blogs</h2>
                </div>
                <Blog data={blogs.slice(0, 3)} className="lg:grid-cols-3" />
                <Link to="/blogs" className="block text-center py-4">
                    <button className="px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] cursor-pointer">
                        View All Blogs
                    </button>
                </Link>
            </div>

            {/* NEWS SECTION */}
            <div className="py-10 bg-white">
                <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">News Coverage</h2>
                </div>
                <NewsHome data={news.slice(0, 3)} />
                <Link to="/news-and-media" className="block text-center pt-8">
                    <button className="px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] cursor-pointer">
                        View All News
                    </button>
                </Link>
            </div>



            {/* EVENTS SECTION */}
            <div className="py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 mb-2 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Latest Updates & Events</h2>
                </div>
                <EventsGrid data={events.slice(0, 6)} />
                <Link to="/events" className="block text-center py-4">
                    <button className="px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] cursor-pointer">
                        View All Events
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default Home;
