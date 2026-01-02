import { useState, useEffect } from "react";
import { 
  Check, 
  ChevronDown,
  ChevronUp,
  FileText, 
  CreditCard, 
  Mail, 
  Plane,
  Shield,
  Globe,
  Clock,
  Users,
  Phone
} from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

const IndianEvisa = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [openDocIndex, setOpenDocIndex] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [visaType, setVisaType] = useState('tourist');

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BackendURL}/api/forms/slug/india-evisa`);
      if (!response.ok) throw new Error("Failed to fetch form data");
      const data = await response.json();
      setFormData(data);
      
      // Initialize form values
      const initialValues = {};
      data.fields?.forEach(field => {
        initialValues[field.name] = '';
      });
      setFormValues(initialValues);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const toggleDoc = (index) => {
    setOpenDocIndex(openDocIndex === index ? null : index);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${BackendImagesURL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formValues, visaType });
  };

  if (loading) return <LoadingState message="Loading eVisa information..." fullScreen />;
  if (error) return <ErrorState error={error} onRetry={fetchFormData} showHomeButton fullScreen />;

  const { 
    name, 
    description, 
    fields = [], 
    faqs = [], 
    documents = [],
    contentSections = {},
  } = formData || {};

  // Get sections
  const heroSection = contentSections['hero'] || [];
  const applicationProcessSection = contentSections['E-VISA APPLICATION PROCESS'] || [];

  // Process steps with icons
  const processSteps = [
    { icon: FileText, title: "Apply Online", desc: "Upload Photo and Passport Page" },
    { icon: CreditCard, title: "Pay eVisa Fee", desc: "Online Using Credit / Debit card / Payment Wallet" },
    { icon: Mail, title: "Receive ETA Online", desc: "Electronic Travel Authorization Will be sent to your e-mail" },
    { icon: Plane, title: "Fly to India", desc: "Present your ETA at the airport" }
  ];

  // Why choose us features
  const whyChooseFeatures = [
    { icon: Shield, title: "Trusted & Secure", desc: "100% secure processing with data protection" },
    { icon: Clock, title: "Fast Processing", desc: "Quick turnaround time for your eVisa" },
    { icon: Users, title: "Expert Support", desc: "24/7 customer support available" },
    { icon: Globe, title: "Global Reach", desc: "Serving travelers from 150+ countries" }
  ];

  // Quick support countries
  const supportCountries = [
    { name: "South Korea", code: "+82" },
    { name: "Thailand", code: "+66" },
    { name: "India", code: "+91" }
  ];

  return (
    <div className="bg-white font-sans">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full min-h-[85vh] overflow-hidden">
        {/* Dark textured background */}
        <div 
          className="absolute inset-0"
          style={{ 
        
            backgroundImage: `url(${BackendImagesURL}${formData?.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 3
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Content */}
            <div className="text-white pt-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Apply eVisa<br />for <span style={{ color: '#e63938' }}>India</span>
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-lg">
                Simplified Travel to India for Global Travelers. Get your eVisa quickly and easily with our streamlined process.
              </p>
              
              {/* Quick Support Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="w-5 h-5" style={{ color: '#e63938' }} />
                  <span className="text-white font-semibold">Call Us For Quick Support</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {supportCountries.map((country, idx) => (
                    <button 
                      key={idx}
                      className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: '#e63938' }}
                    >
                      {country.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Form Card - Dark Semi-transparent */}
            <div 
              className="rounded-[20px] p-8 lg:p-10"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.67)' }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Apply for India E-visa</h2>
              
              <form onSubmit={handleSubmit}>
                {/* Two Column Grid for Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  {fields.filter(f => f.isActive).sort((a, b) => a.order - b.order).map((field) => (
                    <div key={field._id}>
                      {field.type === 'select' ? (
                        <select
                          name={field.name}
                          value={formValues[field.name] || ''}
                          onChange={handleInputChange}
                          required={field.required}
                          className="w-full h-[46px] px-4 text-xs bg-white rounded-[7px] focus:ring-2 focus:ring-red-500 focus:outline-none transition-colors"
                          style={{ border: '0.8px solid #dadbdd' }}
                        >
                          <option value="">{field.placeholder || `Select ${field.label}`}</option>
                          {field.options?.map((opt) => (
                            <option key={opt._id || opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formValues[field.name] || ''}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                          required={field.required}
                          className="w-full h-[46px] px-4 text-xs bg-white rounded-[7px] focus:ring-2 focus:ring-red-500 focus:outline-none transition-colors placeholder:text-[#606266]"
                          style={{ border: '0.8px solid #dadbdd' }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Visa Type Radio Buttons */}
                <div className="mb-5">
                  <label className="block text-white text-sm font-medium mb-3">
                    Visa Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div 
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          visaType === 'tourist' ? 'border-red-600 bg-red-600' : 'border-gray-400 bg-transparent'
                        }`}
                        onClick={() => setVisaType('tourist')}
                      >
                        {visaType === 'tourist' && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="text-white text-sm">Tourist e-Visa</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div 
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          visaType === 'business' ? 'border-red-600 bg-red-600' : 'border-gray-400 bg-transparent'
                        }`}
                        onClick={() => setVisaType('business')}
                      >
                        {visaType === 'business' && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="text-white text-sm">Business e-Visa</span>
                    </label>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div 
                      className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: '#c62625' }}
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-white text-xs leading-relaxed">
                      I agree to receive communication regarding my visa application and promotional offers from DU Global
                    </span>
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="px-8 py-3 rounded-[7px] font-semibold text-white text-base transition-all duration-300 hover:opacity-90"
                  style={{ 
                    backgroundColor: '#c62625',
                    border: '0.8px solid #bd2727'
                  }}
                >
                  Submit Form
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXPLORE WONDERS SECTION ===== */}
      {heroSection.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {heroSection.map((item, index) => (
              <div key={item._id || index} className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h2>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#e63938' }}></div>
                  <div 
                    className="text-gray-600 leading-relaxed text-lg"
                    dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                  />
                </div>
                <div className="relative">
                  {item.image && (
                    <div className="relative">
                      <img 
                        src={getImageUrl(item.image)} 
                        alt={item.title} 
                        className="rounded-2xl shadow-xl w-full object-cover"
                        style={{ maxHeight: '450px' }}
                      />
                      {/* Badge overlay */}
                      {item.badge?.text && (
                        <div 
                          className="absolute -top-14 -right-4 w-28 h-28 flex flex-col items-center justify-center text-white text-center shadow-lg"
                          style={{ backgroundColor: item.badge.background || '#e63938' }}
                        >
                          <span className="text-xs font-medium leading-tight px-2">{item.badge.text}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== ELIGIBILITY SECTION ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Eligibility for India eVisa
            </h2>
            <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#e63938' }}></div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="space-y-4">
              {[
                "Nationals of countries listed are eligible to apply for e-Visa Services.",
                "Foreigners whose sole objective for visiting India is Recreation and sightseeing.",
                "Casual visit to meet friends and relatives.",
                "Attending short term yoga programme or short term courses on local languages, music, dance, arts & crafts, cooking, medicine etc.",
                "Courses not exceeding 6 months duration and not issuing a qualifying certificate/diploma etc. to the participants.",
                "Voluntary work of short duration (for a maximum period of one month).",
                "Medical treatment, including treatment under Indian systems of medicine.",
                "Business purpose or attending a conference/seminar/workshop."
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: '#e63938' }}
                  >
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY DU GLOBAL SECTION ===== */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#111111' }}>
        {/* Decorative curved lines on left */}
        <div className="absolute left-0 top-0 h-full w-1/3 opacity-20 pointer-events-none">
          <svg viewBox="0 0 400 800" className="h-full" preserveAspectRatio="xMinYMid slice">
            <path d="M-100,0 Q200,200 100,400 T-100,800" stroke="#444" strokeWidth="1" fill="none"/>
            <path d="M-50,0 Q250,200 150,400 T-50,800" stroke="#444" strokeWidth="1" fill="none"/>
            <path d="M0,0 Q300,200 200,400 T0,800" stroke="#444" strokeWidth="1" fill="none"/>
            <path d="M50,0 Q350,200 250,400 T50,800" stroke="#444" strokeWidth="1" fill="none"/>
            <path d="M100,0 Q400,200 300,400 T100,800" stroke="#444" strokeWidth="1" fill="none"/>
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Heading & Description */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Why DU GLOBAL is your trusted partner
              </h2>
              <div className="w-10 h-1 mb-6" style={{ backgroundColor: '#A10000' }}></div>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Experience unmatched expertise, reliable support, and tailored solutions with DU Global. We simplify complex processes and deliver results you can trust, making us the preferred choice for thousands worldwide.
              </p>
              <button 
                className="px-8 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#A10000' }}
              >
                About Us
              </button>
            </div>

            {/* Right Side - 2x2 Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Shield, title: "Quality and Value", desc: "Quality Beyond Compromise, Value That Is Unmatched." },
                { icon: Users, title: "Services", desc: "Service that exceeds expectations." },
                { icon: Globe, title: "Security", desc: "The utmost security of our clients data is paramount for us." },
                { icon: Clock, title: "Technology", desc: "Optimum use of evolving technology to strengthen our portfolio and service mechanism." }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-start gap-4"
                  >
                    {/* Red Square Icon Box */}
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#A10000' }}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== E-VISA APPLICATION PROCESS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              E-VISA APPLICATION PROCESS
            </h2>
            <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#e63938' }}></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(applicationProcessSection.length > 0 
              ? applicationProcessSection.sort((a, b) => a.order - b.order).map((step, idx) => ({
                  icon: processSteps[idx]?.icon || FileText,
                  title: step.title,
                  desc: step.contentHtml
                }))
              : processSteps
            ).map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Dashed connector line */}
                  {index < 3 && (
                    <div 
                      className="hidden lg:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed"
                      style={{ borderColor: '#e63938' }}
                    />
                  )}
                  
                  <div className="bg-gray-50 rounded-xl p-6 text-center relative shadow-md hover:shadow-lg transition-shadow">
                    {/* Step number badge */}
                    <div 
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                      style={{ backgroundColor: '#e63938' }}
                    >
                      {index + 1}
                    </div>
                    
                    <div className="pt-6">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-red-50"
                      >
                        <IconComponent className="w-8 h-8" style={{ color: '#e63938' }} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-500 text-sm">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== DOCUMENTS REQUIRED ===== */}
      {documents.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Documents Required
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#e63938' }}></div>
            </div>

            <div className="space-y-4">
              {documents.filter(d => d.isActive).sort((a, b) => a.order - b.order).map((doc, index) => (
                <div 
                  key={doc._id || index}
                  className="rounded-xl overflow-hidden shadow-md"
                >
                  <button
                    onClick={() => toggleDoc(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left text-white font-bold transition-colors duration-200"
                    style={{ backgroundColor: '#e63938' }}
                  >
                    <span className="text-lg">{doc.title}</span>
                    {openDocIndex === index ? (
                      <ChevronUp className="w-6 h-6 text-white flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-white flex-shrink-0" />
                    )}
                  </button>
                  
                  {openDocIndex === index && (
                    <div className="px-6 py-6 bg-white">
                      <div className="space-y-3">
                        {doc.description?.split('\n').filter(line => line.trim()).map((line, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div 
                              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ backgroundColor: '#e63938' }}
                            >
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </div>
                            <p className="text-gray-600">{line.trim()}</p>
                          </div>
                        ))}
                      </div>
                      {doc.isMandatory && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <span className="text-sm text-red-600 font-medium">* Mandatory Documents</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ SECTION ===== */}
      {faqs.length > 0 && (
        // <section className="py-20 bg-white">
        //   <div className="max-w-4xl mx-auto px-6">
        //     <div className="text-center mb-12">
        //       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        //         Frequently Asked Questions
        //       </h2>
        //       <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#e63938' }}></div>
        //     </div>

        //     <div className="space-y-4">
        //       {faqs.filter(f => f.isActive).map((faq, index) => (
        //         <div 
        //           key={faq._id || index}
        //           className="rounded-xl overflow-hidden shadow-md"
        //         >
        //           <button
        //             onClick={() => toggleFaq(index)}
        //             className="w-full px-6 py-5 flex items-center justify-between text-left text-white font-bold transition-colors duration-200"
        //             style={{ backgroundColor: '#e63938' }}
        //           >
        //             <span className="pr-4">{faq.question}</span>
        //             {openFaqIndex === index ? (
        //               <ChevronUp className="w-6 h-6 text-white flex-shrink-0" />
        //             ) : (
        //               <ChevronDown className="w-6 h-6 text-white flex-shrink-0" />
        //             )}
        //           </button>
                  
        //           {openFaqIndex === index && (
        //             <div className="px-6 py-6 bg-white">
        //               <div className="text-gray-600 leading-relaxed whitespace-pre-line">
        //                 {faq.answer}
        //               </div>
        //             </div>
        //           )}
        //         </div>
        //       ))}
        //     </div>
        //   </div>
        // </section>
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
                    {faqs.filter(f => f.isActive).map((item, index) => (
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

export default IndianEvisa;
