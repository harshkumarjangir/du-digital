import { useState, useEffect } from "react";
import { CheckCircle, Phone, MapPin, Mail } from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

const Companysetup = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BackendURL}/api/forms/slug/company-setup-in-the-uae`);
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
    // Handle /api/ paths - use BackendURL directly
    if (imagePath.startsWith('/api/')) {
      return `${BackendURL}${imagePath}`;
    }
    // Handle /uploads/ paths
    if (imagePath.startsWith('/uploads/')) {
      return `${BackendURL}/api${imagePath}`;
    }
    return `${BackendImagesURL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  if (loading) return <LoadingState message="Loading Company Setup..." fullScreen />;
  if (error) return <ErrorState error={error} onRetry={fetchFormData} showHomeButton fullScreen />;

  const { name, description, documents = [], fields = [], contentSections = {} } = formData || {};

  // Get sections by API keys
  const heroSection = contentSections['hero'] || [];
  const mainlandSection = contentSections['Company Formation in the Mainland'] || [];
  const freezoneSection = contentSections['Company Formation in Freezone'] || [];
  const strengthSection = contentSections['Our Strength'] || [];
  const benefitsSection = contentSections['Benefits of Establishing a Business in the UAE'] || [];
  const licenseTypesSection = contentSections['Types of Business License in the UAE'] || [];
  const entityOptionsSection = contentSections['Entity Options for Free Zone Company Setup in the UAE'] || [];
  const stepsSection = contentSections['Steps to Set Up a Business in the UAE Free Zones'] || [];

  // Parse hero description for badges
  const heroBadges = description?.split('\r\n').filter(line => line.trim()) || [];

  return (
    <div className="bg-white font-sans">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full min-h-[85vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${getImageUrl(formData?.image) || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'})` }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 min-h-[85vh] flex items-center">
          <div className={`${fields.length > 0 ? 'grid md:grid-cols-2 gap-12 items-center' : ''} w-full`}>
            {/* Left - Hero Text */}
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {name || 'Company Formation in Dubai UAE'}
              </h1>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                {heroBadges.map((badge, index) => (
                  <span key={index} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20">
                    {badge}
                  </span>
                ))}
              </div>
              
              <a 
                href="#consultation"
                className="inline-block px-8 py-4 rounded-lg font-bold text-lg text-white transition-all duration-300 hover:opacity-90 shadow-lg"
                style={{ backgroundColor: '#A10000' }}
              >
                Book A Free Consultation
              </a>
            </div>
            
            {/* Right - Contact Form (only show if fields exist) */}
            {fields.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Get Your Free Consultation</h3>
                <form className="space-y-4">
                  {fields.map((field, index) => {
                    // Get field type from either 'type' or 'fieldType' property
                    const fieldType = field.type || field.fieldType;
                    
                    // Render different input types based on field type
                    if (fieldType === 'select' || fieldType === 'dropdown') {
                      return (
                        <select
                          key={field._id || index}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none bg-white text-gray-700 appearance-none cursor-pointer"
                          required={field.required || field.isRequired}
                          defaultValue=""
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: 'right 0.75rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
                            paddingRight: '2.5rem'
                          }}
                        >
                          <option value="" disabled className="text-gray-400">{field.placeholder || field.label}</option>
                          {field.options?.map((opt, optIdx) => (
                            <option key={opt._id || optIdx} value={opt.value || opt}>
                              {opt.label || opt}
                            </option>
                          ))}
                        </select>
                      );
                    } else if (fieldType === 'textarea') {
                      return (
                        <textarea
                          key={field._id || index}
                          placeholder={field.placeholder || field.label}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none resize-none"
                          required={field.required || field.isRequired}
                        />
                      );
                    } else {
                      // Default text/email/tel input
                      const inputType = fieldType === 'email' ? 'email' 
                        : fieldType === 'phone' ? 'tel' 
                        : fieldType === 'number' ? 'number'
                        : 'text';
                      return (
                        <input
                          key={field._id || index}
                          type={inputType}
                          placeholder={field.placeholder || field.label}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                          required={field.required || field.isRequired}
                        />
                      );
                    }
                  })}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-lg font-bold text-white text-lg transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: '#A10000' }}
                  >
                    Submit Enquiry
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== TAKE THE FIRST STEP SECTION ===== */}
      {heroSection.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {heroSection.map((item, index) => (
              <div key={item._id || index} className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    {item.title}
                  </h2>
                  <div className="text-gray-600 leading-relaxed space-y-4">
                    {item.contentHtml?.split('\r\n\r\n').map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center">
                  {item.image && (
                    <img 
                      src={getImageUrl(item.image)} 
                      alt={item.title} 
                      className="max-w-full h-auto rounded-xl shadow-lg"
                      style={{ maxHeight: '400px' }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== COMPANY FORMATION IN MAINLAND SECTION - Background Image ===== */}
      {mainlandSection.length > 0 && mainlandSection.map((item, index) => (
        <section 
          key={item._id || index}
          className="py-20 relative min-h-[500px]"
        >
          {/* Background Image */}
          {item.image && (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${getImageUrl(item.image)})` }}
            />
          )}
          <div className="absolute inset-0 bg-black/80" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Company <span style={{ color: '#A10000' }}>Formation</span> in the Mainland
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4 text-center">
              {item.contentHtml?.split('\r\n\r\n').filter(p => p.trim()).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ===== COMPANY FORMATION IN FREEZONE SECTION ===== */}
      {freezoneSection.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {freezoneSection.map((item, index) => (
              <div key={item._id || index} className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 flex justify-center">
                  {item.image && (
                    <img 
                      src={getImageUrl(item.image)} 
                      alt={item.title} 
                      className="max-w-full h-auto rounded-xl shadow-lg"
                      style={{ maxHeight: '400px' }}
                    />
                  )}
                </div>
                <div className="order-1 md:order-2">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Company Formation in <span style={{ color: '#A10000' }}>Freezone</span>
                  </h2>
                  <div className="text-gray-600 leading-relaxed space-y-4">
                    {item.contentHtml?.split('\r\n\r\n').filter(p => p.trim()).map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== OUR STRENGTH SECTION ===== */}
      {strengthSection.length > 0 && (
        <section className="py-20" style={{ backgroundColor: '#f5f5f5' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Our <span style={{ color: '#A10000' }}>Strength</span>
              </h2>
              <div className="w-16 h-1 mx-auto" style={{ backgroundColor: '#A10000' }}></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {strengthSection.map((item, index) => (
                <div
                  key={item._id || index}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: 'rgba(161, 0, 0, 0.1)' }}
                  >
                    <CheckCircle className="w-8 h-8" style={{ color: '#A10000' }} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.contentHtml?.replace(/\r?\n/g, ' ').trim()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== BENEFITS SECTION ===== */}
      {benefitsSection.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {benefitsSection.map((item, index) => (
              <div key={item._id || index} className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Benefits of Establishing a <span style={{ color: '#A10000' }}>Business</span> in the UAE
                  </h2>
                  <ul className="space-y-3">
                    {item.contentHtml?.split('\r\n').filter(line => line.trim()).map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#A10000' }}>
                          <CheckCircle className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center">
                  {item.image && (
                    <img 
                      src={getImageUrl(item.image)} 
                      alt={item.title} 
                      className="max-w-full h-auto rounded-xl shadow-lg"
                      style={{ maxHeight: '400px' }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== TYPES OF BUSINESS LICENSE SECTION ===== */}
      {licenseTypesSection.length > 0 && (
        <section className="py-20" style={{ backgroundColor: '#f5f5f5' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Types of Business <span style={{ color: '#A10000' }}>License</span> in the UAE
              </h2>
              <div className="w-16 h-1 mx-auto" style={{ backgroundColor: '#A10000' }}></div>
            </div>
            
            {/* License Cards with Numbers */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {licenseTypesSection.map((item, index) => {
                const number = String(index + 1).padStart(2, '0');
                return (
                  <div
                    key={item._id || index}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow relative"
                  >
                    <div className="p-6 pb-16">
                      <div 
                        className="text-5xl font-bold mb-4"
                        style={{ color: '#A10000' }}
                      >
                        {number}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.contentHtml?.replace(/\r?\n/g, ' ').trim()}
                      </p>
                    </div>
                    
                    {/* Bottom red gradient decoration */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-12"
                      style={{ 
                        background: 'linear-gradient(to top, rgba(161,0,0,0.15) 0%, transparent 100%)'
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== ENTITY OPTIONS SECTION ===== */}
      {entityOptionsSection.length > 0 && (
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            {entityOptionsSection.map((item, index) => (
              <div key={item._id || index}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Entity Options for <span style={{ color: '#A10000' }}>Free Zone</span> Company Setup
                </h2>
                <div className="text-gray-300 leading-relaxed">
                  {item.contentHtml?.split('\r\n\r\n').filter(p => p.trim()).map((para, idx) => (
                    <p key={idx} className="mb-4">{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== STEPS TO SET UP SECTION ===== */}
      {stepsSection.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Steps to Set Up a <span style={{ color: '#A10000' }}>Business</span> in the UAE Free Zones
              </h2>
              <div className="w-16 h-1 mx-auto" style={{ backgroundColor: '#A10000' }}></div>
            </div>
            
            {/* Steps Grid - Horizontal scroll on mobile */}
            <div className="grid md:grid-cols-3 gap-6">
              {stepsSection.map((step, index) => (
                <div
                  key={step._id || index}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  {/* Image */}
                  <div className="h-48 overflow-hidden">
                    {step.image ? (
                      <img 
                        src={getImageUrl(step.image)} 
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div 
                      className="text-4xl font-bold mb-3"
                      style={{ color: '#A10000' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.contentHtml?.replace(/\r?\n/g, ' ').trim()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== DOCUMENTS REQUIRED SECTION ===== */}
      {documents.length > 0 && (
        <section className="py-20" style={{ backgroundColor: '#f5f5f5' }}>
          <div className="max-w-4xl mx-auto px-6">
            {documents.map((doc, index) => (
              <div key={doc._id || index}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                  {doc.title}
                </h2>
                <div className="bg-white rounded-xl p-8 shadow-md">
                  <ul className="space-y-4">
                    {doc.description?.split('\n').filter(line => line.trim()).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#A10000' }}>
                          <CheckCircle className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== CONTACT / SPEAK TO EXPERTS SECTION ===== */}
      <section id="consultation" className="py-20 bg-gray-900 flex flex-wrap justify-center gap-8 items-center">
        
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Speak to our Experts
            </h2>
          </div>
          
            {/* India Office */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 flex-1 min-w-[300px] max-w-[500px]">
              <h3 className="text-xl font-bold text-white mb-6">India Office</h3>
              <div className="space-y-4">
                <a href="tel:+911onal" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                  <Phone className="w-6 h-6" style={{ color: '#A10000' }} />
                  <span>+91-11-4777-2727</span>
                </a>
                <div className="flex items-start gap-4 text-gray-300">
                  <MapPin className="w-6 h-6 flex-shrink-0" style={{ color: '#A10000' }} />
                  <span>New Delhi, India</span>
                </div>
              </div>
            </div>
            
            {/* UAE Office */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 flex-1 min-w-[300px] max-w-[500px]">
              <h3 className="text-xl font-bold text-white mb-6">UAE Office</h3>
              <div className="space-y-4">
                <a href="tel:+97144505999" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                  <Phone className="w-6 h-6" style={{ color: '#A10000' }} />
                  <span>+971 4 450 5999</span>
                </a>
                <div className="flex items-start gap-4 text-gray-300">
                  <MapPin className="w-6 h-6 flex-shrink-0" style={{ color: '#A10000' }} />
                  <span>Dubai, UAE</span>
                </div>
              </div>
            </div>
     
    
      </section>
    </div>
  );
};

export default Companysetup;