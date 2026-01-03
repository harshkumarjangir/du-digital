import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ContactUs from './pages/ContactUs'
import OurOffices from './components/common/OurOffices';
import Copyright from './components/common/Copyright'
import BecomePartner from './pages/BecomePartner'
import InvestorRelation from './pages/InvestorRelation'
import AboutUs from './pages/AboutUs'
import VideoGallery from './pages/VideoGallery'
import Careers from './pages/Careers'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import NewsAndMedia from './pages/NewsAndMedia'
import Blogs from './pages/blogs'
import SingleBlog from './pages/SingleBlog'
import { Swifttravels } from './pages/Swifttravels'
import TermsAndConditions from './pages/TermsAndConditions'
import TenantVerification from './pages/TenantVerification'
import IndianEvisa from './pages/IndianEvisa'
import Globalrecruitmentservices from './pages/Globalrecruitmentservices'
// import Edata from './pages/Edata'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/b2b-partner-program" element={<BecomePartner />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/investor-relation" element={<InvestorRelation />} />
        <Route path="/tenant-and-domestic-help-verification" element={<TenantVerification />} />
        <Route path="/india-evisa" element={<IndianEvisa />} />
        <Route path="/global-recruitment-services" element={<Globalrecruitmentservices />} />
        <Route path="/:slug" element={<InvestorRelation />} />
        <Route path="/investor-relation/:slug" element={<InvestorRelation />} />
        <Route path="/news-and-media" element={<NewsAndMedia />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/video-gallery" element={<VideoGallery />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/swifttravels" element={<Swifttravels />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        {/* <Route path="/edata" element={<Edata />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <OurOffices />
      <Copyright />
    </div>
  );
}

export default App