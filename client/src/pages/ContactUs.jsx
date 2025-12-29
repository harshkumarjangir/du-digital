import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountryPhoneInput from "../components/become-partner/CountryPhoneInput";
import contactData from "../data/contactData.json";
import { submitContactForm, clearContactState } from "../redux/slices/contactSlice";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";


const ContactUs = () => {
    const { hero, offices, form } = contactData;
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.contact);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: null,
        message: "",
        consent: false,
    });

    // Clear success/error messages when component unmounts or form is reset
    useEffect(() => {
        return () => {
            dispatch(clearContactState());
        };
    }, [dispatch]);

    // Phone change handler
    const handlePhoneChange = (phoneData) => {
        setFormData(prev => ({
            ...prev,
            phone: phoneData
        }));
    };

    // Input change handler
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous errors
        dispatch(clearContactState());

        const payload = {
            fullName: formData.name,
            email: formData.email,
            phone: formData.phone?.fullNumber || "",
            message: formData.message,
            AllowMsg: formData.consent,
        };

        // Dispatch the async thunk
        const result = await dispatch(submitContactForm(payload));

        // If successful, reset the form
        if (submitContactForm.fulfilled.match(result)) {
            setFormData({
                name: "",
                email: "",
                phone: null,
                message: "",
                consent: false,
            });
        }
    };

    return (
        <div className="w-full">
            {/* ===== Hero ===== */}
            <section
                className="h-[320px] bg-cover bg-center relative flex items-center justify-center"
                style={{ backgroundImage: `url(${hero.backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-black/60" />
                <h1 className="relative z-10 text-white text-4xl font-semibold">
                    {hero.title}
                </h1>
            </section>

            {/* ===== Offices ===== */}
            {/* <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {offices.map((office, i) => (
                    <div key={i} className="bg-white shadow-md rounded-lg p-6 space-y-3">
                        <h3 className="font-semibold text-lg">{office.title}</h3>
                        <p className="text-sm text-gray-600">{office.address}</p>
                        <p className="text-sm">📞 {office.phone}</p>
                        <p className="text-sm">
                            ✉️{" "}
                            <a href={`mailto:${office.email}`} className="text-red-600">
                                {office.email}
                            </a>
                        </p>
                    </div>
                ))}
            </section> */}
            {/* ===== Offices ===== */}
            <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {offices.map((office, i) => (
                    <div
                        key={i}
                        className="bg-[#F5F5F5] shadow-md rounded-lg p-6 space-y-4"
                    >
                        {/* <FaMapMarkerAlt size={32} className="text-red-600" /> */}
                        <div className="flex justify-center">
                            <ArrowUpRight size={36} className="text-red-600 -rotate-90" />
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold text-lg text-center">{office.title}</h3>

                        {/* Address */}
                        <div className="flex items-start gap-3 text-sm text-gray-600">
                            <FaMapMarkerAlt size={28} className="text-red-600 mt-1" />
                            <p>{office.address}</p>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-3 text-sm">
                            <FaPhoneAlt size={18} className="text-red-600" />
                            <span>{office.phone}</span>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-3 text-sm">
                            <FaEnvelope size={18} className="text-red-600" />
                            <a
                                href={`mailto:${office.email}`}
                                className="hover:underline break-all"
                            >
                                {office.email}
                            </a>
                        </div>
                    </div>
                ))}
            </section>


            {/* ===== Contact Form ===== */}
            <section className="max-w-4xl mx-auto px-6 pb-20 text-center bg-[#FAFAFA]">
                <h2 className="text-2xl font-semibold">{form.title}</h2>
                <p className="text-gray-600 mt-2">{form.subtitle}</p>

                <form onSubmit={handleSubmit} className="mt-10 space-y-6 text-left">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-400 outline-none rounded-md px-4 py-3"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-400 outline-none rounded-md px-4 py-3"
                        required
                    />

                    <CountryPhoneInput onChange={handlePhoneChange} />

                    <textarea
                        name="message"
                        placeholder="Message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full border border-gray-400 outline-none rounded-md px-4 py-3"
                    />

                    <label className="flex items-start gap-2 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onChange={handleChange}
                            className="mt-1"
                        />
                        By submitting my details, I authorize DU Global to contact me via
                        Call / SMS / WhatsApp / Email.
                    </label>

                    {/* Success Message */}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md">
                            Thank you! Your message has been submitted successfully. We'll get back to you soon.
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
                        className={`bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </section>
            {/* ===== Maps ===== */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-16">
                {offices.slice(1).map((office, i) => (
                    <iframe
                        key={i}
                        src={office.mapEmbed}
                        className="w-full h-[400px] border-0 rounded-md"
                        loading="lazy"
                    />
                ))}
            </section>
        </div>
    );
};

export default ContactUs;








// import CountryPhoneInput from '../components/become-partner/CountryPhoneInput';
// import contactData from '../data/contactData.json'

// const ContactUs = () => {
//     const { hero, offices, form } = contactData;

//     return (
//         <div className="w-full">
//             {/* ===== Hero ===== */}
//             <section
//                 className="h-[320px] bg-cover bg-center relative flex items-center justify-center"
//                 style={{ backgroundImage: `url(${hero.backgroundImage})` }}
//             >
//                 <div className="absolute inset-0 bg-black/60" />
//                 <h1 className="relative z-10 text-white text-4xl font-semibold">
//                     {hero.title}
//                 </h1>
//             </section>

//             {/* ===== Offices ===== */}
//             <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {offices.map((office, i) => (
//                     <div
//                         key={i}
//                         className="bg-white shadow-md rounded-lg p-6 space-y-3"
//                     >
//                         <h3 className="font-semibold text-lg">{office.title}</h3>

//                         <p className="text-sm text-gray-600">{office.address}</p>

//                         <p className="text-sm">
//                             📞 <span className="font-medium">{office.phone}</span>
//                         </p>

//                         <p className="text-sm">
//                             ✉️{" "}
//                             <a
//                                 href={`mailto:${office.email}`}
//                                 className="text-red-600 hover:underline"
//                             >
//                                 {office.email}
//                             </a>
//                         </p>
//                     </div>
//                 ))}
//             </section>

//             {/* ===== Contact Form ===== */}
//             <section className="max-w-4xl mx-auto px-6 pb-20 text-center">
//                 <h2 className="text-2xl font-semibold">{form.title}</h2>
//                 <p className="text-gray-600 mt-2">{form.subtitle}</p>

//                 <form className="mt-10 space-y-6 text-left">
//                     <input
//                         type="text"
//                         placeholder="Name"
//                         className="w-full border rounded-md px-4 py-3"
//                         required
//                     />

//                     <input
//                         type="email"
//                         placeholder="Email Address"
//                         className="w-full border rounded-md px-4 py-3"
//                         required
//                     />

//                     {/* <input
//                         type="tel"
//                         placeholder="Phone"
//                         className="w-full border rounded-md px-4 py-3"
//                         required
//                     /> */}
//                     <CountryPhoneInput/>

//                     <textarea
//                         placeholder="Message"
//                         rows="5"
//                         className="w-full border rounded-md px-4 py-3"
//                     />

//                     <label className="flex items-start gap-2 text-sm text-gray-600">
//                         <input type="checkbox" className="mt-1" />
//                         By submitting my details, I authorize DU Global to contact me via
//                         Call / SMS / WhatsApp / Email.
//                     </label>

//                     <button
//                         type="submit"
//                         className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700"
//                     >
//                         Submit
//                     </button>
//                 </form>
//             </section>

// {/* ===== Maps ===== */}
// <section className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-16">
//     {offices.slice(1).map((office, i) => (
//         <iframe
//             key={i}
//             src={office.mapEmbed}
//             className="w-full h-[300px] border rounded-md"
//             loading="lazy"
//         />
//     ))}
// </section>
//         </div>
//     );
// }
// export default ContactUs;