import { useState, useEffect } from "react";
import { CheckCircle, ChevronDown, ChevronUp, Check, XCircle, Loader2 } from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

const GreeceWorkVisa = () => {
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
      const response = await fetch(`${BackendURL}/api/forms/slug/greece-work-visa`);
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
    setFormValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      const response = await fetch(`${BackendURL}/api/form-submissions/slug/greece-work-visa`, {
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

  if (loading) return <LoadingState message="Loading Greece Work Visa..." fullScreen />;
  if (error) return <ErrorState error={error} onRetry={fetchFormData} showHomeButton fullScreen />;

  const { name, description, fields = [], faqs = [], contentSections = {} } = formData || {};

  // Get sections by API keys
  const whyChooseSection = contentSections['Why Choose Global LLC?'] || [];
  const feesSection = contentSections['Fees, Processing Time & Validity'] || [];
  const documentSection = contentSections['Document Checklist'] || [];
  const eligibilitySection = contentSections['Eligibility Criteria'] || [];
  const salarySection = contentSections['Salary & Benefits'] || [];
  const heroSection = contentSections['What is a Greece National Visa (Type D) for Employment?'] || [];

  // Parse description for hero points
  const heroPoints = description?.split('\r\n').filter(line => line.trim()) || [];

  return (
    <div className="bg-white font-sans">

      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full h-[800px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${getImageUrl(formData?.image) || 'https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'})` }}
        />
        {/* Dark overlay with red glow on right */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(161,0,0,0.3) 100%)'
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 h-[800px] flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            {/* Left - Hero Text */}
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2">
                Work in Greece: Secure Your National D-Type
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: '#C5202F' }}>
                – Visa with DU Global LLC
              </h2>

              {/* Hero Points with square checkmarks */}
              <ul className="space-y-4 mb-8">
                {heroPoints.slice(2).map((point, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: '#C5202F' }}
                    >
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-gray-200 text-lg">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - Contact Form */}
            {fields.length > 0 && (
              <div className="bg-black rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Speak to our Experts</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Form fields in grid for first 4 fields */}
                  <div className="grid grid-cols-2 gap-4">
                    {fields.slice(0, 4).map((field, index) => {
                      const fieldType = field.type || field.fieldType;

                      if (fieldType === 'select' || fieldType === 'dropdown') {
                        return (
                          <select
                            key={field._id || index}
                            name={field.name}
                            value={formValues[field.name] || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border-0 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
                            required={field.required || field.isRequired}
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23374151' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
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
                      } else {
                        const inputType = fieldType === 'email' ? 'email'
                          : fieldType === 'phone' || fieldType === 'number' ? 'tel'
                            : 'text';
                        return (
                          <input
                            key={field._id || index}
                            name={field.name}
                            value={formValues[field.name] || ''}
                            onChange={handleInputChange}
                            type={inputType}
                            placeholder={field.placeholder || field.label}
                            className="w-full px-4 py-3 bg-white border-0 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-red-500 transition-all outline-none"
                            required={field.required || field.isRequired}
                          />
                        );
                      }
                    })}
                  </div>

                  {/* Checkbox field */}
                  {fields.filter(f => (f.type || f.fieldType) === 'checkbox').map((field, index) => (
                    <label key={field._id || index} className="flex items-start gap-3 text-gray-300 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        name={field.name}
                        checked={formValues[field.name] || false}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 accent-red-600 rounded"
                        required={field.required || field.isRequired}
                      />
                      <span>{field.label}</span>
                    </label>
                  ))}

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
                    {submitLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : 'Get Started'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
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
                <div className="flex flex-wrap gap-2 justify-center">
                  {item.images.length > 0 && (
                    item.images.map(p => <img
                      src={getImageUrl(p)}
                      alt={item.title}
                      className="w-[200px] h-auto rounded-xl shadow-lg"
                    />)
                  )}{
                    item.images.length == 0 && item.image &&
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      className="max-w-full h-auto rounded-xl shadow-lg"
                      style={{ maxHeight: '400px' }}
                    />

                  }
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* ===== SALARY & BENEFITS SECTION ===== */}
      {salarySection.length > 0 && (
        <section className="py-20 bg-gray-900 relative overflow-hidden">
          {/* Abstract curved lines background */}
          <div
            className="absolute left-0 top-0 w-1/2 h-full opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cpath d='M0 200 Q100 100 200 200 T400 200' fill='none' stroke='white' stroke-width='2'/%3E%3Cpath d='M0 250 Q100 150 200 250 T400 250' fill='none' stroke='white' stroke-width='2'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            {salarySection.map((item, index) => (
              <div key={item._id || index} className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Salary & Benefits
                  </h2>
                  <div className="w-16 h-1 mb-8" style={{ backgroundColor: '#C5202F' }}></div>
                  <ul className="space-y-4">
                    {item.contentHtml?.split('\r\n').filter(line => line.trim()).map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: '#C5202F' }}
                        >
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-gray-200">{benefit}</span>
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

      {/* ===== ELIGIBILITY CRITERIA SECTION ===== */}
      {eligibilitySection.length > 0 && (
        <section className="py-20 bg-white relative overflow-hidden">
          {/* Large watermark text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-100 text-[120px] font-bold opacity-50 pointer-events-none whitespace-nowrap">
            ELIGIBILITY
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            {eligibilitySection.map((item, index) => (
              <div key={item._id || index} className="grid md:grid-cols-2 gap-12 items-center">
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
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Eligibility Criteria
                  </h2>
                  <div className="w-16 h-1 mb-8" style={{ backgroundColor: '#C5202F' }}></div>
                  <ul className="space-y-4">
                    {item.contentHtml?.split('\r\n').filter(line => line.trim()).map((criteria, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: '#C5202F' }}
                        >
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-gray-700">{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== DOCUMENT CHECKLIST SECTION ===== */}
      {documentSection.length > 0 && (
        <section className="py-20 bg-gray-900 relative overflow-hidden">
          {/* Large watermark text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-800 text-[100px] font-bold opacity-30 pointer-events-none whitespace-nowrap">
            DOCUMENT
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Document Checklist
              </h2>
              <div className="w-16 h-1 mx-auto" style={{ backgroundColor: '#C5202F' }}></div>
            </div>

            {/* Document Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {documentSection.map((doc, index) => (
                <div
                  key={doc._id || index}
                  className="rounded-2xl p-8 text-white"
                  style={{
                    background: 'linear-gradient(135deg, #C5202F 0%, #8B0000 100%)'
                  }}
                >
                  <h3 className="text-2xl font-bold mb-6">{doc.title}</h3>
                  <ul className="space-y-4">
                    {doc.contentHtml?.split('\r\n').filter(line => line.trim()).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <Check className="w-5 h-5 text-white shrink-0 mt-0.5" strokeWidth={3} />
                        <span className="text-white/95">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FEES, PROCESSING & VALIDITY SECTION ===== */}
      {feesSection.length > 0 && (
        <section className="py-20 bg-white relative overflow-hidden">
          {/* Large watermark text */}
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-100 text-[100px] font-bold opacity-50 pointer-events-none whitespace-nowrap">
            VALIDITY
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Fees, Processing Time & Validity
              </h2>
              <div className="w-16 h-1 mx-auto" style={{ backgroundColor: '#C5202F' }}></div>
            </div>

            {/* Fees Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {feesSection.map((item, index) => {
                const number = String(index + 1).padStart(2, '0');
                return (
                  <div
                    key={item._id || index}
                    className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg relative overflow-hidden min-h-[180px]"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.contentHtml?.replace(/\r?\n/g, ' ').trim()}
                    </p>
                    {/* Large number at bottom right */}
                    <div
                      className="absolute bottom-2 right-4 text-6xl font-bold opacity-15"
                      style={{ color: '#C5202F' }}
                    >
                      {number}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      )}

      {/* ===== WHY CHOOSE SECTION ===== */}
      {whyChooseSection.length > 0 && (
        <section className="py-20 bg-gray-900 relative overflow-hidden">
          {/* Abstract curved lines background */}
          <div
            className="absolute right-0 top-0 w-1/2 h-full opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cpath d='M0 200 Q100 100 200 200 T400 200' fill='none' stroke='white' stroke-width='2'/%3E%3Cpath d='M0 250 Q100 150 200 250 T400 250' fill='none' stroke='white' stroke-width='2'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            {whyChooseSection.map((item, index) => (
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
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Why Choose Global LLC?
                  </h2>
                  <div className="w-16 h-1 mb-8" style={{ backgroundColor: '#C5202F' }}></div>
                  <ul className="space-y-4">
                    {item.contentHtml?.split('\r\n').filter(line => line.trim()).map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: '#C5202F' }}
                        >
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-gray-200">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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

export default GreeceWorkVisa;