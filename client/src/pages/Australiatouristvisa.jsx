import { useState, useEffect } from "react";
import { Check, ChevronDown, ChevronUp, Clock, Calendar, CreditCard, Globe, FileText, Hourglass, IdCard, CheckCircle, XCircle, Loader2 } from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

// Static visa types data (used if not in API)
const STATIC_VISA_TYPES = {
  processingTime: "25 to 30 working days",
  validity: "Depends on Embassy",
  entryType: "Single or Multiple (Embassy Decision)",
  charges: "Approx. ₹8,500/- (AUD 197 Visa Fee) + ₹3,000 Service Fee"
};

const Australiatouristvisa = () => {
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
      const response = await fetch(`${BackendURL}/api/forms/slug/australia-tourist-visa`);
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
      const response = await fetch(`${BackendURL}/api/form-submissions/slug/australia-tourist-visa`, {
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

  if (loading) return <LoadingState message="Loading Australia Tourist Visa..." fullScreen />;
  if (error) return <ErrorState error={error} onRetry={fetchFormData} showHomeButton fullScreen />;

  const { description, fields = [], faqs = [], documents = [], contentSections = {}, pricingPlans = [] } = formData || {};

  // Get sections by API keys
  const additionalDocsSection = contentSections['Additional Documents for Your Australia Tourist Visa (As Applicable)'] || [];
  const howToApplySection = contentSections['How to Apply for Australia Tourist Visa'] || [];
  const whyChooseSection = contentSections['Why Choose DU Global for Australia Visa'] || [];

  // Visa types data - use API data if available, otherwise static
  const visaTypesData = pricingPlans.length > 0 ? pricingPlans[0] : STATIC_VISA_TYPES;

  // Icons for How to Apply section
  const howToApplyIcons = [Hourglass, FileText, IdCard];

  return (
    <div className="bg-white font-sans">

      {/* ===== HERO SECTION ===== */}
      <section
        className="relative w-full h-[800px] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: formData?.image ? `url(${getImageUrl(formData.image)})` : 'none'
        }}
      >
        {/* Dark overlay with red gradient on right */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 60%, rgba(179,29,29,0.6) 100%)'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 h-[800px] flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left - Hero Text */}
            <div className="text-white">
              <p className="text-xl mb-2">Apply for</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span style={{ color: '#E31E24' }}>Australia</span> Tourist Visa
              </h1>
              <p className="text-gray-300 text-lg">
                {description}
              </p>
            </div>

            {/* Right - Contact Form with dark transparent bg */}
            {fields.length > 0 && (
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
              >
                <form className="space-y-3" onSubmit={handleSubmit}>
                  {/* Dynamically render all fields */}
                  {(() => {
                    // Separate fields by type
                    const textFields = fields.filter(f => ['text', 'email', 'number'].includes(f.type));
                    const dateFields = fields.filter(f => f.type === 'date');
                    const selectFields = fields.filter(f => f.type === 'select' || f.type === 'dropdown');
                    const checkboxFields = fields.filter(f => f.type === 'checkbox');

                    // Group text fields in pairs for 2-column layout
                    const textFieldPairs = [];
                    for (let i = 0; i < textFields.length; i += 2) {
                      textFieldPairs.push(textFields.slice(i, i + 2));
                    }

                    return (
                      <>
                        {/* Text/Email/Number fields in 2-column pairs */}
                        {textFieldPairs.map((pair, pairIndex) => (
                          <div key={pairIndex} className={`grid gap-3 ${pair.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                            {pair.map((field, index) => (
                              <input
                                key={field._id || `text-${pairIndex}-${index}`}
                                type={field.type === 'number' ? 'tel' : field.type}
                                name={field.name}
                                value={formValues[field.name] || ''}
                                onChange={handleInputChange}
                                placeholder={field.placeholder || field.label}
                                className="w-full px-4 py-3 bg-white border-0 rounded text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm"
                                required={field.required}
                              />
                            ))}
                          </div>
                        ))}

                        {/* Select/Dropdown fields */}
                        {selectFields.length > 0 && (
                          <div className={`grid gap-3 ${selectFields.length >= 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                            {selectFields.map((field, index) => (
                              <select
                                key={field._id || `select-${index}`}
                                name={field.name}
                                value={formValues[field.name] || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white border-0 rounded text-gray-700 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm appearance-none cursor-pointer"
                                required={field.required}
                                style={{
                                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23374151' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                  backgroundPosition: 'right 0.5rem center',
                                  backgroundRepeat: 'no-repeat',
                                  backgroundSize: '1.25em 1.25em',
                                  paddingRight: '2rem'
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

                        {/* Date fields */}
                        {dateFields.map((field, index) => (
                          <input
                            key={field._id || `date-${index}`}
                            type="date"
                            name={field.name}
                            value={formValues[field.name] || ''}
                            onChange={handleInputChange}
                            placeholder={field.placeholder || field.label}
                            className="w-full px-4 py-3 bg-white border-0 rounded text-gray-700 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm"
                            required={field.required}
                          />
                        ))}

                        {/* Checkbox fields */}
                        {checkboxFields.map((field, index) => (
                          <label key={field._id || `checkbox-${index}`} className="flex items-start gap-3 text-white text-xs cursor-pointer">
                            <input
                              type="checkbox"
                              name={field.name}
                              checked={formValues[field.name] || false}
                              onChange={handleInputChange}
                              className="mt-1 w-4 h-4 accent-blue-600 rounded flex-shrink-0"
                            />
                            <span className="text-gray-300">{field.label}</span>
                          </label>
                        ))}
                      </>
                    );
                  })()}

                  {/* Submit Status Message */}
                  {submitStatus && (
                    <div className={`flex items-center gap-3 p-3 rounded ${submitStatus === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      {submitStatus === 'success' ? <CheckCircle className="w-5 h-5 text-green-400" /> : <XCircle className="w-5 h-5 text-red-400" />}
                      <p className={`text-sm ${submitStatus === 'success' ? 'text-green-300' : 'text-red-300'}`}>{submitMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="w-full py-3 rounded-full font-bold text-base transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] uppercase disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {submitLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : 'Apply Now'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== VISA TYPES, PROCESSING TIME, AND FEES ===== */}
      <section className="py-20" style={{ backgroundColor: '#B31D1D' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Australia Visa Application"
                className="rounded-2xl shadow-2xl max-h-[400px]"
              />
            </div>

            {/* Right - Visa Details Cards */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Types of Australia Tourist Visas,<br />Processing Time, and Fees
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {/* Processing Time Card */}
                <div className="border-2 border-white/30 rounded-xl p-5 bg-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-8 h-8 text-white" />
                    <span className="text-white/80 text-sm">Processing Time</span>
                  </div>
                  <p className="text-white font-bold text-lg">
                    {visaTypesData.processingTime || STATIC_VISA_TYPES.processingTime}
                  </p>
                </div>

                {/* Validity Card */}
                <div className="border-2 border-white/30 rounded-xl p-5 bg-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-8 h-8 text-white" />
                    <span className="text-white/80 text-sm">Validity</span>
                  </div>
                  <p className="text-white font-bold text-lg">
                    {visaTypesData.validity || STATIC_VISA_TYPES.validity}
                  </p>
                </div>

                {/* Entry Type Card */}
                <div className="border-2 border-white/30 rounded-xl p-5 bg-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Globe className="w-8 h-8 text-white" />
                    <span className="text-white/80 text-sm">Entry Type</span>
                  </div>
                  <p className="text-white font-bold text-lg">
                    {visaTypesData.entryType || STATIC_VISA_TYPES.entryType}
                  </p>
                </div>

                {/* Charges Card */}
                <div className="border-2 border-white/30 rounded-xl p-5 bg-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <CreditCard className="w-8 h-8 text-white" />
                    <span className="text-white/80 text-sm">Charges</span>
                  </div>
                  <p className="text-white font-bold text-lg">
                    {visaTypesData.charges || STATIC_VISA_TYPES.charges}
                  </p>
                </div>
              </div>

              <p className="text-white/70 text-sm mt-6 italic">
                *Entry type and validity are determined solely by the embassy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DOCUMENTS REQUIRED SECTION ===== */}
      {documents.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Documents Required for Australia Tourist Visa
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {documents.map((doc, docIndex) => {
                const items = doc.description?.split('\n').filter(line => line.trim()) || [];
                // Split items into chunks of 3-4 for card display
                const chunkSize = Math.ceil(items.length / 4);
                const chunks = [];
                for (let i = 0; i < items.length; i += chunkSize) {
                  chunks.push(items.slice(i, i + chunkSize));
                }

                return chunks.map((chunk, chunkIndex) => (
                  <div key={`${docIndex}-${chunkIndex}`} className="relative bg-white rounded-xl p-6 shadow-md border border-gray-100 overflow-hidden">
                    {/* Number */}
                    <span className="text-5xl font-bold mb-4 block" style={{ color: '#E31E24' }}>
                      {String(chunkIndex + 1).padStart(2, '0')}
                    </span>

                    {/* Items */}
                    <ul className="space-y-2">
                      {chunk.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span className="text-gray-600 text-sm">{item.trim()}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Decorative accent */}
                    <div
                      className="absolute bottom-0 right-0 w-16 h-16"
                      style={{
                        background: 'linear-gradient(135deg, transparent 50%, rgba(227,30,36,0.1) 50%)'
                      }}
                    />
                  </div>
                ));
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== ADDITIONAL DOCUMENTS SECTION ===== */}
      {additionalDocsSection.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Additional Documents for Your Australia Tourist Visa
              </h2>
              <p className="text-gray-500 mb-3">(As Applicable)</p>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            {/* 2-column grid of numbered cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {additionalDocsSection.map((item, index) => (
                <div
                  key={item._id || index}
                  className="relative bg-white rounded-2xl p-8 border border-gray-200 overflow-hidden"
                >
                  {/* Large number */}
                  <span className="text-4xl font-bold mb-4 block" style={{ color: '#C62625' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>

                  {/* Content as list */}
                  <ul className="space-y-2">
                    {item.contentHtml?.trim().split('\r\n').filter(line => line.trim()).map((line, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600">
                        <span className="text-gray-400 mt-0.5">•</span>
                        <span>{line.trim()}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pink triangular accent in bottom-right */}
                  <div
                    className="absolute bottom-0 right-0 w-20 h-20"
                    style={{
                      background: 'linear-gradient(135deg, transparent 50%, rgba(198,38,37,0.15) 50%)'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== HOW TO APPLY SECTION ===== */}
      {howToApplySection.length > 0 && (
        <section className="py-20" style={{ backgroundColor: '#2B2B2B' }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                How to Apply for Australia Tourist Visa
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {howToApplySection.map((item, index) => {
                const IconComponent = howToApplyIcons[index % howToApplyIcons.length];
                return (
                  <div key={item._id || index} className="relative bg-white rounded-xl p-6 text-center">
                    {/* Faded number in background */}
                    <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: '#E31E24' }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.contentHtml?.trim()}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== WHY CHOOSE DU GLOBAL SECTION ===== */}
      {whyChooseSection.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Why Choose DU Global for Australia Visa
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {whyChooseSection.map((item, index) => (
                <div
                  key={item._id || index}
                  className="relative rounded-xl overflow-hidden min-h-[280px] flex flex-col justify-end group"
                >
                  {/* Background Image */}
                  {item.images?.[0] && (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${getImageUrl(item.images[0])})` }}
                    />
                  )}

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

                  {/* Content */}
                  <div className="relative z-10 p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title?.trim()}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">{item.contentHtml?.trim()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ SECTION ===== */}
      {faqs.length > 0 && (
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          {/* Watermark */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 text-[120px] font-bold opacity-30 pointer-events-none">
            FAQS
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Frequently Asked Questions
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            {/* FAQ Accordion - Red border style */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq._id || index}
                  className="rounded-lg overflow-hidden border-2"
                  style={{ borderColor: '#E31E24' }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left bg-white"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                      style={{ color: '#E31E24' }}
                    />
                  </button>

                  {openFaq === index && (
                    <div className="px-6 py-5 bg-gray-50 border-t" style={{ borderColor: '#E31E24' }}>
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

export default Australiatouristvisa;
