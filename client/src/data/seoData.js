const BASE_URL = 'https://dudigitalglobal.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

/**
 * SEO data mapped from CSV: "Title and Description - dudigitalglobal.com.csv"
 * Each key is a route path from App.jsx, matched to its corresponding CSV entry.
 */
const seoData = {
  // ─── Homepage ───
  '/': {
    title: 'Visa Services | Company Formation in Dubai | PR & Immigration',
    description: 'Unlock global opportunities with DU Global! Explore seamless immigration, permanent residency, and citizenship solutions through our efficient services.',
  },

  // ─── Core Pages ───
  '/about-us': {
    title: 'Leading Provider of Visa and Passport Service | DU Digital Global',
    description: 'Discover DU Digital Global, a global leader in administrative and non-judgmental visa, passport, and identity management services. With over 35 centers worldwide, we\'ve processed more than 5 million applications and are expanding rapidly.',
  },
  '/contact-us': {
    title: 'Best Visa Agents Near You in Delhi | DU Digital Global',
    description: 'Need a visa expert? DU Digital Global connects you with trusted visa agents near you. Fast, easy & stress-free.',
  },
  '/b2b-partner-program': {
    title: 'B2B Partner Program | DU Digital Global',
    description: 'Grow your travel business with DUDigital Global. Partner with us for visa processing, travel services, and global recruitment solutions.',
  },
  '/embassy-government-partners': {
    title: 'Leading Provider of Visa and Passport Service | DU Digital Global',
    description: 'Discover DU Digital Global, a global leader in administrative and non-judgmental visa, passport, and identity management services. With over 35 centers worldwide, we\'ve processed more than 5 million applications and are expanding rapidly.',
  },

  // ─── Services ───
  '/apply-for-any-visa': {
    title: 'Apply for Visa Online | 50+ Countries - DU Digital Global',
    description: 'Apply online for visas to 50+ countries including the UAE, UK, USA, and more. DU Digital Global offers fast, secure, and reliable visa services. Start your application today!',
  },
  '/global-recruitment-services': {
    title: 'Global Recruitment Services : International Recruitment Firm',
    description: 'Explore reliable global recruitment services for efficient staffing, hiring, and workforce solutions across industries and countries. Trusted worldwide.',
  },
  '/duverify': {
    title: 'DU Verify: Streamlining Consulate and Embassy Verification Processes',
    description: 'DU Verify simplifies consulate and embassy visa verifications with fast, accurate, and compliant digital solutions. Optimize applicant assessments today.',
  },
  '/our-capabilities': {
    title: 'Our Capabilities - DU Global DU Digital Global',
    description: 'Explore DU Digital Global\'s full range of capabilities in visa processing, passport services, identity management, global recruitment, and company formation across the globe.',
  },
  '/tenant-and-domestic-help-verification': {
    title: 'Tenant & Domestic Help Verification | DU Digital Global',
    description: 'Verify tenants and domestic help with DU Digital Global\'s trusted verification services. Fast, reliable background checks for safe and secure living.',
  },
  '/company-setup-in-the-uae': {
    title: 'Company Setup in UAE/Dubai | Mainland & Free Zones',
    description: 'Set up your business in Dubai with expert registration services. Enjoy 100% ownership, tax benefits, and seamless company setup. Book your free consultation today!',
  },

  // ─── Visa Pages ───
  '/morocco-visa': {
    title: 'Morocco Visa for Indians | Apply for Morocco eVisa | DU Digital',
    description: 'Simplify your Morocco visa application with DU Digital Global. Discover visa requirements for Indian citizens and easily apply for single or multiple-entry visas.',
  },
  '/dubai-5year-tourist-visa': {
    title: 'Dubai 5-Year Visa Made Easy - Apply for UAE Tourist Visa Now',
    description: 'Apply for Dubai\'s 5-year tourist visa with ease. Find out the cost, documentation, and benefits for Indian visitors. Quick and simple application process at Du Digital Global.',
  },
  '/south-korea-visa-for-indians': {
    title: 'Apply for South Korea Visa | Processing Time, Fees & Documents',
    description: 'Need a South Korea Visa? Get expert help with documents, processing time, and fees. Follow our easy 4-step process and apply with confidence through DU Digital.',
  },
  '/greece-work-visa': {
    title: 'Greece Work Visa : Documents, Benefits, Fees and Salary',
    description: 'Get complete details on the Greece Work Visa — required documents, process, fees, benefits, and average salary for foreign professionals in 2025.',
  },
  '/serbia-work-permit-visa': {
    title: 'Serbia Work Permit Visas : Documents, Procedure And Fees',
    description: 'Apply for Serbia Work Permit Visas easily. Get expert assistance with documentation, eligibility, and processing to work legally in Serbia. Fast & reliable service.',
  },
  '/australia-tourist-visa': {
    title: 'Apply for Australia Tourist Visa | Processing Time, Fees & Documents',
    description: 'Need an Australia Tourist Visa? Get expert help with documents, processing time, and fees. Follow our easy 4-step process and apply with confidence through DU Digital.',
  },
  '/malaysia-visa-for-indians': {
    title: 'Malaysia Visa for Indians: Fast eVisa & Multiple Entry Options',
    description: 'Apply for a Malaysia visa from India through DU Digital. Get single or multiple entry visas, eVisa options, and expert guidance for a smooth application process.',
  },
  '/japan-tourist-visa-for-indians': {
    title: 'Japan Tourist Visa for Indians - Apply Now | DU Digital',
    description: 'Planning a trip to Japan? Get your tourist visa with ease. Learn about the application process, documents, and more with DU Digital Global.',
  },
  '/egypt-visa-for-indians': {
    title: 'Egypt Visa for Indians | Apply for Your Tourist Visa Online',
    description: 'Need an Egypt visa? Apply online for a fast, hassle-free process. Find out requirements, fees, and processing time for Indian citizens.',
  },
  '/georgia-evisa': {
    title: 'Georgia eVisa for Indians: Apply Online in Minutes | DU Digital',
    description: 'Get your Georgia e visa at an affordable price with DU Digital Global. We cater specifically to Indian citizens looking to explore Georgia.',
  },
  '/lebanon': {
    title: 'Lebanon Visa Services for All Categories | DuDigital Global',
    description: 'Apply for Lebanon visas including Tourist, Business, Student, and Transit. Fast processing and document legalization at our centers in India, Nepal, and Bangladesh.',
  },
  '/bangladesh-vac': {
    title: 'Bangladesh Visa Agent in Kolkata - DU Digital Global',
    description: 'Apply for your Bangladesh Visa through DU Digital Global, official agent for Indian & Foreign Nationals. Fast, Convenient & Secure.',
  },
  '/bangladesh-visas-for-uae-singapore': {
    title: 'UAE & Singapore Visas for Bangladeshi Citizens | DU Digital',
    description: 'Get your UAE or Singapore visa easily with DU Digital Global. Specialized services for Bangladeshi residents. Apply now!',
  },
  '/vip-clearance-at-malaysia-airport': {
    title: 'VIP Clearance Service at Malaysian Immigration | DU Digital Global',
    description: 'Enjoy seamless travel with our VIP clearance service in Malaysia. Meet & Greet, premium arrival support, and smooth transfers. Book now for a hassle-free journey!',
  },
  '/india-evisa': {
    title: 'India eVisa Services | Apply Online | DU Digital Global',
    description: 'Apply for India eVisa online with DU Digital Global. Fast processing, expert guidance, and hassle-free visa services for tourist, business, and medical categories.',
  },
  '/digital-arrival-cards': {
    title: 'Digital Arrival Cards | Online Immigration Forms | DU Digital Global',
    description: 'Apply for digital arrival cards for various countries. Fast, easy, and hassle-free online immigration forms with DU Digital Global.',
  },
  '/schengen-tourist-visa': {
    title: 'Schengen Visa for Indians | Apply Online for Europe Travel!',
    description: 'Schengen visa for Indians to travel Europe. Online application, fast processing, expert help, and high approval support.',
  },

  // ─── Travel & Other Services ───
  '/swifttravels': {
    title: 'DU Travel Services | International Travel & Holiday Deals',
    description: 'Book international travel packages with DU Travel Services. Enjoy curated holiday tours, exclusive discounts, personalized planning, and expert support.',
  },


  // ─── Investor & Corporate ───
  '/investor-relation': {
    title: 'Investor Relations - Financial Statements & Reports | DU Digital',
    description: 'Access Dudigital Global\'s financial statements, annual reports, and compliance documents. Contact our team for investor grievances.',
  },

  // ─── Media & Content ───
  '/news-and-media': {
    title: 'News and Media | DU Digital Global',
    description: 'Stay updated with the latest news, press releases, and media coverage of DU Digital Global. Explore our achievements and industry contributions.',
  },
  '/events': {
    title: 'Events | DU Digital Global',
    description: 'Stay updated with the latest events, seminars, and industry gatherings hosted by DU Digital Global across the globe.',
  },
  '/video-gallery': {
    title: 'Video Gallery | DU Digital Global',
    description: 'Watch videos showcasing DU Digital Global\'s services, events, visa processing centers, and global reach across multiple countries.',
  },
  '/blogs': {
    title: 'Blogs | DU Digital Global',
    description: 'Read the latest blogs on visa tips, travel guides, immigration updates, company formation, and recruitment insights from DU Digital Global.',
  },
  '/tnh-magazine': {
    title: 'TnH Magazine | DU Digital Global',
    description: 'Explore TnH Magazine by DU Digital Global featuring travel insights, hospitality trends, and industry news from around the world.',
  },
  '/careers': {
    title: 'Careers at DU Digital Global | Join Our Team',
    description: 'Explore career opportunities at DU Digital Global. Join a global leader in visa, passport, and identity management services with offices worldwide.',
  },

  // ─── Legal ───
  '/terms-and-conditions': {
    title: 'Terms and Conditions | DU Digital Global',
    description: 'Read the terms and conditions governing the use of DU Digital Global\'s website and services. Understand your rights and responsibilities.',
  },
  '/cookie-policy': {
    title: 'Cookie Policy | DU Digital Global',
    description: 'Learn about how DU Digital Global uses cookies to enhance your browsing experience. Understand our cookie policy and your privacy options.',
  },
};

// Default fallback SEO data
const defaultSEO = {
  title: 'DU Digital Global | Visa, Immigration & Company Formation Services',
  description: 'DU Digital Global is a leading provider of visa, passport, identity management, company formation, and global recruitment services with 35+ centers worldwide.',
};

export { seoData, defaultSEO, BASE_URL, DEFAULT_OG_IMAGE };
