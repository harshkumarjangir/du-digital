import { useState, useEffect } from "react";
import { CheckCircle, Phone, MapPin, Mail, XCircle, Loader2, Check } from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";
import ConsultationModal from "../components/reusable/ConsultationModal";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

const Companysetup = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      const response = await fetch(`${BackendURL}/api/form-submissions/slug/company-setup-in-the-uae`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const res = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.');
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

  // Static partners data
  const partners = [
    {
      name: "Meydan FZ",
      logo: "assets/company-setup/meydan.png",
    },
    {
      name: "RAKEZ",
      logo: "assets/company-setup/rakez.png",
    },
    {
      name: "IFZA",
      logo: "assets/company-setup/ifza.png",
    },
    {
      name: "SPC Free Zone",
      logo: "assets/company-setup/spc.png",
    },
  ];


  const heroImage = getImageUrl(formData?.image) || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';

  return (
    <div className="bg-white font-sans">

      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full sm:h-[600px] min-h-[600px]overflow-hidden">
        <img
          src={heroImage}
          alt="Company Setup Hero"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 h-[600px] flex items-center">
          <div className={`${fields.length > 0 ? 'grid md:grid-cols-2 gap-12 items-center' : ''} w-full`}>
            {/* Left - Hero Text */}
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {name || 'Company Formation in Dubai UAE'}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                {heroBadges.map((badge, index) => (
                  <span key={index} className="pl-0 pr-4 py-1  text-lg font-semibold text-white border-r border-white last:border-r-0">
                    {badge}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-block px-8 py-4 rounded-full font-bold text-lg text-[#FFFDF5] transition-all duration-300 bg-[#FF1033] hover:bg-[#511313] hover:text-[#FF1033] shadow-lg"
              >
                Book A Free Consultation
              </button>
            </div>

            {/* Right - Contact Form (only show if fields exist) */}
            {fields.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Get Your Free Consultation</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {fields.map((field, index) => {
                    // Get field type from either 'type' or 'fieldType' property
                    const fieldType = field.type || field.fieldType;

                    // Render different input types based on field type
                    if (fieldType === 'select' || fieldType === 'dropdown') {
                      return (
                        <select
                          key={field._id || index}
                          name={field.name}
                          value={formValues[field.name] || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none bg-white text-gray-700 appearance-none cursor-pointer"
                          required={field.required || field.isRequired}
                          aria-label={field.label || field.placeholder}
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
                          name={field.name}
                          value={formValues[field.name] || ''}
                          onChange={handleInputChange}
                          placeholder={field.placeholder || field.label}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none resize-none"
                          required={field.required || field.isRequired}
                          aria-label={field.label || field.placeholder}
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
                          name={field.name}
                          value={formValues[field.name] || ''}
                          onChange={handleInputChange}
                          type={inputType}
                          placeholder={field.placeholder || field.label}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                          required={field.required || field.isRequired}
                          aria-label={field.label || field.placeholder}
                        />
                      );
                    }
                  })}

                  {/* Submit Status Message */}
                  {submitStatus && (
                    <div className={`flex items-center gap-3 p-3 rounded ${submitStatus === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {submitStatus === 'success' ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                      <p className={`text-sm ${submitStatus === 'success' ? 'text-green-700' : 'text-red-700'}`}>{submitMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="w-full py-4 rounded-full font-bold text-lg transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {submitLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : 'Submit Enquiry'}
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
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            {heroSection.map((item, index) => (
              <div key={item._id || index} className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  {/* <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    {item.title}
                  </h2> */}
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    {item.title.split("Company Setup")[0]}
                    <span className="text-red-600 font-bold">Company Setup</span>
                    {item.title.split("Company Setup")[1]}
                  </h2>

                  <div className="text-gray-800 text-base md:text-lg leading-relaxed space-y-4">
                    {item.contentHtml?.split('\r\n\r\n').map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center">
                  {item?.images?.length > 0 ? (
                    item.images.map(p => <img
                      src={getImageUrl(p)}
                      alt={item.title}
                      className="max-w-full h-auto rounded-xl shadow-lg"
                      style={{ maxHeight: '400px' }}
                    />)
                  ) : item.image && <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="max-w-full h-auto rounded-xl shadow-lg"
                    style={{ maxHeight: '400px' }}
                  />}
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
          className="py-20 relative min-h-[500px] max-w-6xl mx-auto rounded-lg overflow-hidden"
        >
          {/* Background Image */}
          {item?.images?.length > 0 ? (
            <div
              className="absolute inset-0 bg-cover bg-center rounded-md"
              style={{ backgroundImage: `url(${getImageUrl(item.images[0])})` }}
            />
          ) : item.image && <div
            className="absolute inset-0 bg-cover bg-center rounded-md"
            style={{ backgroundImage: `url(${getImageUrl(item.image)})` }}
          />}
          <div className="absolute inset-0 bg-black/80 rounded-md" />

          <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-white rounded-md">
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
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            {freezoneSection.map((item, index) => (
              <div key={item._id || index} className="grid md:grid-cols-2 gap-6 items-center">
                <div className="order-2 md:order-2 flex justify-center">
                  {item?.images?.length > 0 ? (
                    item.images.map(p => <img
                      src={getImageUrl(p)}
                      alt={item.title}
                      className="max-w-full h-auto rounded-xl shadow-lg"
                      style={{ maxHeight: '500px' }}
                    />)
                  ) : item.image && <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="max-w-full h-auto rounded-xl shadow-lg"
                    style={{ maxHeight: '500px' }}
                  />}
                </div>
                <div className="order-1 md:order-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Company Formation in <span style={{ color: '#A10000' }}>Freezone</span>
                  </h2>
                  <div className="text-gray-800 text-base md:text-[17px] leading-relaxed space-y-4">
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


      {/* ===== OUR PARTNERS SECTION ===== */}
      <section className="py-16 bg-black">
        <div className="max-w-[1400px] mx-auto px-6">

          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Our <span className="text-red-600">Partners</span>
            </h2>
          </div>

          {/* Logos */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-xl flex items-center justify-center 
                     w-full md:w-[160px] h-[100px]
                     hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-[80px] max-w-[160px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ===== OUR STRENGTH SECTION ===== */}
      {strengthSection.length > 0 && (
        <section className="py-20" style={{ backgroundColor: '#FFF5F4' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Our <span style={{ color: '#A10000' }}>Strength</span>
              </h2>
              {/* <div className="w-16 h-1 mx-auto" style={{ backgroundColor: '#A10000' }}></div> */}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {strengthSection.map((item, index) => (
                <div
                  key={item._id || index}
                  className="group bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-6 bg-red-600 group-hover:bg-black"
                  // style={{ backgroundColor: 'rgba(161, 0, 0, 0.1)' }}
                  >
                    <Check className="w-8 h-8 text-white font-semibold\" />
                  </div>
                  <h3 className="text-xl font-bold text-[#333333] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#333333] text-sm md:text-[17px] leading-relaxed">
                    {item.contentHtml?.replace(/\r?\n/g, ' ').trim()}
                  </p>
                </div>
              ))}


            </div>

          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-block px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] shadow-lg"
            >
              Book A Free Consultation
            </button>
          </div>
        </section>
      )}


      {/* ===== BENEFITS SECTION ===== */}
      {benefitsSection.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">

            {/* Heading */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                Benefits of Establishing a{" "}
                <span className="text-[#A10000]">Business</span> in the UAE
              </h2>
            </div>

            {benefitsSection.map((item, index) => (
              <div
                key={item._id || index}
                className="grid md:grid-cols-2 gap attaching-center items-center"
              >
                {/* Image */}
                <div className="flex justify-center">
                  {item?.images?.length > 0 ? (
                    item.images.map(p => <img
                      src={getImageUrl(p)}
                      alt={item.title}
                      className="max-w-full h-auto rounded-xl shadow-lg"
                    />)
                  ) : item.image && <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="max-w-full h-auto rounded-xl shadow-lg"

                  />}
                </div>

                {/* Content */}
                <div>
                  <ul className="space-y-2 max-md:mt-4 mb-10">
                    {item.contentHtml
                      ?.split("\r\n")
                      .filter((line) => line.trim())
                      .map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-[#A10000] flex items-center justify-center shrink-0 mt-1">
                            <Check
                              className="w-4 h-4 text-white"
                              strokeWidth={3}
                            />
                          </div>
                          <span className="text-base md:text-[17px] text-gray-800 leading-relaxed">
                            {benefit}
                          </span>
                        </li>
                      ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-block px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] shadow-lg"
                  >
                    Book A Free Consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* ===== TYPES OF BUSINESS LICENSE SECTION ===== */}
      {licenseTypesSection.length > 0 && (
        <section className="py-20" style={{ backgroundColor: '#f5f5f5' }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Types of Business <span style={{ color: '#A10000' }}>License</span> in the UAE
              </h2>
              {/* <div className="w-16 h-1 mx-auto" style={{ backgroundColor: '#A10000' }}></div> */}
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
                      <p className="text-gray-600 text-base leading-relaxed">
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
        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            {entityOptionsSection.map((item, index) => (
              <div key={item._id || index}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
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
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Steps to Set Up a <span style={{ color: '#A10000' }}>Business</span> in the UAE Free Zones
              </h2>
              {/* <div className="w-16 h-1 mx-auto" style={{ backgroundColor: '#A10000' }}></div> */}
            </div>

            {/* Steps Grid - Horizontal scroll on mobile */}
            <div className="grid md:grid-cols-3 gap-6">
              {stepsSection.map((step, index) => (
                <div
                  key={step._id || index}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  {/* Image */}
                  <div className="h-48 md:h-60 overflow-hidden rounded-xl p-3">
                    {step?.images?.length > 0 ? (
                      step.images.map((image, index) => (
                        <img
                          key={index}
                          src={getImageUrl(image)}
                          alt={step.title}
                          className="w-full h-full object-cover p-0 rounded-xl"
                        />
                      ))
                    ) :step.image&& (
                        <img
                          key={index}
                          src={getImageUrl(step.image)}
                          alt={step.title}
                          className="w-full h-full object-cover p-0 rounded-xl"
                        />
                    )}
                  </div>

                  {/* Content */}
                  <div className="px-6">
                    <div
                      className="text-4xl font-bold mb-3"
                      style={{ color: '#A10000' }}
                    >
                      {/* {String(index + 1).padStart(2, '0')} */}
                    </div>
                    <h3 className="text-lg font-bold text-[#A10000] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[#333333] text-base leading-relaxed">
                      {step.contentHtml?.replace(/\r?\n/g, ' ').trim()}
                    </p>
                  </div>

                  <div className="flex justify-start ml-6 py-5">
                    {/* CTA Button */}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="inline-block px-5 py-2 rounded-full font-bold text-lg transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] shadow-lg"
                    >
                      Book A Free Consultation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== DOCUMENTS REQUIRED SECTION ===== */}
      {documents.length > 0 && (
        <section className="py-20 md:px-12" style={{ backgroundColor: '#FFF2F2' }}>
          <div className="max-w-7xl mx-auto px-6">
            {documents.map((doc, index) => (
              <div key={doc._id || index}>
                {/* <h2 className="text-3xl md:text-4xl lg:text-[43px] font-bold text-gray-900 mb-8 text-left">
                  {doc.title}
                </h2> */}
                <h2 className="text-3xl md:text-4xl lg:text-[43px] font-bold text-gray-900 mb-6">
                  {doc.title.split("Company Setup")[0]}
                  <span className="text-red-600 font-bold">Company Setup</span>
                  {doc.title.split("Company Setup")[1]}
                </h2>

                <div className="">
                  <ul className="space-y-4">
                    {doc.description?.split('\n').filter(line => line.trim()).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: '#A10000' }}>
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-black text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-start ml-0 pt-6">
                  {/* CTA Button */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-block px-5 py-2 rounded-full font-bold text-lg transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] shadow-lg"
                  >
                    Book A Free Consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* ===== SPEAK TO OUR EXPERTS ===== */}
      <section
        id="consultation"
        className="py-24 bg-black"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

            {/* LEFT PANEL */}
            <div className="flex flex-col justify-center bg-black text-white px-10 py-14 rounded-2xl">
              <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight mb-10">
                Speak to our <br /> experts
              </h2>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center w-fit px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] shadow-lg"
              >
                Contact Now
              </button>
            </div>

            {/* PHONE CARD */}
            <div className="bg-white rounded-2xl p-5 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-[#A10000] flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Phone
              </h3>

              <a
                href="tel:+917969269997"
                className="block text-lg text-[#A10000] mb-3 hover:text-[#333366]"
              >
                * INDIA: +91-7969269997
              </a>

              <a
                href="tel:+971585955766"
                className="block text-lg text-[#A10000] hover:text-[#333366]"
              >
                * UAE: +971-585955766
              </a>
            </div>


            {/* LOCATION CARD */}
            <div className="bg-white rounded-2xl p-5 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-[#A10000] flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Location
              </h3>

              <p className="text-lg text-[#A10000] mb-6">
                INDIA: 3rd Floor, B-86, Defence Colony, New Delhi – 110024
              </p>

              <p className="text-lg text-[#A10000]">
                DUBAI: Office #4001, 40th Floor, Aspin Commercials Tower, Sheikh Zayed Road, Dubai, UAE
              </p>
            </div>

          </div>
        </div>
      </section>

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fields={fields}
        formValues={formValues}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        submitStatus={submitStatus}
        submitMessage={submitMessage}
        submitLoading={submitLoading}
        image={heroImage}
      />

    </div>
  );
};

export default Companysetup;