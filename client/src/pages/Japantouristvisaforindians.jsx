import { useState, useEffect } from "react";
import { Check, ChevronDown, MapPin, Clock, Wallet, Calendar, CheckCircle, XCircle, Loader2 } from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

const Japantouristvisaforindians = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BackendURL}/api/forms/slug/japan-tourist-visa-for-indians`);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      const response = await fetch(`${BackendURL}/api/form-submissions/slug/japan-tourist-visa-for-indians`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const res = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your application has been submitted successfully. Our team will contact you shortly.');
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

  if (loading) return <LoadingState message="Loading Japan Tourist Visa..." fullScreen />;
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
  const introSection = contentSections['What Should Indians Know Before Visiting Japan?'] || [];
  const travelTipsSection = contentSections['Essential Travel Tips for Indian Tourists Visiting Japan'] || [];
  const destinationsSection = contentSections['Top Tourist Destinations in Japan for Indian Travelers'] || [];
  const mustVisitSection = contentSections['Must-Visit Destinations for Indian Travelers'] || [];
  const visaFeesSection = contentSections['Japan Tourist Visa Fees, Validity & Processing Time for Indian Citizens'] || [];

  // Parse visa fees details
  const parseVisaFees = (contentHtml) => {
    if (!contentHtml) return null;
    const lines = contentHtml.split('\n').filter(l => l.trim());
    const details = {};
    lines.forEach(line => {
      if (line.includes('Processing time:')) details.processingTime = line.split(':')[1]?.trim();
      if (line.includes('Stay period:')) details.stayPeriod = line.split(':')[1]?.trim();
      if (line.includes('Entry:')) details.entry = line.split(':')[1]?.trim();
      if (line.includes('Fees:')) details.fees = line.split(':')[1]?.trim();
    });
    return details;
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
              <p className="text-xl mb-2 text-gray-300">Apply for</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span style={{ color: '#E31E24' }}>Japan</span> Tourist Visa
              </h1>
              <p className="text-gray-300 text-lg">
                {description}
              </p>
            </div>

            {/* Right - Application Form */}
            {fields.length > 0 && (
              <div className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                <h2 className="text-white text-xl font-semibold mb-6 text-center">
                  Let our expert guide you through the Japan Visa process
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
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
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                            required={field.required}
                          />
                        ))}

                        {/* Select fields - 2 columns */}
                        {selectFields.length > 0 && (
                          <div className="grid md:grid-cols-2 gap-4">
                            {selectFields.slice(0, 2).map((field, index) => (
                              <select
                                key={field._id || `select-${index}`}
                                name={field.name}
                                value={formValues[field.name] || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
                                required={field.required}
                                style={{
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
                          </div>
                        )}

                        {/* Remaining select (Interest) */}
                        {selectFields.slice(2).map((field, index) => (
                          <select
                            key={field._id || `select-extra-${index}`}
                            name={field.name}
                            value={formValues[field.name] || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
                            required={field.required}
                            style={{
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
                          <label key={field._id || `checkbox-${index}`} className="flex items-start gap-3 text-gray-300 cursor-pointer">
                            <input
                              type="checkbox"
                              name={field.name}
                              checked={formValues[field.name] || false}
                              onChange={handleInputChange}
                              className="mt-1 w-4 h-4 accent-red-600 rounded shrink-0"
                            />
                            <span className="text-sm">{field.label}</span>
                          </label>
                        ))}
                      </>
                    );
                  })()}

                  {/* Submit Status Message */}
                  {submitStatus && (
                    <div className={`flex items-center gap-3 p-4 rounded-lg ${submitStatus === 'success' ? 'bg-green-500/20 border border-green-500/50' : 'bg-red-500/20 border border-red-500/50'}`}>
                      {submitStatus === 'success' ? <CheckCircle className="w-5 h-5 text-green-400 shrink-0" /> : <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
                      <p className={`text-sm ${submitStatus === 'success' ? 'text-green-300' : 'text-red-300'}`}>{submitMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="w-full py-4 rounded-full font-bold text-base transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] uppercase disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {submitLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : 'Apply Now'}
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

      {/* ===== ESSENTIAL TRAVEL TIPS SECTION ===== */}
      {travelTipsSection.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            {travelTipsSection.map((item, index) => (
              <div key={item._id || index}>
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h2>
                  <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
                </div>
                <div className="space-y-6">
                  {item.contentHtml?.split('\n\n').filter(p => p.trim()).map((paragraph, pIdx) => {
                    const [title, ...rest] = paragraph.split(':');
                    if (rest.length > 0) {
                      return (
                        <div key={pIdx} className="flex gap-4">
                          <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(227,30,36,0.1)' }}>
                            <Check className="w-5 h-5" style={{ color: '#E31E24' }} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">{title.trim()}</h4>
                            <p className="text-gray-600 leading-relaxed">{rest.join(':').trim()}</p>
                          </div>
                        </div>
                      );
                    }
                    return <p key={pIdx} className="text-gray-600 leading-relaxed">{paragraph}</p>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== TOP TOURIST DESTINATIONS SECTION ===== */}
      {(destinationsSection.length > 0 || formImages.length > 0) && (
        <section className="py-16" style={{ backgroundColor: '#fdf2f4' }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {destinationsSection[0]?.title || 'Top Tourist Destinations'}
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            {/* Image Gallery from formImages */}
            {formImages.length > 0 && (
              <div className={`grid ${formImages.length === 1 ? 'grid-cols-1' : formImages.length === 2 ? 'grid-cols-2' : 'md:grid-cols-3'} gap-4 mb-10`}>
                {formImages[0]?.images?.map((img, imgIdx) => (
                  <div key={imgIdx} className="overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={getImageUrl(img)}
                      alt={`Destination ${imgIdx + 1}`}
                      className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Destination descriptions */}
            {destinationsSection[0]?.contentHtml && (
              <div className="space-y-6">
                {destinationsSection[0].contentHtml.split('\n\n').filter(p => p.trim()).map((paragraph, pIdx) => {
                  const [title, ...rest] = paragraph.split(':');
                  if (rest.length > 0 && title.trim().length < 30) {
                    return (
                      <div key={pIdx}>
                        <h4 className="font-bold text-gray-900 mb-2" style={{ color: '#E31E24' }}>{title.trim()}</h4>
                        <p className="text-gray-600 leading-relaxed">{rest.join(':').trim()}</p>
                      </div>
                    );
                  }
                  return <p key={pIdx} className="text-gray-600 leading-relaxed">{paragraph}</p>;
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== MUST VISIT DESTINATIONS ===== */}
      {mustVisitSection.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            {mustVisitSection.map((item, index) => (
              <div key={item._id || index} className="grid lg:grid-cols-2 gap-12 items-center">
                {item.images?.[0] && (
                  <div className="order-2 lg:order-1">
                    <img
                      src={getImageUrl(item.images[0])}
                      alt={item.title}
                      className="rounded-xl shadow-lg w-full"
                    />
                  </div>
                )}
                <div className={item.images?.[0] ? "order-1 lg:order-2" : ""}>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h2>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#E31E24' }}></div>
                  <div className="space-y-4">
                    {item.contentHtml?.split('\n\n').filter(p => p.trim()).map((paragraph, pIdx) => {
                      const [title, ...rest] = paragraph.split(':');
                      if (rest.length > 0 && title.trim().length < 40) {
                        return (
                          <div key={pIdx}>
                            <h4 className="font-bold text-gray-900 mb-1">{title.trim()}</h4>
                            <p className="text-gray-600 leading-relaxed">{rest.join(':').trim()}</p>
                          </div>
                        );
                      }
                      return <p key={pIdx} className="text-gray-600 leading-relaxed">{paragraph}</p>;
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== VISA FEES SECTION ===== */}
      {visaFeesSection.length > 0 && (
        <section className="py-16 bg-gray-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {visaFeesSection[0]?.title || 'Visa Fees & Processing Time'}
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            {visaFeesSection.map((item, index) => {
              const details = parseVisaFees(item.contentHtml);
              return (
                <div key={item._id || index} className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                    30/60 Days Tourist Visa
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <Clock className="w-8 h-8" style={{ color: '#E31E24' }} />
                      <div>
                        <p className="text-sm text-gray-500">Processing Time</p>
                        <p className="font-bold text-gray-900">{details?.processingTime || '10 working days'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <Calendar className="w-8 h-8" style={{ color: '#E31E24' }} />
                      <div>
                        <p className="text-sm text-gray-500">Stay Period</p>
                        <p className="font-bold text-gray-900">{details?.stayPeriod || '30 days'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <MapPin className="w-8 h-8" style={{ color: '#E31E24' }} />
                      <div>
                        <p className="text-sm text-gray-500">Entry Type</p>
                        <p className="font-bold text-gray-900">{details?.entry || 'Single/Multiple'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <Wallet className="w-8 h-8" style={{ color: '#E31E24' }} />
                      <div>
                        <p className="text-sm text-gray-500">Visa Fees</p>
                        <p className="font-bold text-xl" style={{ color: '#E31E24' }}>{details?.fees || 'INR 4,200/-'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
        </section>
      )}

      {/* ===== FAQ SECTION ===== */}
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
              {faqs.map((faq, index) => (

                <div key={index} className="py-6">
                  <button

                    onClick={() => setOpenFaq(index)}


                    className="w-full flex justify-between items-center text-left"
                  >
                    <span className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </span>

                    <span className="text-2xl text-gray-500">
                      {openFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  {openFaq === index && (
                    <p className="mt-4 text-gray-500 max-w-xl">
                      {faq.answer}
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

export default Japantouristvisaforindians;