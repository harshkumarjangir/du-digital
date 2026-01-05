import { useState, useEffect } from "react";
import { Check, ChevronDown, ChevronUp, Star, Shield, Clock, Users, Globe, CheckCircle, XCircle, Loader2 } from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

// Static images for sections
const STATIC_IMAGES = {
  hero: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  explore: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
};

const Dubai5yeartouristvisa = () => {
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
      const response = await fetch(`${BackendURL}/api/forms/slug/dubai-5year-tourist-visa`);
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
      const response = await fetch(`${BackendURL}/api/form-submissions/slug/dubai-5year-tourist-visa`, {
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

  if (loading) return <LoadingState message="Loading Dubai 5-Year Tourist Visa..." fullScreen />;
  if (error) return <ErrorState error={error} onRetry={fetchFormData} showHomeButton fullScreen />;

  const { name, description, fields = [], faqs = [], documents = [], contentSections = {} } = formData || {};

  // Get sections by API keys
  const exploreSection = contentSections['Explore UAE with a 5-year Tourist Visa'] || [];
  const feesSection = contentSections['5-year UAE Tourist Visa for Indians: Fees and Processing Time'] || [];

  // Parse description for hero text
  const descriptionLines = description?.split('\r\n').filter(line => line.trim()) || [];

  // Why Choose features
  const whyChooseFeatures = [
    { icon: Shield, title: "Quality and Value", desc: "Premium service at competitive pricing" },
    { icon: Clock, title: "Fast Processing", desc: "Quick turnaround for your visa application" },
    { icon: Users, title: "Expert Support", desc: "24/7 dedicated customer assistance" },
    { icon: Globe, title: "Trusted Partner", desc: "17 Lac+ happy customers worldwide" }
  ];

  return (
    <div className="bg-white font-sans">

      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full h-[800px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${getImageUrl(formData?.image) || STATIC_IMAGES.hero})` }}
        />
        {/* Dark teal/blue overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,50,0.85) 0%, rgba(0,50,70,0.75) 100%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 h-[800px] flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left - Hero Text */}
            <div className="text-white">
              <p className="text-xl mb-2">Apply For</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span style={{ color: '#E31E24' }}>UAE/Dubai</span> Tourist Visa
              </h1>

              {/* Key points */}
              <ul className="space-y-3 mb-8">
                {descriptionLines.slice(2).map((line, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: '#E31E24' }}
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-gray-200">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - Contact Form */}
            {fields.length > 0 && (
              <div
                className="rounded-2xl p-8 shadow-2xl backdrop-blur-md"
                style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Apply Now</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {fields.filter(f => f.type !== 'checkbox' && f.type !== 'radio').map((field, index) => {
                    const fieldType = field.type || field.fieldType;

                    if (fieldType === 'select' || fieldType === 'dropdown') {
                      return (
                        <select
                          key={field._id || index}
                          name={field.name}
                          value={formValues[field.name] || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border-0 rounded-lg text-gray-700 focus:ring-2 focus:ring-red-500 transition-all outline-none appearance-none cursor-pointer"
                          required={field.required}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23374151' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: 'right 0.75rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
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
                          className="w-full px-4 py-3 bg-white border-0 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-red-500 transition-all outline-none"
                          required={field.required}
                        />
                      );
                    }
                  })}

                  {/* Radio buttons */}
                  {fields.filter(f => f.type === 'radio').map((field, index) => (
                    <div key={field._id || index} className="space-y-2">
                      <p className="text-white text-sm mb-2">{field.label}</p>
                      <div className="flex gap-4">
                        {field.options?.map((opt, optIdx) => (
                          <label key={opt._id || optIdx} className="flex items-center gap-2 text-white text-sm cursor-pointer">
                            <input
                              type="radio"
                              name={field.name}
                              value={opt.value}
                              onChange={handleInputChange}
                              className="w-4 h-4 accent-red-600"
                            />
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Checkbox */}
                  {fields.filter(f => f.type === 'checkbox').map((field, index) => (
                    <label key={field._id || index} className="flex items-start gap-3 text-gray-300 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        name={field.name}
                        checked={formValues[field.name] || false}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 accent-red-600 rounded"
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

      {/* ===== FEES AND PROCESSING TIME SECTION ===== */}
      {feesSection.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                5-year UAE Tourist Visa for Indians: Fees and Processing Time
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            {feesSection.map((item, index) => (
              <div key={item._id || index} className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">{item.title}</h3>

                {/* Visa details grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="p-4">
                    <p className="text-gray-500 text-sm mb-2">Processing time</p>
                    <p className="text-xl font-bold text-gray-900">7 Working Days</p>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-500 text-sm mb-2">Stay period</p>
                    <p className="text-xl font-bold text-gray-900">90 Days*</p>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-500 text-sm mb-2">Validity</p>
                    <p className="text-xl font-bold text-gray-900">5 Years</p>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-500 text-sm mb-2">Entry</p>
                    <p className="text-xl font-bold text-gray-900">Multiple</p>
                  </div>
                </div>

                <button
                  className="px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033]"
                >
                  Enquire Now
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== EXPLORE UAE SECTION ===== */}
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
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    {item.contentHtml}
                  </p>

                  {/* Trust badge */}
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4 flex">
                    <Star className="w-6 h-6" style={{ color: '#E31E24' }} fill="#E31E24" />
                    <span className="text-gray-700 font-semibold">17 Lac+ Happy Customers</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  {item.image && (
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      className="max-w-full h-auto rounded-2xl shadow-xl"
                      style={{ maxHeight: '450px' }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== ELIGIBILITY AND DOCUMENTS SECTION ===== */}
      {documents.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            {documents.map((doc, index) => (
              <div key={doc._id || index}>
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {doc.title}
                  </h2>
                  <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <ul className="space-y-4">
                    {doc.description?.split('\n').filter(line => line.trim()).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5"
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

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <section className="py-16 bg-black relative overflow-hidden">
        {/* Decorative curved lines on left */}
        <div
          className="absolute left-0 top-0 w-1/3 h-full opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cpath d='M0 100 Q100 200 0 300' fill='none' stroke='white' stroke-width='0.5'/%3E%3Cpath d='M20 80 Q120 200 20 320' fill='none' stroke='white' stroke-width='0.5'/%3E%3Cpath d='M40 60 Q140 200 40 340' fill='none' stroke='white' stroke-width='0.5'/%3E%3Cpath d='M60 40 Q160 200 60 360' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left center',
            backgroundSize: 'contain'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left - Title */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white italic mb-4">
                Why Choose Us
              </h2>
              {/* Decorative lines under title */}
              <div className="space-y-1">
                <div className="w-24 h-0.5 bg-gray-600"></div>
                <div className="w-16 h-0.5 bg-gray-600"></div>
                <div className="w-10 h-0.5 bg-gray-600"></div>
              </div>
            </div>

            {/* Right - Features Grid 2x2 */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
              {/* Quality and Value */}
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#E31E24' }}
                >
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Quality and Value</h3>
                  <p className="text-gray-400 text-sm">Quality Beyond Compromise, Value That Is Unmatched.</p>
                </div>
              </div>

              {/* Services */}
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#E31E24' }}
                >
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Services</h3>
                  <p className="text-gray-400 text-sm">Service that exceeds expectations</p>
                </div>
              </div>

              {/* Security */}
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#E31E24' }}
                >
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Security</h3>
                  <p className="text-gray-400 text-sm">The utmost security of our clients data is paramount for us</p>
                </div>
              </div>

              {/* Technology */}
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#E31E24' }}
                >
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Technology</h3>
                  <p className="text-gray-400 text-sm">Optimum use of evolving technology to strengthen our portfolio and service mechanism</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                className="flex items-center text-[#FF1033] font-medium hover:underline"
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

export default Dubai5yeartouristvisa;
