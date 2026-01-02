import { useState, useEffect } from "react";
import { Shield, Wallet, Clock, Lock, Check, X, FileText, Award, ThumbsUp, Users, Plus, Minus, ArrowRight, CheckCircle, Phone, Share2, Target } from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

// Default icons for dynamic content
const defaultIcons = [Shield, Wallet, Clock, Lock, FileText, Award, ThumbsUp, Users];
const benefitIcons = [Target, CheckCircle, Phone, Share2];

// Pricing features for comparison table (from original site)
const pricingFeatures = [
  "Identity verification",
  "Criminal Record Check", 
  "Bank Statement / Income Verification",
  "ITR Check",
  "Interpol Match"
];

const TenantVerification = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BackendURL}/api/forms/slug/tenant-and-domestic-help-verification`);
      if (!response.ok) throw new Error("Failed to fetch form data");
      const data = await response.json();
      setFormData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${BackendImagesURL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  if (loading) return <LoadingState message="Loading verification details..." fullScreen />;
  if (error) return <ErrorState error={error} onRetry={fetchFormData} showHomeButton fullScreen />;

  const { name, description, pricingPlans = [], faqs = [], contentSections = {} } = formData || {};

  // Get sections by exact API keys
  const whyChooseSection = contentSections['Why Choose DuVerify Platform?'] || [];
  const benefitsSection = contentSections['Key Benefits'] || [];
  const howItWorksSection = contentSections['How It Works?'] || [];
  const deliverablesSection = contentSections['Deliverables'] || [];

  // Parse description for hero
  const descParts = description?.split('\n') || [];
  const heroTitle = descParts[0] || name || 'Tenant Verification';
  const heroSubtitle = descParts[1] || '';

  // Static services list with red checkmarks
  const services = ["Tenants", "Domestic Helps", "Driver", "Nanny"];

  // Plan colors matching original site exactly
  const planColors = [
    { bg: '#0E652E', name: 'Basic' },    // Forest Green
    { bg: '#003366', name: 'Standard' }, // Dark Navy Blue  
    { bg: '#7D0000', name: 'Premium' }   // Deep Burgundy Red
  ];

  const getPlanColor = (index, planName) => {
    const name = planName?.toLowerCase() || '';
    if (name.includes('basic') || name.includes('pricing')) return planColors[0];
    if (name.includes('standard')) return planColors[1];
    if (name.includes('premium')) return planColors[2];
    return planColors[index % 3];
  };

  // Feature availability by plan
  const getFeatureAvailability = (planName, featureIndex) => {
    const name = planName?.toLowerCase() || '';
    if (name.includes('basic') || name.includes('pricing')) return featureIndex <= 1;
    if (name.includes('standard')) return featureIndex <= 2;
    return true;
  };

  // Static benefits data (fallback)
  const staticBenefits = [
    { icon: Target, title: "Peace of Mind", desc: "Ensure tenants, drivers, maids, and nannies are thoroughly verified." },
    { icon: CheckCircle, title: "Fast & Accurate", desc: "Results delivered within 4–6 hours for timely decisions." },
    { icon: Phone, title: "Reliable Support", desc: "Our team ensures you're supported at every step." },
    { icon: Share2, title: "Easy Sharing", desc: "Share verification reports instantly with others." }
  ];

  return (
    <div className="bg-white font-sans">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full min-h-[90vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${getImageUrl(formData?.image) || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'})` }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,45,92,0.9) 0%, rgba(0,0,0,0.8) 100%)' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 min-h-[90vh] flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Comprehensive Verification for Tenants, Drivers, Maids, and Nannies by{' '}
            
               <img src="/DU-Verify-logo.png" width={200} alt="" />
              
            </h1>
            <p className="text-xl md:text-2xl font-semibold mb-8" style={{ color: '#A10000' }}>
              Secure your Home & Loved Ones with Instant Background Verification
            </p>
            
          
            
            <button 
              className="px-10 py-4 rounded-full font-bold text-lg text-white transition-all duration-300 hover:opacity-90 shadow-lg"
              style={{ backgroundColor: '#A10000' }}
            >
              Get Started Today – Verify Now
            </button>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE DUVERIFY SECTION ===== */}
      {whyChooseSection.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose <span style={{ color: '#A10000' }}>DuVerify</span> Platform?
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#A10000' }}></div>
            </div>
            
            {whyChooseSection.map((item, index) => (
              <div key={item._id || index} className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Protect your home and family with our comprehensive background screening
                  </h3>
                  <div 
                    className="text-gray-600 text-lg leading-relaxed mb-8"
                    dangerouslySetInnerHTML={{ __html: item.contentHtml?.replace(/\r\n/g, '<br/>') }}
                  />
                  
                  {/* Services List */}
                  <ul className="space-y-3">
                    {services.map((service, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#A10000' }}>
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-gray-700 font-medium">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center">
                  {item.image && (
                    <img 
                      src={getImageUrl(item.image)} 
                      alt={item.title} 
                      className="max-w-full h-auto rounded-2xl shadow-lg"
                      style={{ maxHeight: '450px' }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== KEY BENEFITS SECTION ===== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Key Benefits</h2>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#A10000' }}></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(benefitsSection.length > 0 ? benefitsSection : staticBenefits).map((benefit, index) => {
              const IconComponent = benefitIcons[index % benefitIcons.length];
              const isApiData = !!benefit._id;
              return (
                <div
                  key={benefit._id || index}
                  className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex justify-center mb-6">
                    {isApiData && benefit.image ? (
                      <img src={getImageUrl(benefit.image)} alt={benefit.title} className="w-16 h-16 object-contain" />
                    ) : (
                      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ border: '2px solid #A10000' }}>
                        <IconComponent className="w-8 h-8" style={{ color: '#A10000' }} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {isApiData ? benefit.title : benefit.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {isApiData ? (
                      <span dangerouslySetInnerHTML={{ __html: benefit.contentHtml }} />
                    ) : benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PRICING PLANS - COMPARISON TABLE ===== */}
      {pricingPlans.length > 0 && (
        <section className="py-24 bg-white" id="price_table">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#A10000' }}></div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-6 px-6 text-left text-gray-500 font-medium text-sm uppercase tracking-wider" style={{ width: '40%' }}>
                      Features
                    </th>
                    {pricingPlans.map((plan, index) => {
                      const color = getPlanColor(index, plan.planName);
                      return (
                        <th key={plan._id || index} className="py-6 px-4 text-center">
                          <span 
                            className="inline-block px-6 py-2 rounded-lg text-white font-bold text-lg"
                            style={{ backgroundColor: color.bg }}
                          >
                            {plan.planName}
                          </span>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {pricingFeatures.map((feature, fIndex) => (
                    <tr key={fIndex} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-5 px-6 text-gray-700 font-medium">{feature}</td>
                      {pricingPlans.map((plan, pIndex) => {
                        const isAvailable = getFeatureAvailability(plan.planName, fIndex);
                        return (
                          <td key={plan._id || pIndex} className="py-5 px-4 text-center">
                            {isAvailable ? (
                              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-sm">
                                <Check className="w-5 h-5 text-white" strokeWidth={3} />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mx-auto shadow-sm">
                                <X className="w-5 h-5 text-white" strokeWidth={3} />
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  
                  {/* Price Row */}
                  <tr className="border-t-2 border-gray-200 bg-gray-50">
                    <td className="py-8 px-6 text-gray-700 font-bold">Price / Verification*</td>
                    {pricingPlans.map((plan, index) => {
                      // Use exact prices from original site
                      const exactPrices = { basic: 599, standard: 999, premium: 1199 };
                      const planNameLower = plan.planName?.toLowerCase() || '';
                      let price = plan.price;
                      if (planNameLower.includes('basic') || planNameLower.includes('pricing')) price = exactPrices.basic;
                      else if (planNameLower.includes('standard')) price = exactPrices.standard;
                      else if (planNameLower.includes('premium')) price = exactPrices.premium;
                      return (
                        <td key={plan._id || index} className="py-8 px-4 text-center">
                          <span className="text-4xl font-bold text-gray-900">₹ {price}</span>
                        </td>
                      );
                    })}
                  </tr>
                  
                  {/* Button Row */}
                  <tr className="bg-gray-50">
                    <td className="py-6 px-6"></td>
                    {pricingPlans.map((plan, index) => {
                      const color = getPlanColor(index, plan.planName);
                      return (
                        <td key={plan._id || index} className="py-6 px-4 text-center">
                          <button
                            className="px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 hover:opacity-90 shadow-lg"
                            style={{ backgroundColor: color.bg }}
                          >
                            Choose Plan
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-center text-gray-400 mt-8 text-sm">
              *Government Fee: Additional charges may apply. T&C Apply
            </p>
          </div>
        </section>
      )}

      {/* ===== HOW IT WORKS SECTION ===== */}
      {howItWorksSection.length > 0 && (
        <section className="py-24" style={{ backgroundColor: '#111111' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left Side - Title and Steps */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works?</h2>
                {howItWorksSection[0]?.badge?.text && (
                  <p className="text-blue-400 mb-8">{howItWorksSection[0].badge.text}</p>
                )}
                <div className="w-20 h-1 mb-10" style={{ backgroundColor: '#A10000' }}></div>
                
                {/* Steps Card */}
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  {howItWorksSection.map((item, index) => {
                    const steps = item.contentHtml?.split(/\r?\n/).filter(line => line.trim()) || [];
                    return (
                      <div key={item._id || index} className="space-y-6">
                        {steps.map((step, stepIdx) => (
                          <div key={stepIdx} className="flex gap-5 items-start">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 text-white"
                              style={{ backgroundColor: '#A10000' }}
                            >
                              {stepIdx + 1}
                            </div>
                            <div className="flex-1 pt-1">
                              <p className="text-gray-800 font-medium">{step}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Right Side - Image */}
              <div className="flex justify-center">
                {howItWorksSection[0]?.image ? (
                  <img 
                    src={getImageUrl(howItWorksSection[0].image)} 
                    alt="Verification Process" 
                    className="max-w-full h-auto rounded-2xl shadow-2xl"
                    style={{ maxHeight: '500px' }}
                  />
                ) : (
                  <div className="bg-white rounded-2xl p-12 shadow-2xl">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                        <Check className="w-12 h-12 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-3xl font-bold text-gray-900">VERIFIED</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== DELIVERABLES SECTION ===== */}
      {deliverablesSection.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#003366' }}>Deliverables</h2>
              {deliverablesSection[0]?.badge?.text && (
                <p className="text-gray-500 mt-4">{deliverablesSection[0].badge.text}</p>
              )}
              <div className="w-24 h-1 mx-auto mt-4" style={{ backgroundColor: '#A10000' }}></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliverablesSection.map((item, index) => (
                <div
                  key={item._id || index}
                  className="relative h-64 rounded-xl overflow-hidden group cursor-pointer"
                >
                  {item.image ? (
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${getImageUrl(item.image)})` }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                  )}
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors" />
                  <div className="relative h-full flex flex-col items-center justify-center text-white p-6 text-center">
                    <h3 className="text-xl font-bold uppercase tracking-wider mb-3">{item.title}</h3>
                    <p className="text-gray-200 text-sm" dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ SECTION - RED ACCORDION STYLE (matching original) ===== */}
    {faqs.length > 0 && (
        <section className="bg-white py-24">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

                {/* LEFT CONTENT */}
                <div>
                    <h2 className="text-4xl font-bold leading-tight mb-6">
                        Any questions? <br />
                        We got you.
                    </h2>

                    <p className="text-gray-500 max-w-md mb-6">
                        Yet bed any for assistance indulgence unpleasing. Not thoughts all
                        exercise blessing. Indulgence way everything joy alteration
                        boisterous the attachment.
                    </p>

                    <a
                        href="#"
                        className="inline-flex items-center text-[#FF1033] font-medium hover:underline"
                    >
                        More FAQs →
                    </a>
                </div>

                {/* RIGHT FAQ LIST */}
                <div className="divide-y">
                    {faqs.map((item, index) => (
                        <div key={index} className="py-6">
                            <button
                            
                                                        onClick={() => toggleFaq(index)}

                                
                                className="w-full flex justify-between items-center text-left"
                            >
                                <span className="text-lg font-semibold text-gray-900">
                                    {item.question}
                                </span>

                                <span className="text-2xl text-gray-500">
                                    {openFaqIndex === index ? "−" : "+"}
                                </span>
                            </button>

                            {openFaqIndex === index && (
                                <p className="mt-4 text-gray-500 max-w-xl">
                                    {item.answer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    
      )}

  
    </div>
  );
};

export default TenantVerification;
