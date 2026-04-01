import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import OurOffices from './components/common/OurOffices';
import Copyright from './components/common/Copyright'
import ScrollToTop from './components/common/ScrollToTop'
import LoadingState from './components/reusable/LoadingState'
import SEO from './components/common/SEO'
// Lazy load all page components for code splitting
const Home = lazy(() => import('./pages/Home'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ContactUs = lazy(() => import('./pages/ContactUs'))
const BecomePartner = lazy(() => import('./pages/BecomePartner'))
const InvestorRelation = lazy(() => import('./pages/InvestorRelation'))
const AboutUs = lazy(() => import('./pages/AboutUs'))
const VideoGallery = lazy(() => import('./pages/VideoGallery'))
const Careers = lazy(() => import('./pages/Careers'))
const Events = lazy(() => import('./pages/Events'))
const EventDetail = lazy(() => import('./pages/EventDetail'))
const NewsAndMedia = lazy(() => import('./pages/NewsAndMedia'))
const Blogs = lazy(() => import('./pages/blogs'))
const SingleBlog = lazy(() => import('./pages/SingleBlog'))
const Swifttravels = lazy(() => import('./pages/Swifttravels').then(m => ({ default: m.Swifttravels })))
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'))
const TenantVerification = lazy(() => import('./pages/TenantVerification'))
const IndianEvisa = lazy(() => import('./pages/IndianEvisa'))
const Globalrecruitmentservices = lazy(() => import('./pages/Globalrecruitmentservices'))
const OurCapabilities = lazy(() => import('./pages/OurCapabilities'))
const Magazine = lazy(() => import('./pages/Magazine'))
const Policy2 = lazy(() => import('./pages/CookiePolicy2'))
const ForGovernmentEmbassies = lazy(() => import('./pages/ForGovernmentEmbassies'))
const Duverify = lazy(() => import('./pages/Duverify'))
const Companysetup = lazy(() => import('./pages/Companysetup'))
const GreeceWorkVisa = lazy(() => import('./pages/Greeceworkvisa'))
const Digitalarrivalcards = lazy(() => import('./pages/Digitalarrivalcards'))
const Dubai5yeartouristvisa = lazy(() => import('./pages/Dubai5yeartouristvisa'))
const Southkoreavisaforindians = lazy(() => import('./pages/Southkoreavisaforindians'))
const Malaysiavisaforndians = lazy(() => import('./pages/Malaysiavisaforndians'))
const Moroccovisa = lazy(() => import('./pages/Moroccovisa'))
const Serbiaworkpermitvisa = lazy(() => import('./pages/Serbiaworkpermitvisa'))
const Australiatouristvisa = lazy(() => import('./pages/Australiatouristvisa'))
const BangladeshVac = lazy(() => import('./pages/Bangladeshvac'))
const Applyforanyvisa = lazy(() => import('./pages/Applyforanyvisa'))
const Japantouristvisaforindians = lazy(() => import('./pages/Japantouristvisaforindians'))
const Egyptvisaforindians = lazy(() => import('./pages/Egyptvisaforindians'))
const Lebanon = lazy(() => import('./pages/Lebanon'))
const BangladeshVisasForUaeSingapore = lazy(() => import('./pages/Bangladeshvisasforuaesingapore'))
const Vipclearanceatmalaysiaairport = lazy(() => import('./pages/Vipclearanceatmalaysiaairport'))
const Georgiaevisa = lazy(() => import('./pages/Georgiaevisa'))

const App = () => {
        return (
                <div>
                        <ScrollToTop />
                        <SEO/>
                        <Navbar />
                        <Suspense fallback={<LoadingState message="Loading..." fullScreen />}>
                                <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/b2b-partner-program" element={<BecomePartner />} />
                                        <Route path="/about-us" element={<AboutUs />} />
                                        <Route path="/contact-us" element={<ContactUs />} />
                                        <Route path="/embassy-government-partners" element={<ForGovernmentEmbassies />} />
                                        <Route path="/tenant-and-domestic-help-verification" element={<TenantVerification />} />
                                        <Route path="/india-evisa" element={<IndianEvisa />} />
                                        <Route path="/global-recruitment-services" element={<Globalrecruitmentservices />} />
                                        <Route path="/investor-relation" element={<InvestorRelation />} />
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
                                        <Route path="/duverify" element={<Duverify />} />
                                        <Route path="/our-capabilities" element={<OurCapabilities />} />
                                        <Route path="/greece-work-visa" element={<GreeceWorkVisa />} />
                                        <Route path="/digital-arrival-cards" element={<Digitalarrivalcards />} />
                                        <Route path="/dubai-5year-tourist-visa" element={<Dubai5yeartouristvisa />} />
                                        <Route path="/south-korea-visa-for-indians" element={<Southkoreavisaforindians />} />
                                        <Route path="/morocco-visa" element={<Moroccovisa />} />
                                        <Route path="/serbia-work-permit-visa" element={<Serbiaworkpermitvisa />} />
                                        <Route path="/australia-tourist-visa" element={<Australiatouristvisa />} />
                                        <Route path="/malaysia-visa-for-indians" element={<Malaysiavisaforndians />} />
                                        <Route path="/company-setup-in-the-uae" element={<Companysetup />} />
                                        <Route path="/apply-for-any-visa" element={<Applyforanyvisa />} />
                                        <Route path="/japan-tourist-visa-for-indians" element={<Japantouristvisaforindians />} />
                                        <Route path="/egypt-visa-for-indians" element={<Egyptvisaforindians />} />
                                        <Route path="/tnh-magazine" element={<Magazine />} />
                                        <Route path="/bangladesh-vac" element={<BangladeshVac />} />
                                        <Route path="/bangladesh-visas-for-uae-singapore" element={<BangladeshVisasForUaeSingapore />} />
                                        <Route path="/vip-clearance-at-malaysia-airport" element={<Vipclearanceatmalaysiaairport />} />
                                        <Route path="/georgia-evisa" element={<Georgiaevisa />} />
                                        <Route path="/lebanon" element={<Lebanon />} />
                                        <Route path="/cookie-policy" element={<Policy2 />} />
                                        <Route path="*" element={<NotFound />} />
                                </Routes>
                        </Suspense>
                        <Footer />
                        <OurOffices />
                        <Copyright />
                </div>
        );
}

export default App