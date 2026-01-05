import { useState, useEffect } from "react";
import { Check, ChevronDown, ChevronUp, Globe, Users, Shield, Building, CheckCircle, XCircle, Loader2 } from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

// Static images
const STATIC_IMAGES = {
  hero: "https://images.unsplash.com/photo-1538485399081-7191377e8241?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
};

const Southkoreavisaforindians = () => {
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
      const response = await fetch(`${BackendURL}/api/forms/slug/south-korea-visa-for-indians`);
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
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      const response = await fetch(`${BackendURL}/api/form-submissions/slug/south-korea-visa-for-indians`, {
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

  if (loading) return <LoadingState message="Loading South Korea Visa..." fullScreen />;
  if (error) return <ErrorState error={error} onRetry={fetchFormData} showHomeButton fullScreen />;

  const { name, description, fields = [], faqs = [], documents = [], contentSections = {} } = formData || {};

  // Get sections by API keys
  const visaTypesSection = contentSections['South Korea Visa Types with Fees'] || [];
  const embassySection = contentSections['Designated Travel Agency by the Embassy of the Republic of Korea in India'] || [];
  const ktoSection = contentSections['Designated Travel Agency for the Korea Tourism Organization (KTO)'] || [];
  const additionalReqSection = contentSections['Additional Requirements'] || [];
  const employedSection = contentSections['For Employed People'] || [];
  const howToApplySection = contentSections['How to Apply for your South Korea Visa'] || [];
  const whyChooseSection = [
    ...(contentSections['Why Choose DU Global?'] || []),
    ...(contentSections['Why Choose DU Global'] || [])
  ];

  // Parse description
  const descriptionLines = description?.split('\r\n').filter(line => line.trim()) || [];

  return (
    <div className="bg-white font-sans">

      {/* ===== HERO SECTION ===== */}
      <section
        className="relative w-full h-[800px] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: formData?.image ? `url(${getImageUrl(formData.image)})` : 'none'
        }}
      >
        {/* Dark overlay with red glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(26,26,26,0.85) 50%, rgba(10,10,10,0.9) 100%)'
          }}
        />
        {/* Red glow effect on right */}
        <div
          className="absolute right-0 top-0 w-1/2 h-full opacity-30"
          style={{
            background: 'radial-gradient(ellipse at right center, #E31E24 0%, transparent 70%)'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 h-[800px] flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left - Hero Text */}
            <div className="text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-10" style={{ backgroundColor: '#E31E24' }}></div>
                <p className="text-gray-400 uppercase tracking-wider text-sm">South Korea Visa</p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                South Korea Visa For Indians – <span style={{ color: '#E31E24' }}>Apply Now!</span>
              </h1>

              {/* Key points */}
              <ul className="space-y-3 mb-8">
                {descriptionLines.slice(1).map((line, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: '#E31E24' }}
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-gray-300">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - Contact Form */}
            {fields.length > 0 && (
              <div
                className="rounded-2xl p-8 shadow-2xl"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.9)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Apply Now</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields.map((field, index) => (
                      <input
                        key={field._id || index}
                        type={field.type === 'number' ? 'tel' : field.type}
                        name={field.name}
                        value={formValues[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder={field.placeholder || field.label}
                        className="w-full px-4 py-3 bg-white border-0 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-red-500 transition-all outline-none"
                        required={field.required}
                      />
                    ))}
                  </div>

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
                    className="w-full py-4 rounded-full font-bold text-lg transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {submitLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : 'Apply Now'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== VISA INFO CARD ===== */}
      {visaTypesSection.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            {/* Section Title */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                South Korea Visa Types with Fees
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            {visaTypesSection.map((item, index) => (
              <div key={item._id || index} className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto">
                {/* Red header banner */}
                <div
                  className="py-4 px-6 text-center"
                  style={{ backgroundColor: '#E31E24' }}
                >
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>

                {/* Table-style content */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Processing time:</span>
                    <span className="font-semibold text-gray-900">5 working days</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Stay period:</span>
                    <span className="font-semibold text-gray-900">30 days</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Validity:</span>
                    <span className="font-semibold text-gray-900">90 Days</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Entry:</span>
                    <span className="font-semibold text-gray-900">Single</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Fees:</span>
                    <span className="text-xl font-bold" style={{ color: '#E31E24' }}>INR 6,599/-</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== DESIGNATED TRAVEL AGENCY - EMBASSY ===== */}
      {embassySection.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {embassySection.map((item, index) => (
              <div key={item._id || index} className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h2>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#E31E24' }}></div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {item.contentHtml}
                  </p>
                </div>
                <div className="flex justify-center">
                  {item.image && (
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      className="max-w-full h-auto rounded-2xl shadow-xl"
                      style={{ maxHeight: '400px' }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== DESIGNATED TRAVEL AGENCY - KTO ===== */}
      {ktoSection.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            {ktoSection.map((item, index) => (
              <div key={item._id || index} className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center order-2 lg:order-1">
                  {item.image && (
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      className="max-w-full h-auto rounded-2xl shadow-xl"
                      style={{ maxHeight: '400px' }}
                    />
                  )}
                </div>
                <div className="order-1 lg:order-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h2>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#E31E24' }}></div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {item.contentHtml}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== DOCUMENTS REQUIRED ===== */}
      {documents.length > 0 && (
        <section className="py-20 bg-white relative overflow-hidden">
          {/* Watermark */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-100 text-[100px] font-bold opacity-50 pointer-events-none whitespace-nowrap">
            DOCUMENTS
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6">
            {documents.map((doc, index) => (
              <div key={doc._id || index}>
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {doc.title}
                  </h2>
                  <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <ul className="space-y-4">
                    {doc.description?.split('\n').filter(line => line.trim()).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: '#E31E24' }}
                        >
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-gray-700">{item.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== ADDITIONAL REQUIREMENTS ===== */}
      {(additionalReqSection.length > 0 || employedSection.length > 0) && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Additional Requirements
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* For Employed People */}
              {additionalReqSection.map((item, index) => (
                <div
                  key={item._id || index}
                  className="bg-white rounded-xl p-6 shadow-md relative overflow-hidden border border-gray-100"
                >
                  {/* Large number */}
                  <div
                    className="text-5xl font-bold mb-4"
                    style={{ color: '#E31E24' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.contentHtml?.split('\r\n').filter(line => line.trim()).map((line, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: '#E31E24' }}
                        >
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Red triangle accent */}
                  <div
                    className="absolute bottom-0 right-0 w-16 h-16"
                    style={{
                      background: 'linear-gradient(135deg, transparent 50%, rgba(227,30,36,0.2) 50%)'
                    }}
                  />
                </div>
              ))}

              {/* For Self-Employed */}
              {employedSection.map((item, index) => (
                <div
                  key={item._id || index}
                  className="bg-white rounded-xl p-6 shadow-md relative overflow-hidden border border-gray-100"
                >
                  <div
                    className="text-5xl font-bold mb-4"
                    style={{ color: '#E31E24' }}
                  >
                    {String(additionalReqSection.length + index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.contentHtml?.split('\r\n').filter(line => line.trim()).map((line, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: '#E31E24' }}
                        >
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <div
                    className="absolute bottom-0 right-0 w-16 h-16"
                    style={{
                      background: 'linear-gradient(135deg, transparent 50%, rgba(227,30,36,0.2) 50%)'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== HOW TO APPLY ===== */}
      {howToApplySection.length > 0 && (
        <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#0f0f1a' }}>


          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                How to Apply for your South Korea Visa
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {howToApplySection.map((item, index) => (
                <div
                  key={item._id || index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 relative overflow-hidden border border-white/10"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: '#E31E24' }}
                  >
                    {index === 0 ? <Building className="w-6 h-6 text-white" /> : <Check className="w-6 h-6 text-white" />}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {item.contentHtml?.replace(/\r?\n/g, ' ').trim()}
                  </p>
                  {/* Large faded number */}
                  <div
                    className="absolute bottom-2 right-4 text-6xl font-bold pointer-events-none"
                    style={{ color: 'rgba(227,30,36,0.15)' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== WHY CHOOSE DU GLOBAL ===== */}
      {whyChooseSection.length > 0 && (
        <section className="py-20 bg-black relative overflow-hidden">
          {/* SOUTH KOREA watermark */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/5 text-[120px] font-bold pointer-events-none whitespace-nowrap">
            SOUTH KOREA
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Why Choose DU Global?
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            {/* Subtitle */}
            <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
              We offer expert help and guidance to people throughout their visa journey. And that's the reason why many choose us for their visa application. And this is why people choose us.
            </p>

            {/* Feature Cards with Background Images - Dynamic from API */}
            <div className="grid md:grid-cols-3 gap-6">
              {whyChooseSection.map((item, index) => {
                // Get image from images array or single image field
                const bgImage = item.images?.[0]
                  ? getImageUrl(item.images[0])
                  : item.image
                    ? getImageUrl(item.image)
                    : 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';

                return (
                  <div
                    key={item._id || index}
                    className="relative rounded-xl overflow-hidden min-h-[280px] group"
                    style={{
                      backgroundImage: `url('${bgImage}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/60"></div>
                    {/* Red top accent */}
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: '#E31E24' }}></div>
                    {/* Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                      <h3 className="text-xl font-bold text-white mb-2">{item.title?.trim()}</h3>
                      <p className="text-gray-300 text-sm">
                        {item.contentHtml?.replace(/\r?\n/g, ' ').trim()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
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

export default Southkoreavisaforindians;