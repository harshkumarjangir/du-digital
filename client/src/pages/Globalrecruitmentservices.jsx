import { useState, useEffect } from "react";
import { 
  CheckCircle, 
  Clock, 
  Shield, 
  Users, 
  Globe, 
  Target, 
  FileCheck, 
  Award, 
  Briefcase, 
  Building, 
  Cpu, 
  Heart, 
  HardHat, 
  Factory, 
  UtensilsCrossed,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Zap,
  TrendingUp,
  CheckCheck,
  Wrench,
  Settings,
  Layers
} from "lucide-react";
import LoadingState from "../components/reusable/LoadingState";
import ErrorState from "../components/reusable/ErrorState";

const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

// Default icons for content sections
const defaultIcons = [Globe, Shield, Settings, FileCheck, Clock, Users, Award, Briefcase, Layers, Wrench];

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
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
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

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch(`${BackendURL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contactForm,
          source: 'Global Recruitment Services'
        })
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setContactForm({ name: "", email: "", phone: "", message: "" });
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

  const { name, description, faqs = [], contentSections = {} } = formData || {};

  // Get dynamic sections from API
  const whyChooseSection = contentSections['Why Choose DU Global?'] || [];
  const ourServicesSection = contentSections['Our Services'] || [];
  const industriesSection = contentSections['Industries We Serve'] || [];
  const trackRecordSection = contentSections['Our Track Record'] || [];
  const readyToBuildSection = contentSections['Ready to Build Your Team?'] || [];

  return (
    <div className="global-recruitment-page" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* ===== HERO SECTION ===== */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: formData?.image ? `url(${BackendImagesURL}${formData.image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.73) 0%, rgba(245, 245, 245, 0.56) 100%)'
        }} />
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '120px 24px 80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '60px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Left Content */}
          <div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#1a1a1a',
              lineHeight: 1.2,
              marginBottom: '24px'
            }}>
              Global Recruitment Services
            </h1>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#c60505',
              marginBottom: '24px'
            }}>
              Connecting Skilled Talents from India to Abroad
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '32px'
            }}>
              {description || "DU Global is a global recruitment agency that specializes in connecting employers worldwide with highly skilled Indian professionals across various sectors."}
            </p>
            
            <button style={{
              backgroundColor: '#c60505',
              color: '#fff',
              padding: '16px 40px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(198, 5, 5, 0.3)'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Get Started Now <ArrowRight size={20} />
            </button>
          </div>
          
          {/* Right Form - Dark Semi-transparent (matching original) */}
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '24px'
            }}>
              Apply for Global Recruitment
            </h3>
            
            {submitSuccess && (
              <div style={{
                backgroundColor: 'rgba(46, 125, 50, 0.2)',
                color: '#4caf50',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(76, 175, 80, 0.3)'
              }}>
                <CheckCircle size={20} />
                Thank you! We'll contact you soon.
              </div>
            )}
            
            <form onSubmit={handleContactSubmit}>
              {/* Two Column Grid for Form Fields */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    backgroundColor: '#fff',
                    border: '1px solid #dadbdd',
                    borderRadius: '7px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    backgroundColor: '#fff',
                    border: '1px solid #dadbdd',
                    borderRadius: '7px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                />
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    backgroundColor: '#fff',
                    border: '1px solid #dadbdd',
                    borderRadius: '7px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                />
                <select
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    backgroundColor: '#fff',
                    border: '1px solid #dadbdd',
                    borderRadius: '7px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    color: '#606266'
                  }}
                >
                  <option value="">Select Industry</option>
                  <option value="oil-gas">Oil, Gas & Energy</option>
                  <option value="it">IT & Digital</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="construction">Construction & Engineering</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="hospitality">Hospitality & Services</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <textarea
                  placeholder="Your Message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    backgroundColor: '#fff',
                    border: '1px solid #dadbdd',
                    borderRadius: '7px',
                    fontSize: '0.9rem',
                    resize: 'vertical',
                    outline: 'none'
                  }}
                />
              </div>
              
              {/* Agreement Checkbox */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#c60505',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <CheckCircle size={12} color="#fff" />
                  </div>
                  <span style={{
                    color: '#fff',
                    fontSize: '0.85rem',
                    lineHeight: 1.5
                  }}>
                    I agree to receive communication regarding my application and promotional offers from DU Global
                  </span>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                style={{
                  backgroundColor: '#c60505',
                  color: '#fff',
                  padding: '16px 32px',
                  borderRadius: '7px',
                  border: '1px solid #bd2727',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.7 : 1,
                  transition: 'all 0.3s ease'
                }}
              >
                {submitting ? 'Sending...' : 'Get Started Now'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE DU GLOBAL SECTION (Dynamic from API) ===== */}
      {whyChooseSection.length > 0 && (
        <section style={{
          backgroundColor: '#fff',
          padding: '100px 24px'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                Why Choose <span style={{ color: '#c60505' }}>DU Global?</span>
              </h2>
              <div style={{
                width: '80px',
                height: '4px',
                backgroundColor: '#c60505',
                margin: '0 auto'
              }} />
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px'
            }}>
              {whyChooseSection.map((item, index) => {
                const IconComponent = defaultIcons[index % defaultIcons.length];
                return (
                  <div
                    key={item._id || index}
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      padding: '32px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      border: '1px solid #f0f0f0',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                    }}
                  >
                    {/* Red Triangle Accent */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 0,
                      height: 0,
                      borderTop: '50px solid #c60505',
                      borderLeft: '50px solid transparent'
                    }} />
                    
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      border: '2px solid #c60505',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px'
                    }}>
                      <IconComponent size={28} color="#c60505" strokeWidth={1.5} />
                    </div>
                    
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#1a1a1a',
                      marginBottom: '12px'
                    }}>
                      {item.title}
                    </h3>
                    
                    <p style={{
                      color: '#666',
                      lineHeight: 1.7,
                      fontSize: '0.95rem'
                    }} dangerouslySetInnerHTML={{ __html: item.contentHtml?.replace(/\r\n/g, ' ') }} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== OUR SERVICES SECTION (Dynamic from API) ===== */}
      {ourServicesSection.length > 0 && (
        <section style={{
          backgroundColor: '#333',
          padding: '100px 24px'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '16px'
              }}>
                Our Services
              </h2>
              <div style={{
                width: '80px',
                height: '4px',
                backgroundColor: '#c60505',
                margin: '0 auto'
              }} />
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {ourServicesSection.map((item, index) => {
                const IconComponent = defaultIcons[index % defaultIcons.length];
                return (
                  <div
                    key={item._id || index}
                    style={{
                      backgroundColor: '#444',
                      borderRadius: '12px',
                      padding: '28px',
                      position: 'relative',
                      overflow: 'hidden',
                      borderLeft: '4px solid #c60505',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#4a4a4a';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#444';
                    }}
                  >
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(198, 5, 5, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}>
                      <IconComponent size={24} color="#c60505" strokeWidth={1.5} />
                    </div>
                    
                    <h3 style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: '12px'
                    }}>
                      {item.title}
                    </h3>
                    
                    <p style={{
                      color: '#bbb',
                      lineHeight: 1.7,
                      fontSize: '0.9rem'
                    }} dangerouslySetInnerHTML={{ __html: item.contentHtml?.replace(/\r\n/g, ' ') }} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== INDUSTRIES WE SERVE SECTION (Dynamic Cards from API) ===== */}
      {industriesSection.length > 0 && (
        <section style={{
          backgroundColor: '#f8f9fa',
          padding: '100px 24px'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                Industries We Serve
              </h2>
              <div style={{
                width: '80px',
                height: '4px',
                backgroundColor: '#c60505',
                margin: '0 auto'
              }} />
            </div>
            
            {/* Industry Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '24px'
            }}>
              {industriesSection.map((industry, index) => {
                const IconComponent = getIndustryIcon(industry.title);
                const roles = parseRoles(industry.contentHtml);
                
                return (
                  <div
                    key={industry._id || index}
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease',
                      border: '1px solid #eee'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                    }}
                  >
                    {/* Card Header */}
                    <div style={{
                      backgroundColor: '#333',
                      padding: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#c60505',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <IconComponent size={24} color="#fff" />
                      </div>
                      <h3 style={{
                        color: '#fff',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        margin: 0
                      }}>
                        {industry.title}
                      </h3>
                    </div>
                    
                    {/* Card Body - Roles List */}
                    <div style={{
                      padding: '24px'
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '10px'
                      }}>
                        {roles.map((role, roleIndex) => (
                          <div
                            key={roleIndex}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '6px 0'
                            }}
                          >
                            <div style={{
                              width: '18px',
                              height: '18px',
                              backgroundColor: '#c60505',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              <CheckCheck size={12} color="#fff" />
                            </div>
                            <span style={{
                              color: '#444',
                              fontSize: '0.9rem'
                            }}>
                              {role}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== OUR TRACK RECORD SECTION (Dynamic from API) ===== */}
      {trackRecordSection.length > 0 && (
        <section style={{
          backgroundColor: '#fff',
          padding: '100px 24px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '60px',
              alignItems: 'center'
            }}>
              {/* Left Side - Stats */}
              <div>
                <h2 style={{
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  fontWeight: 700,
                  color: '#1a1a1a',
                  marginBottom: '32px'
                }}>
                  Our Track Record
                </h2>
                <div style={{
                  width: '80px',
                  height: '4px',
                  backgroundColor: '#c60505',
                  marginBottom: '40px'
                }} />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {parseRoles(trackRecordSection[0]?.contentHtml).map((stat, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '16px',
                        padding: '16px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '12px',
                        borderLeft: '4px solid #c60505'
                      }}
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#c60505',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <CheckCheck size={20} color="#fff" />
                      </div>
                      <p style={{
                        color: '#333',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        margin: 0
                      }}>
                        {stat}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right Side - Image */}
              <div style={{
                display: 'flex',
                justifyContent: 'center'
              }}>
                {trackRecordSection[0]?.image ? (
                  <img 
                    src={getImageUrl(trackRecordSection[0].image)} 
                    alt="Our Track Record" 
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '16px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                    }}
                  />
                ) : (
                  <div style={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: '16px',
                    padding: '60px',
                    textAlign: 'center'
                  }}>
                    <TrendingUp size={80} color="#c60505" strokeWidth={1} />
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#1a1a1a',
                      marginTop: '24px'
                    }}>
                      Proven Results
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== READY TO BUILD YOUR TEAM CTA (Dynamic from API) ===== */}
      {readyToBuildSection.length > 0 && (
        <section style={{
          backgroundColor: '#1a1a1a',
          padding: '100px 24px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: readyToBuildSection[0]?.image ? 'repeat(2, 1fr)' : '1fr',
            gap: '60px',
            alignItems: 'center'
          }}>
            <div style={{ textAlign: readyToBuildSection[0]?.image ? 'left' : 'center' }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '24px'
              }}>
                {readyToBuildSection[0]?.title || "Ready to Build Your Team?"}
              </h2>
              <p style={{
                color: '#aaa',
                fontSize: '1.1rem',
                lineHeight: 1.8,
                marginBottom: '32px'
              }} dangerouslySetInnerHTML={{ __html: readyToBuildSection[0]?.contentHtml?.replace(/\r\n/g, '<br/>') }} />
              
              <button style={{
                backgroundColor: '#c60505',
                color: '#fff',
                padding: '18px 48px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease'
              }}>
                Contact Us Today <ArrowRight size={20} />
              </button>
            </div>
            
            {readyToBuildSection[0]?.image && (
              <div style={{
                display: 'flex',
                justifyContent: 'center'
              }}>
                <img 
                  src={getImageUrl(readyToBuildSection[0].image)} 
                  alt="Ready to Build Your Team" 
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '16px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                  }}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== CONNECT WITH EXPERT SECTION ===== */}
      <section style={{
        backgroundColor: '#fff',
        padding: '100px 24px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: '#1a1a1a',
              marginBottom: '16px'
            }}>
              Connect with us
            </h2>
            <div style={{
              width: '80px',
              height: '4px',
              backgroundColor: '#c60505',
              margin: '0 auto'
            }} />
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '60px',
            alignItems: 'center'
          }}>
            {/* Expert Card */}
            <div style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '16px',
              padding: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px'
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: '#ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Users size={40} color="#666" />
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#1a1a1a',
                  marginBottom: '4px'
                }}>
                  Karan Khurana
                </h3>
                <p style={{
                  color: '#666',
                  fontSize: '0.95rem',
                  marginBottom: '16px'
                }}>
                  Deputy General Manager - Global Access
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a
                    href="mailto:karan@dudigitalglobal.com"
                    style={{
                      color: '#c60505',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.95rem'
                    }}
                  >
                    <Mail size={16} />
                    karan@dudigitalglobal.com
                  </a>
                  <a
                    href="tel:+919910987275"
                    style={{
                      color: '#c60505',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.95rem'
                    }}
                  >
                    <Phone size={16} />
                    +91-9910987275
                  </a>
                </div>
              </div>
            </div>
            
            {/* Newsletter */}
            <div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                Subscribe to our newsletter
              </h3>
              <p style={{
                color: '#666',
                marginBottom: '24px'
              }}>
                Stay in touch with the latest updates on global recruitment trends and opportunities.
              </p>
              <form style={{
                display: 'flex',
                gap: '12px'
              }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: '14px 16px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#c60505',
                    color: '#fff',
                    padding: '14px 28px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      {faqs && faqs.length > 0 && (
        <section style={{
          backgroundColor: '#f8f9fa',
          padding: '100px 24px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '60px',
            alignItems: 'start'
          }}>
            {/* Left Content */}
            <div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: '24px',
                lineHeight: 1.2
              }}>
                Any questions?<br />We got you.
              </h2>
              <p style={{
                color: '#666',
                lineHeight: 1.8,
                marginBottom: '24px'
              }}>
                Have questions about our global recruitment services? Browse through our frequently 
                asked questions or contact us directly for personalized assistance.
              </p>
              <a
                href="#"
                style={{
                  color: '#c60505',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                More FAQs <ArrowRight size={18} />
              </a>
            </div>
            
            {/* Right FAQ List */}
            <div style={{
              display: 'flex',
              flexDirection: 'column'
            }}>
              {faqs.map((faq, index) => (
                <div
                  key={faq._id || index}
                  style={{
                    borderBottom: '1px solid #e0e0e0',
                    padding: '24px 0'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: 0
                    }}
                  >
                    <span style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      paddingRight: '16px'
                    }}>
                      {faq.question}
                    </span>
                    <span style={{
                      color: '#666',
                      fontSize: '1.5rem',
                      fontWeight: 300
                    }}>
                      {openFaqIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  
                  {openFaqIndex === index && (
                    <p style={{
                      color: '#666',
                      lineHeight: 1.7,
                      marginTop: '16px',
                      fontSize: '0.95rem'
                    }}>
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Responsive Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        @media (max-width: 1024px) {
          .global-recruitment-page section > div {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          
          .global-recruitment-page section > div > div[style*="grid-template-columns: repeat(2"] {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 768px) {
          .global-recruitment-page section > div > div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          
          .global-recruitment-page section {
            padding: 60px 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Globalrecruitmentservices;
