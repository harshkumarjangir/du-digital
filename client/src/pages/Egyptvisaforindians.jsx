import { useState, useEffect } from "react";
import { Check, ChevronDown, MapPin, Clock, Wallet, Calendar, Plane, CheckCircle, XCircle, Loader2 } from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

const Egyptvisaforindians = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BackendURL}/api/forms/slug/egypt-visa-for-indians`);
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
    if (imagePath.startsWith('/api/')) {
      return `${BackendURL}${imagePath}`;
    }
    if (imagePath.startsWith('/uploads/')) {
      return `${BackendURL}/api${imagePath}`;
    }
    return `${BackendImagesURL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) return <LoadingState message="Loading Egypt Visa..." fullScreen />;
  if (error) return <ErrorState error={error} onRetry={fetchFormData} showHomeButton fullScreen />;

  const {
    description,
    fields = [],
    faqs = [],
    documents = [],
    contentSections = {},
    formImages = []
  } = formData || {};

  // Get content sections by API keys
  const introSection = contentSections['What Should Indians Know Before Visiting Egypt?'] || [];
  const centersSection = contentSections['Egypt Visa Application Centres for Indians Now in:'] || [];
  const travelTipsSection = contentSections['Essential Travel Tips for Indian Tourists Visiting Egypt'] || [];
  const destinationsSection = contentSections['Top Tourist Destinations in Egypt for Indian Travelers'] || [];
  const cuisineSection = contentSections['Egyptian Cuisine: A Taste Guide for Indian Travelers'] || [];
  const planningSection = contentSections['Are You Planning to Visit Egypt?'] || [];
  const visaOverviewSection = contentSections['Egypt Visa Overview: Types, Processing, Fees, and Validity'] || [];

  // Parse visa details from content
  const parseVisaDetails = (contentHtml) => {
    if (!contentHtml) return { single: {}, multiple: {} };
    const lines = contentHtml.split('\n').filter(l => l.trim());
    const details = { single: {}, multiple: {} };
    let currentType = 'single';

    lines.forEach(line => {
      if (line.toLowerCase().includes('multiple entry')) currentType = 'multiple';
      if (line.toLowerCase().includes('single entry')) currentType = 'single';
      if (line.includes('Processing time:')) details.processingTime = line.split(':')[1]?.trim();
      if (line.includes('Stay period:')) details[currentType].stayPeriod = line.split(':')[1]?.trim();
      if (line.includes('Validity:')) details[currentType].validity = line.split(':')[1]?.trim();
      if (line.includes('Visa Fees:')) details[currentType].fees = line.split(':')[1]?.trim();
      if (line.includes('Services Fees:')) details[currentType].serviceFees = line.split(':')[1]?.trim();
    });
    return details;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      const response = await fetch(`${BackendURL}/api/form-submissions/slug/egypt-visa-for-indians`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      const res = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your application has been submitted successfully. Our team will contact you shortly.');
        setFormValues({}); // Reset form
      } else {
        setSubmitStatus('error');
        setSubmitMessage(res.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setSubmitMessage('Failed to submit. Please check your connection and try again.');
      console.error('Submit error:', err);
    } finally {
      setSubmitLoading(false);
      // Auto-hide message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage('');
      }, 5000);
    }
  };

  return (
    <div className="bg-white font-sans">

      {/* ===== HERO SECTION ===== */}
      <section
        className="relative w-full h-[800px] bg-cover bg-center"
        style={{
          backgroundImage: formData?.image ? `url(${getImageUrl(formData.image)})` : 'none'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 h-[800px] flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left - Hero Text */}
            <div className="text-white">
              <p className="text-xl mb-2 text-gray-300">Apply For</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span style={{ color: '#E31E24' }}>Egypt</span> Visa
              </h1>
              <p className="text-gray-300 text-lg">
                Experience the wonders of Egypt with our hassle-free visa service
              </p>
            </div>

            {/* Right - Application Form */}
            {fields.length > 0 && (
              <div
                className="rounded-xl p-6 md:p-8"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' }}
              >
                <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
                  {(() => {
                    const textFields = fields.filter(f => ['text', 'email', 'number'].includes(f.type));
                    const selectFields = fields.filter(f => f.type === 'select' || f.type === 'dropdown');
                    const checkboxFields = fields.filter(f => f.type === 'checkbox');

                    return (
                      <>
                        {/* Text fields */}
                        {textFields.map((field, index) => (
                          <input
                            key={field._id || `text-${index}`}
                            type={field.type === 'number' ? 'tel' : field.type}
                            name={field.name}
                            value={formValues[field.name] || ''}
                            onChange={handleInputChange}
                            placeholder={field.placeholder || field.label}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none text-base"
                            required={field.required}
                            style={{ height: '45px' }}
                          />
                        ))}

                        {/* Select fields */}
                        {selectFields.map((field, index) => (
                          <select
                            key={field._id || `select-${index}`}
                            name={field.name}
                            value={formValues[field.name] || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-600 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none appearance-none cursor-pointer text-base"
                            required={field.required}
                            style={{
                              height: '45px',
                              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23374151' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                              backgroundPosition: 'right 0.75rem center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: '1.25em 1.25em',
                              paddingRight: '2.5rem'
                            }}
                          >
                            <option value="">{field.placeholder || field.label}</option>
                            {field.options?.map((opt, optIdx) => (
                              <option key={opt._id || optIdx} value={opt.value || opt}>
                                {opt.label || opt}
                              </option>
                            ))}
                          </select>
                        ))}

                        {/* Checkboxes */}
                        {checkboxFields.map((field, index) => (
                          <label key={field._id || `checkbox-${index}`} className="flex items-start gap-3 text-white cursor-pointer">
                            <input
                              type="checkbox"
                              name={field.name}
                              checked={formValues[field.name] || false}
                              onChange={handleInputChange}
                              className="mt-1 w-4 h-4 accent-red-600 rounded shrink-0"
                            />
                            <span className="text-sm leading-relaxed">{field.label}</span>
                          </label>
                        ))}
                      </>
                    );
                  })()}

                  {/* Submit Status Message */}
                  {submitStatus && (
                    <div
                      className={`flex items-center gap-3 p-4 rounded-lg ${submitStatus === 'success'
                        ? 'bg-green-500/20 border border-green-500/50'
                        : 'bg-red-500/20 border border-red-500/50'
                        }`}
                    >
                      {submitStatus === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                      )}
                      <p className={`text-sm ${submitStatus === 'success' ? 'text-green-300' : 'text-red-300'}`}>
                        {submitMessage}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="w-full py-3 rounded-full font-medium text-base transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Apply Now'
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== WHAT SHOULD INDIANS KNOW SECTION ===== */}
      {introSection.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            {introSection.map((item, index) => (
              <div key={item._id || index} className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h2>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#E31E24' }}></div>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {item.contentHtml}
                  </p>
                </div>
                {item.images?.[0] && (
                  <div className="relative">
                    <img
                      src={getImageUrl(item.images[0])}
                      alt={item.title}
                      className="rounded-xl shadow-lg w-full"
                    />
                    {item.badge?.text && (
                      <div
                        className="absolute -bottom-4 -right-4 px-4 py-2 rounded-lg text-white font-bold shadow-lg"
                        style={{ backgroundColor: item.badge.background || '#E31E24' }}
                      >
                        {item.badge.text} Happy Customers
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== VISA APPLICATION CENTRES ===== */}
      {centersSection.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {centersSection[0]?.title}
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {centersSection[0]?.contentHtml?.split('\n').filter(c => c.trim()).map((city, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm border border-gray-200"
                >
                  <MapPin className="w-5 h-5" style={{ color: '#E31E24' }} />
                  <span className="font-medium text-gray-800">{city.trim()}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== ESSENTIAL TRAVEL TIPS SECTION ===== */}
      {travelTipsSection.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {travelTipsSection[0]?.title}
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>
            <div className="space-y-6">
              {travelTipsSection[0]?.contentHtml?.split('\n\n').filter(p => p.trim()).map((paragraph, pIdx) => (
                <div key={pIdx} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(227,30,36,0.1)' }}>
                    <Check className="w-5 h-5" style={{ color: '#E31E24' }} />
                  </div>
                  <p className="text-gray-600 leading-relaxed">{paragraph.trim()}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== TOP TOURIST DESTINATIONS SECTION ===== */}
      {destinationsSection.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className=" mx-auto px-6">
            {destinationsSection.map((item, index) => (
              <>
                <div key={item._id || index} className=" gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <h2 className="text-2xl md:text-3xl text-center font-bold text-gray-900 mb-4">
                      {item.title}
                    </h2>
                    <div className="w-20 h-1 mb-6 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>

                  </div>

                </div>
                {item.images?.[0] && (
                  <div className="order-1 lg:order-2">
                    <img
                      src={getImageUrl(item.images[0])}
                      alt={item.title}
                      className="rounded-xl shadow-lg w-full"
                    />
                  </div>

                )}
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {item.contentHtml}
                </p>
              </>
            ))}
          </div>
        </section>
      )}

      {/* ===== EGYPTIAN CUISINE SECTION ===== */}
      {cuisineSection.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            {cuisineSection.map((item, index) => (
              <div key={item._id || index} className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h2>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#E31E24' }}></div>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {item.contentHtml}
                  </p>
                </div>
                {item.images?.[0] && (
                  <div>
                    <img
                      src={getImageUrl(item.images[0])}
                      alt={item.title}
                      className="rounded-xl shadow-lg w-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== ARE YOU PLANNING SECTION ===== */}
      {planningSection.length > 0 && (
        <section className="py-16" style={{ backgroundColor: '#fdf2f4' }}>
          <div className="max-w-6xl mx-auto px-6">
            {planningSection.map((item, index) => (
              <div key={item._id || index} className="grid lg:grid-cols-2 gap-12 items-center">
                {item.images?.[0] && (
                  <div>
                    <img
                      src={getImageUrl(item.images[0])}
                      alt={item.title}
                      className="rounded-xl shadow-lg w-full"
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h2>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#E31E24' }}></div>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {item.contentHtml}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== VISA OVERVIEW SECTION ===== */}
      {visaOverviewSection.length > 0 && (
        <section className="py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Egypt Visa Overview: Types, Processing, Fees, and Validity
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visaOverviewSection.map((visa, index) => {
                const details = parseVisaDetails(visa.contentHtml);
                return (
                  <div key={visa._id || index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="py-4 px-6 text-center" style={{ backgroundColor: '#E31E24' }}>
                      <h3 className="text-white text-lg font-bold">{visa.title}</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-4">
                        Processing: <span className="font-semibold text-gray-800">{details.processingTime || '7-9 working days'}</span>
                      </p>

                      {/* Single Entry */}
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <p className="font-bold text-gray-800 mb-2">Single Entry</p>
                        <div className="space-y-1 text-sm">
                          <p className="flex justify-between">
                            <span className="text-gray-500">Stay:</span>
                            <span className="font-medium">{details.single.stayPeriod || '30 days'}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-500">Validity:</span>
                            <span className="font-medium">{details.single.validity || '60 Days'}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-500">Fees:</span>
                            <span className="font-bold" style={{ color: '#E31E24' }}>{details.single.fees || 'INR 2700/-'}</span>
                          </p>
                        </div>
                      </div>

                      {/* Multiple Entry */}
                      <div>
                        <p className="font-bold text-gray-800 mb-2">Multiple Entry</p>
                        <div className="space-y-1 text-sm">
                          <p className="flex justify-between">
                            <span className="text-gray-500">Stay:</span>
                            <span className="font-medium">{details.multiple.stayPeriod || '60 days'}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-500">Validity:</span>
                            <span className="font-medium">{details.multiple.validity || '90 Days'}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-500">Fees:</span>
                            <span className="font-bold" style={{ color: '#E31E24' }}>{details.multiple.fees || 'INR 5800/-'}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== DOCUMENTS SECTION ===== */}
      {documents.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Documents Required</h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            <div className="space-y-8">
              {documents.map((doc, docIndex) => (
                <div key={doc._id || docIndex} className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{doc.title}</h3>
                  <ul className="space-y-3">
                    {doc.description?.split('\n').filter(line => line.trim()).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-0.5 shrink-0" style={{ color: '#E31E24' }} />
                        <span className="text-gray-700">{item.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ SECTION ===== */}
      {faqs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq._id || index}
                  className="rounded-lg overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033]"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {openFaq === index && (
                    <div className="px-6 py-4 bg-white border border-gray-200">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
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

export default Egyptvisaforindians;