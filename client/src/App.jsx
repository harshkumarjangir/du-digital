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

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/b2b-partner-program' element={<BecomePartner />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/investor-relation' element={<InvestorRelation />} />
        <Route path='/:slug' element={<InvestorRelation />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      <OurOffices />
      <Copyright />
    </div>
  )
}

export default App