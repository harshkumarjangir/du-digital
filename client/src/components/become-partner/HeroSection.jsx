import { useState } from "react";
import CountryPhoneInput from "./CountryPhoneInput";

const HeroSection = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: null,
    selects: {},
    consent: false,
  });

  // Phone callback
  const handlePhoneChange = (payload) => {
    setFormData(prev => ({
      ...prev,
      phone: payload
    }));
  };

  // Input handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Select handler
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      selects: {
        ...prev.selects,
        [name]: value
      }
    }));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("🔥 COMPLETE FORM DATA", {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      selects: formData.selects,
      consent: formData.consent,
    });
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${data.backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-white/80"></div>

      <div className="relative max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-8">
            {data.title} <span className="text-red-600">{data.highlight}</span>
          </h1>

          <ul className="space-y-4">
            {data.points.map((p, i) => (
              <li key={i} className="text-lg">• {p}</li>
            ))}
          </ul>
        </div>

        {/* FORM */}
        <div className="bg-white shadow-xl max-w-md ml-auto rounded-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full border px-4 py-3 rounded-md"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full border px-4 py-3 rounded-md"
              onChange={handleChange}
            />

            {/* PHONE */}
            <CountryPhoneInput onChange={handlePhoneChange} />

            {/* SELECTS */}
            {data.form.fields
              .filter(f => f.type === "select")
              .map((field, i) => (
                <select
                  key={i}
                  className="w-full border px-4 py-3 rounded-md"
                  onChange={(e) =>
                    handleSelectChange(field.name || field.placeholder, e.target.value)
                  }
                >
                  <option value="">{field.placeholder}</option>
                  {field.options.map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                  ))}
                </select>
              ))}

            {/* CONSENT */}
            <div className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                name="consent"
                className="mt-1 accent-red-600"
                onChange={handleChange}
              />
              <p>{data.form.consentText}</p>
            </div>

            <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-md w-full">
              {data.form.buttonText}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
