import { useState, useEffect } from "react";
import { Loader2, Check, ArrowRight } from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";
import OurFootprints from "../components/home/OurFootprints";
import IsoCertificates from "../components/home/IsoCertificates";
import WhyUsSection from "../components/reusable/WhyUsSection";
import homeData from "../data/homeData.json";
import DynamicFormField from "../components/reusable/DynamicFormField";
import { Link } from "react-router-dom";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

const BangladeshVisasForUaeSingapore = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const partners = [
    { name: "Meydan FZ", logo: "assets/company-setup/meydan.png" },
    { name: "RAKEZ", logo: "assets/company-setup/rakez.png" },
    { name: "IFZA", logo: "assets/company-setup/ifza.png" },
    { name: "SPC Free Zone", logo: "assets/company-setup/spc.png" },
  ];

  const defaultFeatures = [
    "Global Presence with 35+ offices",
    "Expertise in Visa & Consular Services",
    "Dedicated Support Team",
    "End-to-End Assistance"
  ];

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BackendURL}/api/forms/slug/bangladesh-visas-for-uae-singapore`);
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
    if (imagePath.startsWith('/api/')) return `${BackendURL}${imagePath}`;
    if (imagePath.startsWith('/uploads/')) return `${BackendURL}/api${imagePath}`;
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
      const response = await fetch(`${BackendURL}/api/form-submissions/slug/bangladesh-visas-for-uae-singapore`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const res = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your request has been submitted.');
        setFormValues({});
      } else {
        setSubmitStatus('error');
        setSubmitMessage(res.message || 'Something went wrong.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setSubmitMessage('Failed to submit. Please try again.');
    } finally {
      setSubmitLoading(false);
      setTimeout(() => { setSubmitStatus(null); setSubmitMessage(''); }, 5000);
    }
  };

  if (loading) return <LoadingState message="Loading..." fullScreen />;
  if (error) return <ErrorState error={error} onRetry={fetchFormData} showHomeButton fullScreen />;

  const { fields = [], contentSections = {}, documents = [], faqs = [] } = formData || {};

  const globalExpertsSection = contentSections['Global Experts in'] || [];
  const weCaterSection = contentSections['We cater visas for Bangladesh Residents travelling to'] || [];
  const companySetupSection = contentSections['Company Setup in UAE'] || [];

  return (
    <div className="bg-white font-sans">

      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full min-h-[600px] sm:h-[600px] flex items-center bg-gray-900">
        <img
          src={formData?.image ? getImageUrl(formData.image) : ''}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full py-20">

          <div className="text-white space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Bangladesh Visas for <br />
              <span>UAE & Singapore</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-lg">
              Simplifying cross-border travel with expert visa solutions.
            </p>
          </div>

          {/* Form - Only if fields exist */}
          {fields && fields.length > 0 && (
            <div id="callback-form" className="bg-white rounded-2xl shadow-2xl p-5 max-w-md w-full ml-auto">

              {submitStatus && (
                <div className={`p-3 mb-4 text-sm rounded ${submitStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map((field, index) => (
                  <DynamicFormField
                    key={index}
                    field={field}
                    formValues={formValues}
                    handleInputChange={handleInputChange}
                    allFields={fields}
                    theme="light"
                  />
                ))}
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full py-4 bg-[#E31E24] text-white hover:bg-[#2D1F1F] hover:text-[#E31E24] rounded-full font-bold transition-opacity flex justify-center items-center gap-2"
                >
                  {submitLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Submit Request'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ===== GLOBAL EXPERTS SECTION ===== */}
      {globalExpertsSection && globalExpertsSection.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {globalExpertsSection.map((item, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    The Global Experts in <br />
                    <span className="text-[#E31E24]">Visa & Consular Services</span>
                  </h2>

                  <div className="space-y-4 mb-8">
                    {(item.contentHtml ? item.contentHtml.split('\n') : defaultFeatures).map((feature, i) => (
                      feature.trim() && (
                        <div key={i} className="flex items-start gap-3">
                          <div className="mt-1 w-5 h-5 rounded-full bg-[#E31E24] flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                          <p className="text-lg text-gray-700">{feature.trim()}</p>
                        </div>
                      )
                    ))}
                  </div>

                  <button className="flex items-center gap-2 text-[#E31E24] font-bold hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute -inset-4 bg-gray-100 rounded-2xl transform rotate-3 -z-10" />
                  {item.youtubeUrl ? (
                    <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
                      <iframe
                        src={item.youtubeUrl}
                        className="w-full h-full"
                        allowFullScreen
                        title="Video"
                      />
                    </div>
                  ) : (
                    <img
                      src={getImageUrl(item?.images?.[0] || item?.image)}
                      alt="Global Experts"
                      className="rounded-xl shadow-2xl w-full h-auto object-cover"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== WE CATER VISAS ===== */}
      {weCaterSection && weCaterSection.length > 0 && (
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">

              <div className="relative h-full min-h-[400px]">
                <img
                  src={getImageUrl(weCaterSection[0]?.images?.[0])}
                  alt="We cater visas"
                  className="rounded-2xl shadow-2xl w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {weCaterSection[0]?.title}
                </h2>
                <div className="text-lg text-gray-600 mb-12 leading-relaxed">
                  {weCaterSection[0]?.contentHtml}
                </div>

                <div className="flex flex-wrap gap-12">
                  {weCaterSection.splice(1).map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-4 group cursor-pointer">
                      <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:border-[#E31E24] transition-all duration-300">
                        <img
                          src={getImageUrl(item.images?.[0] || item.image)}
                          alt={item.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <span className="font-bold text-gray-800 group-hover:text-[#E31E24] transition-colors">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ===== COMPANY SETUP ===== */}
      {companySetupSection && companySetupSection.map((item, index) => (
        <section key={index} className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-2 relative">
              <div className="absolute -inset-4 bg-gray-50 rounded-full opacity-50 -z-10" />
              <img
                src={getImageUrl(item.images?.[0] || item.image)}
                alt={item.title}
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>

            <div className="order-1 md:order-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {item.title}
              </h2>
              <div className="prose prose-lg text-gray-600 mb-8">
                {item.contentHtml}
              </div>

              <div className="flex flex-wrap gap-8 mb-8 items-center">
                {partners.map((partner, idx) => (
                  <img
                    key={idx}
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                ))}
              </div>

              <Link to="/company-setup-in-the-uae">
                <button className="px-8 py-3 bg-[#E31E24] text-white rounded-full font-bold hover:bg-[#c41920] transition-colors shadow-lg shadow-red-200">
                  Explore Company Setup
                </button>
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* ===== WHY CHOOSE US ===== */}
      <WhyUsSection data={homeData.whyUsSection} />

      {/* ===== OUR FOOTPRINTS & ISO ===== */}
      <OurFootprints data={homeData.ourFootprintsSection} />

      <div className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <IsoCertificates data={homeData.certificationsSection} />
        </div>
      </div>

      {/* ===== DOCUMENTS & FAQ (Conditional) ===== */}
      {(documents.length > 0 || faqs.length > 0) && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 space-y-16">
            {documents.length > 0 && (
              <div>
                <h3 className="text-3xl font-bold text-center mb-8">Documents Required</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {documents.map((doc, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#E31E24]">
                      <h4 className="font-bold text-lg mb-2">{doc.title}</h4>
                      <p className="text-gray-600">{doc.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {faqs.length > 0 && (
              <div>
                <h3 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

    </div>
  );
};

export default BangladeshVisasForUaeSingapore;