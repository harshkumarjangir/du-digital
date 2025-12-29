import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountryPhoneInput from "./CountryPhoneInput";
import { submitPartnerForm, clearPartnerState } from "../../redux/slices/partnerSlice";

const LOOKING_FOR_OPTIONS = [
  "Visa Services",
  "Partnership",
  "Support",
  "Others",
];

const CITY_OPTIONS = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Other",
];

const HeroSection = ({ data }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.partner);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: null,
    lookingFor: "",
    city: "",
    isMsg: false,
  });

  // Clear success/error messages when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearPartnerState());
    };
  }, [dispatch]);

  const handlePhoneChange = (payload) => {
    setFormData(prev => ({
      ...prev,
      phone: payload
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    dispatch(clearPartnerState());

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone?.fullNumber || "",
      lookingFor: formData.lookingFor,
      city: formData.city,
      isMsg: formData.isMsg,
    };

    // Dispatch the async thunk
    const result = await dispatch(submitPartnerForm(payload));

    // If successful, reset the form
    if (submitPartnerForm.fulfilled.match(result)) {
      setFormData({
        fullName: "",
        email: "",
        phone: null,
        lookingFor: "",
        city: "",
        isMsg: false,
      });
    }
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${data.backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-white/80" />

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
              name="fullName"
              placeholder="Name"
              className="w-full border px-4 py-3 rounded-md"
              onChange={handleChange}
              value={formData.fullName}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full border px-4 py-3 rounded-md"
              onChange={handleChange}
              value={formData.email}
              required
            />

            {/* PHONE */}
            <CountryPhoneInput onChange={handlePhoneChange} />

            {/* LOOKING FOR */}
            <select
              name="lookingFor"
              className="w-full border px-4 py-3 rounded-md"
              onChange={handleChange}
              value={formData.lookingFor}
            >
              <option value="">What are you looking for?</option>
              {LOOKING_FOR_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            {/* CITY */}
            <select
              name="city"
              className="w-full border px-4 py-3 rounded-md"
              onChange={handleChange}
              value={formData.city}
            >
              <option value="">Location (City)</option>
              {CITY_OPTIONS.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            {/* CONSENT */}
            <div className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                name="isMsg"
                className="mt-1 accent-red-600"
                onChange={handleChange}
                checked={formData.isMsg}
              />
              <p>{data.form.consentText}</p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md">
                Thank you! Your partner application has been submitted successfully. We'll get back to you soon.
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`bg-red-600 text-white px-6 py-3 rounded-md w-full ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
              } transition-colors`}
            >
              {loading ? 'Submitting...' : data.form.buttonText}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;












// import { useState } from "react";
// import CountryPhoneInput from "./CountryPhoneInput";

// const HeroSection = ({ data }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: null,
//     selects: {},
//     consent: false,
//   });

//   // Phone callback
//   const handlePhoneChange = (payload) => {
//     setFormData(prev => ({
//       ...prev,
//       phone: payload
//     }));
//   };

//   // Input handler
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData(prev => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value
//     }));
//   };

//   // Select handler
//   const handleSelectChange = (name, value) => {
//     setFormData(prev => ({
//       ...prev,
//       selects: {
//         ...prev.selects,
//         [name]: value
//       }
//     }));
//   };

//   // Submit
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log("🔥 COMPLETE FORM DATA", {
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       selects: formData.selects,
//       consent: formData.consent,
//     });

//     const payload = {
//       fullName: formData.name,
//       email: formData.email,
//       phone: formData.phone?.fullNumber || "",
//       lookingFor:
//         formData.selects["Looking For"] ||
//         formData.selects["lookingFor"] ||
//         "",
//       city:
//         formData.selects["City"] ||
//         formData.selects["city"] ||
//         "",
//       isMsg: formData.consent,
//     };

//     console.log("🚀 PARTNER PROGRAM PAYLOAD", payload);
//   };

//   return (
//     <section
//       className="relative min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: `url(${data.backgroundImage})` }}
//     >
//       <div className="absolute inset-0 bg-white/80"></div>

//       <div className="relative max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-16 items-center">

//         {/* LEFT */}
//         <div>
//           <h1 className="text-4xl lg:text-5xl font-bold mb-8">
//             {data.title} <span className="text-red-600">{data.highlight}</span>
//           </h1>

//           <ul className="space-y-4">
//             {data.points.map((p, i) => (
//               <li key={i} className="text-lg">• {p}</li>
//             ))}
//           </ul>
//         </div>

//         {/* FORM */}
//         <div className="bg-white shadow-xl max-w-md ml-auto rounded-lg p-8">
//           <form className="space-y-6" onSubmit={handleSubmit}>

//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               className="w-full border px-4 py-3 rounded-md"
//               onChange={handleChange}
//             />

//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               className="w-full border px-4 py-3 rounded-md"
//               onChange={handleChange}
//             />

//             {/* PHONE */}
//             <CountryPhoneInput onChange={handlePhoneChange} />

//             {/* SELECTS */}
//             {data.form.fields
//               .filter(f => f.type === "select")
//               .map((field, i) => (
//                 <select
//                   key={i}
//                   className="w-full border px-4 py-3 rounded-md"
//                   onChange={(e) =>
//                     handleSelectChange(field.name || field.placeholder, e.target.value)
//                   }
//                 >
//                   <option value="">{field.placeholder}</option>
//                   {field.options.map((opt, idx) => (
//                     <option key={idx} value={opt}>{opt}</option>
//                   ))}
//                 </select>
//               ))}

//             {/* CONSENT */}
//             <div className="flex items-start gap-3 text-sm">
//               <input
//                 type="checkbox"
//                 name="consent"
//                 className="mt-1 accent-red-600"
//                 onChange={handleChange}
//               />
//               <p>{data.form.consentText}</p>
//             </div>

//             <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-md w-full">
//               {data.form.buttonText}
//             </button>

//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
