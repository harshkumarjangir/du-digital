import homeData from "../data/homedata.json";
import HomeSlider from "../components/home/HomeSlider";
import VisaServices from "../components/home/VisaServices";

const Home = () => {
    return (
        <div className="relative">

            {/* HERO SLIDER */}
            <HomeSlider data={homeData.slider} />

            {/* VISA SERVICES (OVERLAP) */}
            <div className="-mt-32 relative z-20">
                <VisaServices data={homeData.visaServiceSection} />
            </div>

        </div>
    );
};

export default Home;
