import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, ChevronDown } from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

const Lebanon = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BackendURL}/api/forms/slug/lebanon`);
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

  if (loading) return <LoadingState message="Loading Lebanon..." fullScreen />;
  if (error) return <ErrorState error={error} onRetry={fetchFormData} showHomeButton fullScreen />;

  const {
    name,
    description,
    fields = [],
    faqs = [],
    documents = [],
    contentSections = {},
    formEmployeesAddresses = []
  } = formData || {};

  // Get content sections
  const heroBottomSection = contentSections['heroBottom'] || [];
  const serviceFeeSection = contentSections['Beneficiary Name: Embassy of Lebanon.'] || [];

  // Parse table data from content sections
  const renderTable = (tableData) => {
    if (!tableData || !tableData.headers || !tableData.rows) return null;

    return (
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700 text-white">
              {tableData.headers.map((header, idx) => (
                <th key={idx} className="px-4 py-3 text-left font-semibold border border-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, rowIdx) => (
              <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-4 py-3 border border-gray-300 text-gray-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Parse content HTML to extract different parts
  const parseContentHtml = (html) => {
    if (!html) return { before: '', after: '' };
    const parts = html.split('// after table');
    return {
      before: parts[0]?.trim() || '',
      after: parts[1]?.trim() || ''
    };
  };

  return (
    <div className="bg-white font-sans">

      {/* ===== HERO SECTION (1920x800) ===== */}
      <section
        className="relative w-full h-[800px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: formData?.image ? `url(${getImageUrl(formData.image)})` : 'none'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white">
            Lebanon
          </h1>
        </div>
      </section>

      {/* ===== CONTENT SECTIONS WITH TABLES ===== */}
      {heroBottomSection.length > 0 && heroBottomSection.map((section, index) => {
        const { before, after } = parseContentHtml(section.contentHtml);

        return (
          <section key={index} className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              {/* Content before table */}
              {before && (
                <div className="prose max-w-none mb-8">
                  {before.split('\r\n\r\n').map((paragraph, pIdx) => (
                    paragraph.trim() && (
                      <p key={pIdx} className="text-gray-700 mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>
              )}

              {/* Visa Fee Table */}
              {section.tableData && (
                <>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Visa Fee:</h3>
                  {renderTable(section.tableData)}
                </>
              )}

              {/* Content after table (Important Notes) */}
              {after && (
                <div className="prose max-w-none mt-8">
                  {after.split('\r\n\r\n').map((paragraph, pIdx) => {
                    if (paragraph.includes('Important Notes:') || paragraph.includes('For Nepal:') || paragraph.includes('For Bangladesh:')) {
                      return (
                        <div key={pIdx} className="mb-4">
                          <p className="text-red-600 font-semibold mb-2">
                            {paragraph.split(':')[0]}:
                          </p>
                          <p className="text-gray-700">
                            {paragraph.split(':').slice(1).join(':')}
                          </p>
                        </div>
                      );
                    }
                    return paragraph.trim() && (
                      <p key={pIdx} className="text-gray-600 text-sm mb-2">
                        * {paragraph}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* ===== SERVICE FEE SECTION ===== */}
      {serviceFeeSection.length > 0 && serviceFeeSection.map((section, index) => (
        <section key={index} className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{section.title}</h3>

            {section.contentHtml && (
              <div className="prose max-w-none mb-6">
                {section.contentHtml.split('\r\n\r\n').filter(p => p.trim()).map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-gray-700 mb-2">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {section.tableData && renderTable(section.tableData)}
          </div>
        </section>
      ))}

      {/* ===== FORM SECTION (if fields exist) ===== */}
      {fields.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Apply Now</h2>
            <form className="space-y-4">
              {fields.map((field, index) => {
                if (field.type === 'select' || field.type === 'dropdown') {
                  return (
                    <select
                      key={field._id || index}
                      name={field.name}
                      value={formValues[field.name] || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                      required={field.required}
                    >
                      <option value="">{field.placeholder || field.label}</option>
                      {field.options?.map((opt, optIdx) => (
                        <option key={opt._id || optIdx} value={opt.value || opt}>
                          {opt.label || opt}
                        </option>
                      ))}
                    </select>
                  );
                }
                return (
                  <input
                    key={field._id || index}
                    type={field.type || 'text'}
                    name={field.name}
                    value={formValues[field.name] || ''}
                    onChange={handleInputChange}
                    placeholder={field.placeholder || field.label}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                    required={field.required}
                  />
                );
              })}
              <button
                type="submit"
                className="w-full py-4 rounded-full font-bold text-base transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033]"
              >
                Submit Application
              </button>
            </form>
          </div>
        </section>
      )}

      {/* ===== DOCUMENTS SECTION (if documents exist) ===== */}
      {documents.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Documents Required
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc, index) => (
                <div
                  key={doc._id || index}
                  className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500"
                >
                  <h3 className="font-semibold text-gray-800 mb-2">{doc.title || doc.name}</h3>
                  {doc.description && (
                    <p className="text-gray-600 text-sm">{doc.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ SECTION (if FAQs exist) ===== */}
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
                Find answers to common questions about Lebanon visa applications,
                processing times, and required documents.
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

      {/* ===== CONTACT DETAILS / OFFICE ADDRESSES ===== */}
      {formEmployeesAddresses.length > 0 && (
        <section className="py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Contact Details
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formEmployeesAddresses.map((office, index) => (
                <div
                  key={office._id || index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  {/* Red top bar */}
                  <div
                    className="h-2"
                    style={{ backgroundColor: office.color || '#E31E24' }}
                  />

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {office.Location}
                    </h3>

                    {office.officeName && (
                      <p className="text-gray-700 font-medium mb-3">
                        {office.officeName}
                      </p>
                    )}

                    {office.Address && (
                      <div className="flex items-start gap-3 mb-3">
                        <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                        <p className="text-gray-600 text-sm">{office.Address}</p>
                      </div>
                    )}

                    {office.phone && (
                      <div className="flex items-center gap-3 mb-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <a href={`tel:${office.phone}`} className="text-gray-600 text-sm hover:text-red-600">
                          {office.phone}
                        </a>
                      </div>
                    )}

                    {office.email && (
                      <div className="flex items-center gap-3 mb-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <a href={`mailto:${office.email}`} className="text-gray-600 text-sm hover:text-red-600">
                          {office.email}
                        </a>
                      </div>
                    )}

                    {(office.Open || office.Close) && (
                      <p className="text-gray-500 text-sm mt-4">
                        <span className="font-medium">Working Days:</span> {office.Open} - {office.Close}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default Lebanon;
