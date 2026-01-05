import { useState, useEffect } from "react";
import { Check, ChevronDown, ChevronUp, CheckCircle, XCircle, Loader2 } from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

const Malaysiavisaforndians = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [activeVisaTab, setActiveVisaTab] = useState(0);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BackendURL}/api/forms/slug/malaysia-visa-for-indians`);
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
      const response = await fetch(`${BackendURL}/api/form-submissions/slug/malaysia-visa-for-indians`, {
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

  if (loading) return <LoadingState message="Loading Malaysia Visa..." fullScreen />;
  if (error) return <ErrorState error={error} onRetry={fetchFormData} showHomeButton fullScreen />;

  const { description, fields = [], faqs = [], documents = [], contentSections = {} } = formData || {};

  // Get sections by API keys
  const exploreSection = contentSections['Explore Malaysia'] || [];
  const visaTypesSection = contentSections['TYPES OF VISA'] || [];

  return (
    <div className="bg-white font-sans">

      {/* ===== HERO SECTION ===== */}
      <section
        className="relative w-full h-[800px] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: formData?.image ? `url(${getImageUrl(formData.image)})` : 'none'
        }}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 h-[800px] flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left - Hero Text */}
            <div className="text-white">
              <p className="text-xl mb-2">Apply For</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span style={{ color: '#E31E24' }}>Malaysia</span> Visa
              </h1>
              <p className="text-gray-300 text-lg">
                {description}
              </p>
            </div>

            {/* Bottom - Contact Form with transparent black bg */}
            {fields.length > 0 && (
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
              >
                <form className="flex flex-col w-full items-center gap-3" onSubmit={handleSubmit}>
                  {/* All fields in single row */}
                  {fields.map((field, index) => {
                    const fieldType = field.type || field.fieldType;

                    if (fieldType === 'select' || fieldType === 'dropdown') {
                      return (
                        <select
                          key={field._id || index}
                          name={field.name}
                          value={formValues[field.name] || ''}
                          onChange={handleInputChange}
                          className="flex-1 w-full px-4 py-3 bg-white border-0 rounded text-gray-700 focus:ring-2 focus:ring-red-500 transition-all outline-none appearance-none cursor-pointer text-sm"
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
                      );
                    } else {
                      return (
                        <input
                          key={field._id || index}
                          type={fieldType === 'number' ? 'tel' : fieldType}
                          name={field.name}
                          value={formValues[field.name] || ''}
                          onChange={handleInputChange}
                          placeholder={field.placeholder || field.label}
                          className="flex-1 w-full px-4 py-3 bg-white border-0 rounded text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-red-500 transition-all outline-none text-sm"
                          required={field.required}
                        />
                      );
                    }
                  })}

                  {/* Submit Status Message */}
                  {submitStatus && (
                    <div className={`w-full flex items-center gap-3 p-3 rounded ${submitStatus === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      {submitStatus === 'success' ? <CheckCircle className="w-5 h-5 text-green-400" /> : <XCircle className="w-5 h-5 text-red-400" />}
                      <p className={`text-sm ${submitStatus === 'success' ? 'text-green-300' : 'text-red-300'}`}>{submitMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="px-8 py-3 rounded-full font-bold text-base transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] whitespace-nowrap disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {submitLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : 'Apply Now'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== EXPLORE MALAYSIA SECTION ===== */}
      {exploreSection.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {exploreSection.map((item, index) => (
              <div key={item._id || index} className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h2>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#E31E24' }}></div>

                  {/* Badge if exists */}


                  <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                    {item.contentHtml}
                  </p>
                </div>
                <div className="flex justify-center relative">
                  {item.image && (
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      className="max-w-full h-auto rounded-2xl shadow-xl"
                      style={{ maxHeight: '450px' }}
                    />
                  )}
                  {item.badge?.text && (
                    <div
                      className="inline-flex absolute -top-5 right-10 items-center px-4 py-2 rounded-full text-white text-sm font-semibold mb-4"
                      style={{ backgroundColor: item.badge.background || '#E31E24' }}
                    >
                      {item.badge.text}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== TYPES OF VISA SECTION ===== */}
      {visaTypesSection.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                TYPES OF VISA
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            {/* Horizontal Tab buttons */}
            <div className="flex justify-center border-b border-gray-200 mb-0">
              {visaTypesSection.map((item, index) => (
                <button
                  key={item._id || index}
                  onClick={() => setActiveVisaTab(index)}
                  className={`px-8 py-4 font-semibold transition-all duration-300 border-b-4 ${activeVisaTab === index
                    ? 'border-red-500 text-red-500 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 bg-gray-100'
                    }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Tab content - Light gray bordered box */}
            <div className="bg-white border border-gray-200 p-8">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {visaTypesSection[activeVisaTab]?.contentHtml}
              </p>
            </div>

            {/* Apply Now button centered below */}
            <div className="mt-8 text-center">
              <button
                className="px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] uppercase tracking-wide"
              >
                Apply Now
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ===== DOCUMENTS REQUIRED SECTION ===== */}
      {documents.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Documents Required
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            <div className="space-y-8">
              {documents.map((doc, index) => (
                <div key={doc._id || index} className="bg-gray-50 rounded-2xl p-8">
                  {/* Document category header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: '#E31E24' }}
                    >
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{doc.title}</h3>
                  </div>

                  {/* Document items list */}
                  <ul className="space-y-3 ml-10">
                    {doc.description?.split('\n').filter(line => line.trim()).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-gray-400 shrink-0 mt-2"></div>
                        <span className="text-gray-600">{item.trim()}</span>
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

export default Malaysiavisaforndians;
