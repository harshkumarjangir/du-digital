import React, { useState, useEffect } from "react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";
import { Loader2, Check, ChevronDown } from "lucide-react";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

const Georgiaevisa = () => {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formValues, setFormValues] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [openAccordion, setOpenAccordion] = useState('india');

    useEffect(() => {
        fetchFormData();
    }, []);

    const fetchFormData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BackendURL}/api/forms/slug/georgia-evisa`);
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
            const response = await fetch(`${BackendURL}/api/form-submissions/slug/georgia-evisa`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues),
            });
            const res = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                setSubmitMessage('Thank you! Your application has been submitted.');
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

    const { fields = [], contentSections = {}, documents = [], image } = formData || {};

    // Get content sections
    const bottomHeroSection = contentSections['bottomhero'] || [];
    const revisedProcessSection = contentSections['Revised process to apply Georgia Visa-'] || [];
    const duVerifySection = contentSections['What is DuVerify'] || [];

    return (
        <div className="bg-white font-sans">
            {/* ===== HERO SECTION (Split Layout) ===== */}
            <section 
                className="relative w-full min-h-[800px] flex items-center bg-gray-900"
                style={{ 
                    backgroundImage: image ? `url(${getImageUrl(image)})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full py-20">
                    
                    {/* Left - Title */}
                    <div className="text-white">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            Georgia eVisa <br /> for Indians
                        </h1>
                    </div>

                    {/* Right - Form */}
                    {fields.length > 0 && (
                        <div className="bg-black/70 backdrop-blur-sm rounded-xl p-8 max-w-md w-full ml-auto">
                            <h3 className="text-2xl font-bold text-white mb-6 text-center">Apply Now</h3>
                            
                            {submitStatus && (
                                <div className={`p-3 mb-4 text-sm rounded ${submitStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {submitMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {fields.map((field, index) => {
                                    if (field.type === 'select' || field.type === 'dropdown') {
                                        return (
                                            <select
                                                key={index}
                                                name={field.name}
                                                value={formValues[field.name] || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-[#E31E24] outline-none"
                                                required={field.required}
                                            >
                                                <option value="">{field.label}</option>
                                                {field.options?.map((opt, i) => (
                                                    <option key={i} value={opt.value || opt.label || opt}>{opt.label || opt}</option>
                                                ))}
                                            </select>
                                        );
                                    }
                                    
                                    if (field.type === 'checkbox') {
                                        return (
                                            <div key={index} className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    name={field.name}
                                                    checked={formValues[field.name] || false}
                                                    onChange={handleInputChange}
                                                    className="w-5 h-5"
                                                    required={field.required}
                                                />
                                                <label className="text-white text-sm">
                                                    {field.label}
                                                </label>
                                            </div>
                                        );
                                    }

                                    return (
                                        <input
                                            key={index}
                                            type={field.type}
                                            name={field.name}
                                            value={formValues[field.name] || ''}
                                            onChange={handleInputChange}
                                            placeholder={field.placeholder || field.label}
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-[#E31E24] outline-none"
                                            required={field.required}
                                        />
                                    );
                                })}
                                <button
                                    type="submit"
                                    disabled={submitLoading}
                                    className="w-full py-4 bg-[#E31E24] text-white hover:bg-red-700 rounded-lg font-bold transition-all flex justify-center items-center gap-2"
                                >
                                    {submitLoading ? <Loader2 className="animate-spin w-5 h-5"/> : 'Apply Now'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== INTRO TEXT + VIDEO SECTION ===== */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    {/* Intro Paragraph */}
                    {bottomHeroSection.length > 0 && (
                        <p className="text-lg text-gray-700 leading-relaxed mb-12">
                            {bottomHeroSection[0]?.contentHtml}
                        </p>
                    )}

                    {/* Red Heading */}
                    {revisedProcessSection.length > 0 && (
                        <>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#E31E24] mb-8">
                                {revisedProcessSection[0]?.title}
                            </h2>

                            {/* Video */}
                            {revisedProcessSection[0]?.youtubeUrl && (
                                <div className="aspect-video w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl mb-12">
                                    <video 
                                        src={revisedProcessSection[0].youtubeUrl} 
                                        controls
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Description Text */}
                            <p className="text-lg text-gray-700 leading-relaxed text-left whitespace-pre-line">
                                {revisedProcessSection[0]?.contentHtml}
                            </p>
                        </>
                    )}
                </div>
            </section>

            {/* ===== WHAT IS DUVERIFY SECTION ===== */}
            {duVerifySection.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                            {duVerifySection[0]?.title}
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line text-left">
                            {duVerifySection[0]?.contentHtml}
                        </p>
                    </div>
                </section>
            )}

            {/* ===== CAPABILITIES / SERVICES CHECKLIST ===== */}
            {documents.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">
                            {documents[0]?.title}
                        </h3>
                        <ul className="space-y-4 text-left max-w-xl mx-auto">
                            {documents[0]?.description?.split('\n').map((line, i) => (
                                line.trim() && (
                                    <li key={i} className="flex items-center gap-4">
                                        <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700 text-lg">{line.trim()}</span>
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            
        </div>
    );
};

export default Georgiaevisa;