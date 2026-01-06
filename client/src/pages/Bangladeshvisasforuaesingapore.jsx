import { useState, useEffect } from "react";
import { Loader2, Check } from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";
import OurFootprints from "../components/home/OurFootprints";
import IsoCertificates from "../components/home/IsoCertificates";
import homeData from "../data/homedata.json"; // Ensure filename case matches
import { Link } from "react-router-dom";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

const BangladeshVisasForUaeSingapore = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Static partners data (reused from Completionsetup)
  const partners = [
    { name: "Meydan FZ", logo: "assets/company-setup/meydan.png" },
    { name: "RAKEZ", logo: "assets/company-setup/rakez.png" },
    { name: "IFZA", logo: "assets/company-setup/ifza.png" },
    { name: "SPC Free Zone", logo: "assets/company-setup/spc.png" },
  ];

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BackendURL}/api/forms/slug/bangladesh-visas-for-uae-singapore`);
      if (!response.ok) throw new Error("Failed to fetch form data");
      const data = await response.json();
      setFormData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/api/')) return `${BackendURL}${imagePath}`;
    if (imagePath.startsWith('/uploads/')) return `${BackendURL}/api${imagePath}`;
    return `${BackendImagesURL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      const response = await fetch(`${BackendURL}/api/form-submissions/slug/bangladesh-visas-for-uae-singapore`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const res = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your application has been submitted successfully.');
        setFormValues({});
      } else {
        setSubmitStatus('error');
        setSubmitMessage(res.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setSubmitMessage('Failed to submit. Please check your connection and try again.');
    } finally {
      setSubmitLoading(false);
      setTimeout(() => { setSubmitStatus(null); setSubmitMessage(''); }, 5000);
    }
  };

  if (loading) return <LoadingState message="Loading Content..." fullScreen />;
  if (error) return <ErrorState error={error} onRetry={fetchFormData} showHomeButton fullScreen />;

  const { fields = [], contentSections = {}, documents = [], faqs = [] } = formData || {};

  // Extract sections
  const globalExpertsSection = contentSections['Global Experts in'] || [];
  const weCaterSection = contentSections['We cater visas for Bangladesh Residents travelling to'] || [];
  const companySetupSection = contentSections['Company Setup in UAE'] || [];

  return (
    <div className="bg-white font-sans">
      
      {/* ===== HERO SECTION ===== */}
      <section 
        className="relative w-full h-[800px] bg-cover bg-center flex items-center justify-center"
        style={{ 
          backgroundImage: formData?.image ? `url(${getImageUrl(formData.image)})` : 'none'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center max-w-5xl px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            UAE, Ireland & Singapore Visas for <br/> <span className="text-[#E31E24]">Bangladeshi Citizens</span>
          </h1>
          <p className="text-xl text-gray-200">
             Seamless Visa Solutions for Global Travel
          </p>
        </div>
      </section>

      {/* ===== GLOBAL EXPERTS SECTION (Text + Video) ===== */}
      {globalExpertsSection.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {globalExpertsSection.map((item, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Global Experts in <span className="text-[#E31E24]">{item.title}</span>
                  </h2>
                  <div className="prose max-w-none text-gray-700 leading-relaxed">
                    {item.contentHtml && item.contentHtml.split('\n').map((p, i) => (
                      <p key={i} className="mb-4">{p}</p>
                    ))}
                  </div>
                </div>
                <div className="order-1 md:order-2">
                   {item.youtubeUrl ? (
                     <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                       <iframe 
                         src={item.youtubeUrl} 
                         title="YouTube video player" 
                         className="w-full h-full"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                         allowFullScreen
                       ></iframe>
                     </div>
                   ) : item.images?.[0] ? (
                      <img 
                        src={getImageUrl(item.images[0])} 
                        alt="Global Experts" 
                        className="rounded-xl shadow-lg w-full h-auto"
                      />
                   ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== WE CATER VISAS SECTION (Grid of Cards/Images) ===== */}
      {weCaterSection.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
             <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                 We cater visas for <span className="text-[#E31E24]">Bangladesh Residents</span> travelling to
               </h2>
             </div>
             
             <div className="grid md:grid-cols-3 gap-8">
               {weCaterSection.map((item, index) => (
                 <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    {item.images?.[0] && (
                      <div className="h-64 overflow-hidden">
                        <img 
                          src={getImageUrl(item.images[0])} 
                          alt={item.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      {item.title && !(item.title.includes('We cater')) && (
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                      )}
                      {item.contentHtml && (
                        <p className="text-gray-600 leading-relaxed">{item.contentHtml}</p>
                      )}
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </section>
      )}

      {/* ===== FORM SECTION ===== */}
      {fields.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Start Your Application</h2>
              <p className="text-center text-gray-500 mb-8">Fill in the details below to proceed</p>
              
              {submitStatus && (
                <div className={`p-4 mb-6 rounded-lg ${submitStatus === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {fields.map((field, index) => {
                    const isFullWidth = field.type === 'textarea' || field.type === 'select' && field.name.length > 20;

                    if (field.type === 'select' || field.type === 'dropdown') {
                      return (
                        <div key={field._id || index} className={isFullWidth ? "md:col-span-2" : ""}>
                          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </label>
                          <select
                            name={field.name}
                            value={formValues[field.name] || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                            required={field.required}
                          >
                            <option value="">Select Option</option>
                            {field.options?.map((opt, optIdx) => (
                              <option key={opt._id || optIdx} value={opt.value || opt.label || opt}>
                                {opt.label || opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    }
                    
                    return (
                      <div key={field._id || index} className={isFullWidth ? "md:col-span-2" : ""}>
                         <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </label>
                        <input
                          type={field.type || 'text'}
                          name={field.name}
                          value={formValues[field.name] || ''}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                          required={field.required}
                        />
                      </div>
                    );
                  })}
                </div>
                
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full py-4 rounded-full font-bold text-lg transition-all duration-300 hover:opacity-90 disabled:opacity-70 flex items-center justify-center gap-2 mt-8 text-white"
                  style={{ backgroundColor: '#2D1F1F', color: '#E31E24' }} 
                >
                  {submitLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* ===== OUR PARTNERS SECTION ===== */}
      <section className="py-20 bg-black">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Our <span className="text-[#E31E24]">Partners</span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-xl flex items-center justify-center w-[160px] h-[100px] hover:scale-105 transition-transform duration-300 p-4"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPANY SETUP INFO ===== */}
      {companySetupSection.length > 0 && companySetupSection.map((item, index) => (
         <section key={index} className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
              <div>
                 {item.images?.[0] && (
                    <img 
                      src={getImageUrl(item.images[0])} 
                      alt="Company Setup" 
                      className="rounded-xl shadow-lg w-full"
                    />
                 )}
              </div>
              <div>
                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    {item.title}
                 </h2>
                 <div className="prose max-w-none text-gray-700 leading-relaxed">
                   {item.contentHtml}
                 </div>
              </div>
            </div>
         </section>
      ))}

      {/* ===== FOOTPRINTS & ISO ===== */}
      <OurFootprints data={homeData.ourFootprintsSection} />
      <IsoCertificates data={homeData.certificationsSection} />

      {/* ===== DOCUMENTS SECTION (if exists) ===== */}
      {documents.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Documents Required</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#E31E24]">
                  <h3 className="font-semibold text-gray-800 mb-2">{doc.title}</h3>
                  <p className="text-gray-600 text-sm">{doc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

       {/* ===== FAQ SECTION (if exists) ===== */}
       {faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default BangladeshVisasForUaeSingapore;