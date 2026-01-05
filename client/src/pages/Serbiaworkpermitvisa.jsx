import { useState, useEffect } from "react";
import { Shield, Clock, Award, CheckCircle, XCircle, Loader2 } from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

const Serbiaworkpermitvisa = () => {
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
      const response = await fetch(`${BackendURL}/api/forms/slug/serbia-work-permit-visa`);
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
      const response = await fetch(`${BackendURL}/api/form-submissions/slug/serbia-work-permit-visa`, {
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

  if (loading) return <LoadingState message="Loading Serbia Work Permit Visa..." fullScreen />;
  if (error) return <ErrorState error={error} onRetry={fetchFormData} showHomeButton fullScreen />;

  const { description, fields = [], faqs = [], contentSections = {} } = formData || {};

  // Get sections by API keys
  const whatIsSection = contentSections['What is a Serbia D-Type Visa?'] || [];
  const whoCanApplySection = contentSections['Who Can Apply?'] || [];
  const whyChooseSection = contentSections['Why Choose DU Global?'] || [];
  const getStartedSection = contentSections[' Get Started Today!'] || [];

  // Parse description lines
  const descriptionLines = description?.split('\r\n').filter(line => line.trim()) || [];

  // Icons for Why Choose section
  const whyChooseIcons = [Award, Clock, Shield];

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
            background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 h-[800px] flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left - Hero Text */}
            <div className="text-white">
              {descriptionLines.map((line, index) => (
                <p key={index} className={index === 0 ? "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4" : "text-xl text-gray-300 mb-2"}>
                  {index === 0 ? (
                    <>
                      Work in <span style={{ color: '#E31E24' }}>Serbia</span>: Secure Your D-Type Visa with
                    </>
                  ) : line}
                </p>
              ))}
            </div>

            {/* Right - Contact Form with dark transparent bg */}
            {fields.length > 0 && (
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
              >
                <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
                  {fields.filter(f => f.type !== 'checkbox').map((field, index) => {
                    const fieldType = field.type || field.fieldType;

                    if (fieldType === 'select' || fieldType === 'dropdown') {
                      return (
                        <select
                          key={field._id || index}
                          name={field.name}
                          value={formValues[field.name] || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border-0 rounded text-gray-700 focus:ring-2 focus:ring-red-500 transition-all outline-none appearance-none cursor-pointer text-sm"
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
                          className="w-full px-4 py-3 bg-white border-0 rounded text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-red-500 transition-all outline-none text-sm"
                          required={field.required}
                        />
                      );
                    }
                  })}

                  {/* Checkbox fields */}
                  {fields.filter(f => f.type === 'checkbox').map((field, index) => (
                    <label key={field._id || index} className="flex items-start gap-3 text-white text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        name={field.name}
                        checked={formValues[field.name] || false}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 accent-red-600 rounded shrink-0"
                      />
                      <span className="text-gray-300">{field.label}</span>
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
                    className="w-full py-3 rounded-full font-bold text-base transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] uppercase mt-2 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {submitLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : 'Apply Now'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== WHAT IS SERBIA D-TYPE VISA ===== */}
      {whatIsSection.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {whatIsSection.map((item, index) => (
              <div key={item._id || index} className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
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

      {/* ===== WHO CAN APPLY / DOCUMENTS / FEES ===== */}
      {whoCanApplySection.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            {whoCanApplySection.map((item, index) => {
              // Check if this is a table-like content (has tabs)
              const isTable = item.contentHtml?.includes('\t');

              return (
                <div key={item._id || index} className="mb-16 last:mb-0">
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {item.title}
                      </h2>
                      <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#E31E24' }}></div>

                      {isTable ? (
                        // Render as table
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                          <table className="w-full">
                            <tbody>
                              {item.contentHtml?.split('\r\n').filter(line => line.trim()).map((row, rowIdx) => {
                                const cells = row.split('\t');
                                const isHeader = rowIdx === 0 && item.title.includes('Document');
                                return (
                                  <tr key={rowIdx} className={isHeader ? 'bg-gray-100' : 'border-b border-gray-100'}>
                                    {cells.map((cell, cellIdx) => (
                                      isHeader ? (
                                        <th key={cellIdx} className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                                          {cell.trim()}
                                        </th>
                                      ) : (
                                        <td key={cellIdx} className="px-4 py-3 text-sm text-gray-600">
                                          {cell.trim()}
                                        </td>
                                      )
                                    ))}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        // Render as paragraph
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {item.contentHtml}
                        </p>
                      )}
                    </div>

                    {item.image && (
                      <div className="flex justify-center">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          className="max-w-full h-auto rounded-2xl shadow-xl"
                          style={{ maxHeight: '350px' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ===== WHY CHOOSE DU GLOBAL ===== */}
      {whyChooseSection.length > 0 && (
        <section className="py-20 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Why Choose DU Global?
              </h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#E31E24' }}></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseSection.map((item, index) => {
                const IconComponent = whyChooseIcons[index % whyChooseIcons.length];
                return (
                  <div key={item._id || index} className="text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: '#E31E24' }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.contentHtml?.trim()}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== GET STARTED TODAY ===== */}
      {getStartedSection.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {getStartedSection.map((item, index) => (
              <div key={item._id || index} className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {item.title?.trim()}
                  </h2>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#E31E24' }}></div>
                  <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                    {item.contentHtml}
                  </p>
                  <button
                    className="mt-6 px-8 py-3 rounded-full font-bold transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] uppercase"
                  >
                    Get Started
                  </button>
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
                Find answers to common questions about Serbia Work Permit Visa process, requirements, and timelines.
              </p>
              <a
                href="#"
                className="inline-flex items-center font-medium hover:underline"
                style={{ color: '#E31E24' }}
              >
                More FAQs →
              </a>
            </div>

            {/* RIGHT FAQ LIST */}
            <div className="divide-y">
              {faqs.map((faq, index) => (
                <div key={faq._id || index} className="py-6">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
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

export default Serbiaworkpermitvisa;
