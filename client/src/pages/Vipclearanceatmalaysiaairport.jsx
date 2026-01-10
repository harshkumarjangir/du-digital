import React, { useState, useEffect } from "react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";
import DynamicFormField from "../components/reusable/DynamicFormField";
import { Loader2, Check, Users, Plane, ArrowRight, MapPin, FileText } from "lucide-react";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

const Vipclearanceatmalaysiaairport = () => {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            const response = await fetch(`${BackendURL}/api/forms/slug/vip-clearance-at-malaysia-airport`);
            if (!response.ok) throw new Error("Failed to fetch page data");
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
            const response = await fetch(`${BackendURL}/api/form-submissions/slug/vip-clearance-at-malaysia-airport`, {
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

    if (loading) return <LoadingState message="Loading Content..." fullScreen />;
    if (error) return <ErrorState error={error} onRetry={fetchFormData} showHomeButton fullScreen />;

    const { fields = [], contentSections = {}, documents = [], faqs = [], description, image } = formData || {};

    const vipServiceItems = contentSections['VIP clearance service at Malaysian Immigration'] || [];
    const whatWeOfferItems = contentSections['What we offer ?'] || [];
    const visaCentresSection = contentSections['Official Malaysia Visa Application Centres now near you'] || [];

    const serviceIcons = [Users, Plane, ArrowRight];

    return (
        <div className="bg-white font-sans">
            {/* ===== HERO SECTION ===== */}
            <section className="relative w-full h-[600px] sm:h-[600px] flex items-center justify-end text-center bg-gray-900">
                <img
                    src={image ? getImageUrl(image) : ''}
                    alt="VIP Clearance at Malaysia Airport"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                />
                <div className="z-10 max-w-4xl px-6">
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLScB4u2Ovi_PMj_st6lqisz8NqNgeTdr9d2737UzTvaNcOAnaw/viewform"
                        target="_blank"
                        className="px-10 py-4 bg-[#E31E24] text-white hover:bg-[#2D1F1F] hover:text-[#E31E24] rounded-full font-bold text-lg transition-all duration-300 shadow-xl"
                    >
                        Book Now
                    </a>
                </div>
            </section>

            {/* ===== VIP SERVICES SECTION ===== */}
            <section id="services-section" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            VIP Clearance <span className="text-[#E31E24]">Services</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Experience hassle-free airport formalities with our premium services
                        </p>
                    </div>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl bg-[#E31E24] mx-auto rounded font-bold text-white mb-4 px-2" style={{ width: 'max-content' }}>
                            What We <span>Offer</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {vipServiceItems.map((item, index) => {
                            const IconComponent = serviceIcons[index % serviceIcons.length];
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                                >
                                    <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                                        <IconComponent className="w-8 h-8 text-[#E31E24]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                        {item.contentHtml}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== WHAT WE OFFER SECTION ===== */}
            {whatWeOfferItems.length > 0 && (
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto">
                            {whatWeOfferItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100"
                                >
                                    <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                                        <Plane className="w-8 h-8 text-[#E31E24]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                        {item.contentHtml}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ===== HOW IT WORKS ===== */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            How It <span className="text-[#E31E24]">Works</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Book Online", desc: "Submit your service request through our platform" },
                            { step: "2", title: "Confirmation", desc: "Receive confirmation with service details" },
                            { step: "3", title: "Meet Agent", desc: "Our agent meets you at the airport" },
                            { step: "4", title: "Smooth Passage", desc: "Enjoy hassle-free VIP clearance" },
                        ].map((item, index) => (
                            <div key={index} className="text-center group">
                                <div className="w-20 h-20 bg-[#E31E24] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold group-hover:scale-110 transition-transform">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== DOCUMENTS REQUIRED (Conditional) ===== */}
            {documents && documents.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Documents <span className="text-[#E31E24]">Required</span>
                            </h2>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                            {documents.map((doc, index) => (
                                <div key={index} className="mb-8 last:mb-0">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 w-10 h-10 rounded-full bg-[#E31E24] flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-900 mb-3">{doc.title}</h4>
                                            <ul className="space-y-3">
                                                {doc.description?.split('\n').map((line, i) => (
                                                    line.trim() && (
                                                        <li key={i} className="flex items-start gap-3 text-gray-700">
                                                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                            <span>{line.trim()}</span>
                                                        </li>
                                                    )
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ===== VISA CENTRES (Conditional) ===== */}
            {visaCentresSection.length > 0 && (
                <section
                    className="relative py-24 min-h-[500px] flex items-center"
                    style={{
                        backgroundImage: visaCentresSection[0]?.images?.[0] ? `url(${getImageUrl(visaCentresSection[0].images[0])})` : 'none',
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPositionY: "bottom",
                    }}
                >
                    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold text-white bg-[#E31E24] rounded-3xl p-1 mb-10">
                            {visaCentresSection[0]?.title}
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {visaCentresSection[0]?.contentHtml?.split('\n').map((city, idx) => (
                                city.trim() && (
                                    <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white border border-white/20">
                                        <MapPin className="w-4 h-4 text-[#E31E24] flex-shrink-0" />
                                        <span className="font-medium text-gray-400">{city.trim()}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ===== FORM SECTION (Conditional - Only if fields exist) ===== */}
            {fields && fields.length > 0 && (
                <section className="py-24 bg-[#2D1F1F]">
                    <div className="max-w-2xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-white mb-4">Book Your VIP Service</h2>
                            <p className="text-gray-300">Fill in your details and we'll get back to you</p>
                        </div>

                        {submitStatus && (
                            <div className={`p-4 mb-6 rounded-lg text-center ${submitStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {submitMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {fields.map((field, index) => (
                                <DynamicFormField
                                    key={index}
                                    field={field}
                                    formValues={formValues}
                                    handleInputChange={handleInputChange}
                                    allFields={fields}
                                    theme="dark"
                                />
                            ))}
                            <button
                                type="submit"
                                disabled={submitLoading}
                                className="w-full py-4 bg-[#E31E24] text-white rounded-full font-bold text-lg hover:bg-white hover:text-[#E31E24] transition-all flex justify-center items-center gap-2"
                            >
                                {submitLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Submit Request'}
                            </button>
                        </form>
                    </div>
                </section>
            )}

            {/* ===== FAQ SECTION (Conditional) ===== */}
            {faqs && faqs.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Frequently Asked <span className="text-[#E31E24]">Questions</span>
                            </h2>
                        </div>
                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Vipclearanceatmalaysiaairport;