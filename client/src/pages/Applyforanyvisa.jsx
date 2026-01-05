import { useState, useEffect } from "react";
import { Check, ChevronDown, Award, Clock, Shield, Globe, MapPin, Users, FileCheck, CheckCircle, XCircle, Loader2 } from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

const Applyforanyvisa = () => {
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
      const response = await fetch(`${BackendURL}/api/forms/slug/apply-for-any-visa`);
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
      const response = await fetch(`${BackendURL}/api/form-submissions/slug/apply-for-any-visa`, {
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

  if (loading) return <LoadingState message="Loading..." fullScreen />;
  if (error) return <ErrorState error={error} onRetry={fetchFormData} showHomeButton fullScreen />;

  const {
    description,
    fields = [],
    faqs = [],
    documents = [],
    contentSections = {}
  } = formData || {};

  // Get sections by API keys
  const globalExpertsSection = contentSections['Global Experts in'] || [];
  const footprintsSection = contentSections['Our Footprints'] || [];
  const isoCertificatesSection = contentSections['ISO Certificates'] || [];
  const whyDuGlobalSection = contentSections['Why DU GLOBAL'] || contentSections['Why DU Global'] || [];

  // Why DU Global items (static for design matching)
  const whyDuGlobalItems = [
    { icon: Award, title: "Quality and Value", description: "Since 2015, the company has been expanding its offerings and geographical reach." },
    { icon: Clock, title: "Speed", description: "Prioritizing your time with quick processing and efficient service delivery." },
    { icon: Shield, title: "Fast Delivery", description: "Hassle-free passport delivery right to your doorstep." },
    { icon: Globe, title: "Trusted Network", description: "35+ locations across 6 countries with global partner offices." }
  ];

  return (
    <div className="bg-white font-sans">

      {/* ===== HERO SECTION (Text Only) ===== */}
      <section
        className="relative w-full py-32 bg-cover bg-center h-[800px] flex items-center"
        style={{
          backgroundImage: formData?.image ? `url(${getImageUrl(formData.image)})` : 'none'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-white max-w-xl">
            <p className="text-lg mb-2 text-gray-300">Welcome to</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              DU <span style={{ color: '#E31E24' }}>Global</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Your trusted partner for visa services worldwide
            </p>
            <a
              href="#apply-form"
              className="inline-block px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033]"
            >
              Apply for Any Visa
            </a>
          </div>
        </div>
      </section>

      {/* ===== FORM SECTION (Separate with BG Image) ===== */}
      {fields.length > 0 && (
        <section
          id="apply-form"
          className="relative py-16 bg-cover bg-center"
          style={{
            backgroundImage: globalExpertsSection[0]?.images?.[0]
              ? `url(${getImageUrl(globalExpertsSection[0].images[0])})`
              : 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)'
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70" />

          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="text-center mb-8">
              <p className="text-sm font-semibold mb-2" style={{ color: '#E31E24' }}>VISA APPLICATION</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Apply for Any Visa</h2>
            </div>

            <form className="bg-white rounded-xl p-8 shadow-2xl" onSubmit={handleSubmit}>
              {(() => {
                const textFields = fields.filter(f => ['text', 'email', 'number'].includes(f.type));
                const selectFields = fields.filter(f => f.type === 'select' || f.type === 'dropdown');
                const checkboxFields = fields.filter(f => f.type === 'checkbox');

                return (
                  <>
                    {/* All text fields in one row */}
                    {textFields.length > 0 && (
                      <div className={`grid gap-4 mb-4 ${textFields.length >= 3 ? 'md:grid-cols-3' : textFields.length === 2 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                        {textFields.map((field, index) => (
                          <input
                            key={field._id || `text-${index}`}
                            type={field.type === 'number' ? 'tel' : field.type}
                            name={field.name}
                            value={formValues[field.name] || ''}
                            onChange={handleInputChange}
                            placeholder={field.placeholder || field.label}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                            required={field.required}
                          />
                        ))}
                      </div>
                    )}

                    {/* Select fields - Country & State in one row, others full width */}
                    {selectFields.length > 0 && (
                      <>
                        <div className={`grid gap-4 mb-4 ${selectFields.length >= 2 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                          {selectFields.slice(0, 2).map((field, index) => (
                            <select
                              key={field._id || `select-${index}`}
                              name={field.name}
                              value={formValues[field.name] || ''}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none appearance-none cursor-pointer bg-white"
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

                        {/* Remaining selects (like "I am going to") */}
                        {selectFields.slice(2).map((field, index) => (
                          <select
                            key={field._id || `select-extra-${index}`}
                            name={field.name}
                            value={formValues[field.name] || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none appearance-none cursor-pointer bg-white mb-4"
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
                      </>
                    )}

                    {/* Checkbox fields */}
                    {checkboxFields.map((field, index) => (
                      <label key={field._id || `checkbox-${index}`} className="flex items-start gap-3 text-gray-600 cursor-pointer mb-4">
                        <input
                          type="checkbox"
                          name={field.name}
                          checked={formValues[field.name] || false}
                          onChange={handleInputChange}
                          className="mt-1 w-4 h-4 accent-red-600 rounded flex-shrink-0"
                        />
                        <span className="text-xs leading-relaxed">{field.label}</span>
                      </label>
                    ))}

                    {/* Submit Status Message */}
                    {submitStatus && (
                      <div className={`flex items-center gap-3 p-4 rounded-lg mb-4 ${submitStatus === 'success' ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
                        {submitStatus === 'success' ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" /> : <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
                        <p className={`text-sm ${submitStatus === 'success' ? 'text-green-700' : 'text-red-700'}`}>{submitMessage}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitLoading}
                      className="w-full py-4 rounded-full font-bold text-lg transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {submitLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : 'Submit Application'}
                    </button>
                  </>
                );
              })()}
            </form>
          </div>
        </section>
      )}

      {/* ===== GLOBAL EXPERTS SECTION ===== */}
      {globalExpertsSection.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            {globalExpertsSection.map((item, index) => {
              // Convert YouTube URL to embed format
              const getYouTubeEmbedUrl = (url) => {
                if (!url) return null;
                // Handle different YouTube URL formats
                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                const match = url.match(regExp);
                const videoId = (match && match[2].length === 11) ? match[2] : null;
                return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
              };

              const embedUrl = getYouTubeEmbedUrl(item.youtubeUrl);

              return (
                <div key={item._id || index} className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <p className="text-sm font-semibold mb-2" style={{ color: '#E31E24' }}>Global Experts in</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {item.contentHtml}
                    </p>
                  </div>
                  {embedUrl && (
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <iframe
                        width="100%"
                        height="315"
                        src={embedUrl}
                        title={item.title || "DU Global Video"}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-xl"
                      ></iframe>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ===== WHY DU GLOBAL SECTION ===== */}
      <section
        className="py-20 relative bg-cover bg-center"
        style={{
          backgroundColor: '#1a1a1a',
          backgroundImage: whyDuGlobalSection[0]?.images?.[0]
            ? `url(${getImageUrl(whyDuGlobalSection[0].images[0])})`
            : 'none'
        }}
      >
        {/* Dark overlay for background image */}
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Title */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why DU GLOBAL is your trusted partner
              </h2>
              <div className="w-20 h-1" style={{ backgroundColor: '#E31E24' }}></div>
              {whyDuGlobalSection[0]?.contentHtml && (
                <p className="text-gray-300 mt-6 leading-relaxed">
                  {whyDuGlobalSection[0].contentHtml}
                </p>
              )}
            </div>

            {/* Right - Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {whyDuGlobalItems.map((item, index) => (
                <div key={index} className="p-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'rgba(227,30,36,0.2)' }}
                  >
                    <item.icon className="w-7 h-7" style={{ color: '#E31E24' }} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR FOOTPRINTS SECTION ===== */}
      {footprintsSection.length > 0 && (
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          {/* Faint world map background */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Footprints</h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            {footprintsSection.map((item, index) => (
              <div key={item._id || index}>
                <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  {item.title}
                </p>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="p-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <MapPin className="w-8 h-8" style={{ color: '#E31E24' }} />
                      <span className="text-5xl font-bold text-gray-900">35<sup>+</sup></span>
                    </div>
                    <p className="text-gray-600 font-medium">Locations</p>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <FileCheck className="w-8 h-8" style={{ color: '#E31E24' }} />
                      <span className="text-5xl font-bold text-gray-900">17<span className="text-2xl">Lac+</span></span>
                    </div>
                    <p className="text-gray-600 font-medium">Applications Processed</p>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Users className="w-8 h-8" style={{ color: '#E31E24' }} />
                      <span className="text-5xl font-bold text-gray-900">200<sup>+</sup></span>
                    </div>
                    <p className="text-gray-600 font-medium">Employees</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== ISO CERTIFICATES SECTION ===== */}
      {isoCertificatesSection.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Certifications</h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {isoCertificatesSection.map((cert, index) => (
                <div key={cert._id || index} className="text-center p-6 bg-gray-50 rounded-xl">
                  {cert.images?.[0] && (
                    <img
                      src={getImageUrl(cert.images[0])}
                      alt={cert.title}
                      className="w-24 h-24 mx-auto mb-4 object-contain"
                    />
                  )}
                  <h3 className="font-bold text-gray-900 mb-2">{cert.title}</h3>
                  <p className="text-gray-500 text-sm">{cert.contentHtml?.trim()}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== DOCUMENTS SECTION (only if documents exist) ===== */}
      {documents.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Documents Required</h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            <div className="space-y-6">
              {documents.map((doc, index) => (
                <div key={doc._id || index} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5" style={{ color: '#E31E24' }} />
                    {doc.title}
                  </h3>
                  <ul className="space-y-2">
                    {doc.description?.split('\n').filter(line => line.trim()).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>{item.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ SECTION (only if faqs exist) ===== */}
      {faqs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq._id || index}
                  className="rounded-lg overflow-hidden border border-gray-200"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left bg-white"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {openFaq === index && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
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

export default Applyforanyvisa;