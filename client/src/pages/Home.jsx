import homeData from "../data/homedata.json";
import HomeSlider from "../components/home/HomeSlider";
import VisaServices from "../components/home/VisaServices";
import HomeAboutSection from "../components/home/HomeAboutSection";
import OurFootprints from "../components/home/OurFootprints";
import Testimonials from "../components/home/Testimonials";

const Home = () => {
    return (
        <div className="relative">

            {/* HERO SLIDER */}
            <HomeSlider data={homeData.slider} />

            {/* VISA SERVICES (OVERLAP) */}
            <div className="-mt-32 relative z-20">
                <VisaServices data={homeData.visaServiceSection} />
            </div>

            <HomeAboutSection data={homeData.aboutSection} />

            <OurFootprints data={homeData.ourFootprintsSection} />
            <Testimonials data={homeData.testimonials} />

        </div>
    );
};

export default Home;
