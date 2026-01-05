import { useState, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  Shield,
  Users,
  Globe,
  Award,
  Briefcase,
  Layers,
  Wrench,
  Cpu,
  Heart,
  HardHat,
  Factory,
  UtensilsCrossed,
  Zap,
  CheckCheck,
  TrendingUp,
  ArrowRight,
  Mail,
  Phone,
  Check
} from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";
import connectData from "../data/globalRecruitment.json";
import ConnectWithUs from "../components/reusable/ConnectWithUs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';


// Default icons for content sections
const defaultIcons = [Globe, Shield, Layers, Users, Clock, Award, Briefcase, Wrench];

// Industry icons mapping
const industryIconMap = {
  "oil": Zap,
  "gas": Zap,
  "energy": Zap,
  "it": Cpu,
  "digital": Cpu,
  "healthcare": Heart,
  "construction": HardHat,
  "engineering": HardHat,
  "manufacturing": Factory,
  "supply": Factory,
  "hospitality": UtensilsCrossed,
  "services": UtensilsCrossed
};

const getIndustryIcon = (title) => {
  const lowerTitle = title?.toLowerCase() || '';
  for (const [key, IconComponent] of Object.entries(industryIconMap)) {
    if (lowerTitle.includes(key)) {
      return IconComponent;
    }
  }
  return Briefcase;
};

const Globalrecruitmentservices = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Dynamic form state
  const [formValues, setFormValues] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BackendURL}/api/forms/slug/global-recruitment-services`);
      if (!response.ok) throw new Error("Failed to fetch form data");
      const data = await response.json();
      setFormData(data);

      // Initialize form values from fields
      const initialValues = {};
      data.fields?.forEach(field => {
        initialValues[field.name] = '';
      });
      setFormValues(initialValues);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${BackendImagesURL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Sending to contact endpoint - mapping fields if necessary or sending raw
      const response = await fetch(`${BackendURL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formValues,
          source: 'Global Recruitment Services',
          formId: formData?._id
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form
        const resetValues = {};
        formData.fields?.forEach(field => {
          resetValues[field.name] = '';
        });
        setFormValues(resetValues);

        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Parse content roles from HTML content
  const parseRoles = (contentHtml) => {
    if (!contentHtml) return [];
    return contentHtml
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line && line.length > 0);
  };

  if (loading) return <LoadingState message="Loading recruitment services..." fullScreen />;
  if (error) return <ErrorState error={error} onRetry={fetchFormData} showHomeButton fullScreen />;

  const { name, description, faqs = [], contentSections = {}, fields = [] } = formData || {};

  // Get dynamic sections from API
  const whyChooseSection = contentSections['Why Choose DU Global?'] || [];
  const ourServicesSection = contentSections['Our Services'] || [];
  const industriesSection = contentSections['Industries We Serve'] || [];
  const trackRecordSection = contentSections['Our Track Record'] || [];
  const readyToBuildSection = contentSections['Ready to Build Your Team?'] || [];

  return (
    <div className="font-sans antialiased text-gray-900">


      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[800px] flex items-center overflow-hidden md:px-12">

        {/* Background Image */}
        {formData?.image && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${getImageUrl(formData.image)})` }}
          />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT CONTENT */}
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
              Global Recruitment Services – Apply Now!
            </h1>

            <h2 className="text-xl md:text-2xl font-semibold text-gray-200 mb-5">
              Connecting Skilled Talents from India to Abroad
            </h2>

            <p className="text-base md:text-lg text-gray-100 leading-relaxed max-w-2xl mb-10">
              {description ||
                "DU Global is a global recruitment agency that specializes in connecting employers worldwide with highly skilled Indian professionals across various sectors."}
            </p>

            {/* <button className="inline-flex items-center gap-3 bg-[#c60505] hover:bg-[#a00000] text-white px-10 py-4 rounded-lg font-bold text-lg transition shadow-lg">
              Get Started Now <ArrowRight size={20} />
            </button> */}
          </div>

          {/* RIGHT FORM CARD */}
          <div className="bg-white rounded-2xl p-6 md:p-6 shadow-2xl w-full max-w-md ml-auto">

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Global Workforce Recruitment
            </h3>

            {submitSuccess && (
              <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-5 flex items-center gap-3 border border-green-200">
                <CheckCircle size={20} />
                Thank you! We'll contact you soon.
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields
                  .filter(f => f.isActive)
                  .sort((a, b) => a.order - b.order)
                  .map((field) => (
                    <div
                      key={field._id}
                      className={
                        field.type === 'select'
                          ? 'md:col-span-2'
                          : 'col-span-1'
                      }
                    >
                      {field.type === 'select' ? (
                        <select
                          name={field.name}
                          value={formValues[field.name] || ''}
                          onChange={handleInputChange}
                          required={field.required}
                          className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#c60505] focus:ring-1 focus:ring-[#c60505] outline-none text-gray-700 text-sm"
                        >
                          <option value="">
                            {field.placeholder || `Select ${field.label}`}
                          </option>
                          {field.options?.map(opt => (
                            <option key={opt._id || opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formValues[field.name] || ''}
                          onChange={handleInputChange}
                          placeholder={field.placeholder || field.label}
                          required={field.required}
                          className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#c60505] focus:ring-1 focus:ring-[#c60505] outline-none text-gray-900 text-sm"
                        />
                      )}
                    </div>
                  ))}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] ${submitting
                  ? 'opacity-60 cursor-not-allowed'
                  : ''
                  }`}
              >
                {submitting ? 'Sending...' : 'Get Started Now'}
              </button>
            </form>
          </div>
        </div>
      </section>



      {/* ===== WHY CHOOSE DU GLOBAL SECTION (Dynamic) ===== */}
      {whyChooseSection.length > 0 && (
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-4">
                Why Choose DU Global?
                {/* <span className="text-[#c60505]">DU Global?</span> */}
              </h2>
              {/* <div className="w-20 h-1 bg-[#c60505] mx-auto" /> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseSection.map((item, index) => {
                const IconComponent = defaultIcons[index % defaultIcons.length];
                return (
                  <div
                    key={item._id || index}
                    className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 relative overflow-hidden group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Red Triangle Accent */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-50 border-t-[#c60505] border-l-50 border-l-transparent" />

                    <div className="w-16 h-16 rounded-full border-2 border-[#c60505] flex items-center justify-center mb-6 group-hover:bg-[#c60505] group-hover:text-white transition-colors duration-300">
                      <IconComponent size={30} className="text-[#c60505] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {item.title}
                    </h3>

                    <div
                      className="text-gray-900 leading-relaxed text-sm md:text-base"
                      dangerouslySetInnerHTML={{ __html: item.contentHtml?.replace(/\r\n/g, ' ') }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}


      {/* ===== OUR SERVICES SECTION (IMAGE MATCHED UI) ===== */}
      {ourServicesSection.length > 0 && (
        <section className="py-20 bg-[#3a3a3a]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {/* Heading */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Our Services
              </h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {ourServicesSection.map((item, index) => {
                const IconComponent = defaultIcons[index % defaultIcons.length];

                return (
                  <div
                    key={item._id || index}
                    className="relative bg-white rounded-2xl shadow-xl p-6 overflow-hidden"
                  >
                    {/* Red corner ribbon */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#c60505] rotate-45 translate-x-12 -translate-y-12" />

                    {/* Icon */}
                    <div className="mb-6">
                      <IconComponent
                        size={34}
                        className="text-[#c60505]"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {item.title}
                    </h3>

                    {/* Content */}
                    <div
                      className="text-gray-900 text-sm md:text-base lg:text-lg leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: item.contentHtml?.replace(/\r\n/g, " "),
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}



      {/* ===== INDUSTRIES WE SERVE (SLIDER) ===== */}
      {industriesSection.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 md:px-12">

            {/* Heading */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Industries We Serve
              </h2>
            </div>

            {/* Slider */}
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={32}
                slidesPerView={1}
                navigation={{
                  nextEl: ".industry-next",
                  prevEl: ".industry-prev",
                }}
                pagination={{
                  el: ".industry-dots",
                  clickable: true,
                }}
                breakpoints={{
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {industriesSection.map((industry, index) => {
                  const IconComponent = getIndustryIcon(industry.title);
                  const roles = parseRoles(industry.contentHtml);

                  return (
                    <SwiperSlide key={industry._id || index}>
                      <div className="bg-white rounded-2xl shadow-xl p-8 h-full transition hover:shadow-2xl">

                        {/* Icon */}
                        <div className="mb-6">
                          <IconComponent size={40} className="text-[#c60505]" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-[#333333] mb-6">
                          {industry.title}
                        </h3>

                        {/* Roles */}
                        <ul className="space-y-3">
                          {roles.map((role, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="w-5 h-5 flex items-center justify-center bg-[#c60505] text-white text-xs rounded-sm mt-1">
                                ✓
                              </span>
                              <span className="text-[#333333] text-sm leading-relaxed">
                                {role}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              {/* Navigation Arrows */}
              <button className="industry-prev absolute left-[-40px] top-1/2 -translate-y-1/2 text-5xl text-black">
                ‹
              </button>
              <button className="industry-next absolute right-[-40px] top-1/2 -translate-y-1/2 text-5xl text-black">
                ›
              </button>
            </div>

            {/* Dots */}
            <div className="industry-dots flex justify-center gap-2 mt-8" />
          </div>
        </section>
      )}

      {/* ===== OUR TRACK RECORD SECTION (Dynamic) ===== */}
      {trackRecordSection.length > 0 && (
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Stats */}
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Our Track Record
                </h2>

                <div className="space-y-1">
                  {parseRoles(trackRecordSection[0]?.contentHtml).map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-0"
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                        <Check size={20} className="text-white" />
                      </div>
                      <p className="text-white text-base leading-relaxed">
                        {stat}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="flex justify-center">
                {trackRecordSection[0]?.image ? (
                  <img
                    src={getImageUrl(trackRecordSection[0].image)}
                    alt="Our Track Record"
                    className="w-full h-auto rounded-3xl shadow-xl"
                  />
                ) : (
                  <div className="bg-gray-50 rounded-3xl p-16 text-center">
                    <TrendingUp size={80} className="text-[#c60505] mx-auto mb-6" strokeWidth={1} />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Proven Results
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}


      {/* ===== READY TO BUILD YOUR TEAM CTA ===== */}
      {readyToBuildSection.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* LEFT CONTENT */}
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {readyToBuildSection[0]?.title || "Ready to Build Your Team?"}
              </h2>

              <div
                className="text-gray-700 text-lg leading-relaxed space-y-3"
                dangerouslySetInnerHTML={{
                  __html: readyToBuildSection[0]?.contentHtml
                    ?.replace(/\r\n\r\n/g, '</p><p>')
                    ?.replace(/\r\n/g, '<br/>')
                    ?.replace(/^/, '<p>')
                    ?.concat('</p>')
                }}
              />

              {/* <p className="mt-0 font-semibold text-gray-900 text-lg">
                Contact us today for a personalized recruitment plan that works for you.
              </p> */}
            </div>

            {/* RIGHT IMAGE */}
            {readyToBuildSection[0]?.image && (
              <div className="flex justify-center lg:justify-end">
                <img
                  src={getImageUrl(readyToBuildSection[0].image)}
                  alt="Ready to Build Your Team"
                  className="w-full max-w-[520px] rounded-[28px] shadow-xl object-cover"
                />
              </div>
            )}
          </div>
        </section>
      )}



      <ConnectWithUs data={connectData.connect} />
    </div>
  );
};

export default Globalrecruitmentservices;
