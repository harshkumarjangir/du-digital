import data from "../data/becomePartner.json";
import HeroSection from "../components/become-partner/HeroSection";
import WhyDuGlobal from "../components/become-partner/WhyDuGlobal";
import PartnerFAQ from "../components/become-partner/PartnerFAQ";
import OurFootprints from "../components/become-partner/OurFootprints";
import Gallery from "../components/become-partner/Gallery";

const BecomePartner = () => {
    return (
        <>
            <HeroSection data={data.hero} />
            <WhyDuGlobal data={data.whyUs} />
            <PartnerFAQ data={data.faq} />
            <OurFootprints data={data.footprints} />
            <Gallery images={data.gallery} />
        </>
    );
};

export default BecomePartner;
