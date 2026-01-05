import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountryPhoneInput from "../become-partner/CountryPhoneInput";
import { submitContactForm, clearContactState } from "../../redux/slices/contactSlice";

const ContactForm = ({ form }) => {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.contact);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: null,
        message: "",
        consent: false,
    });

    useEffect(() => {
        return () => {
            dispatch(clearContactState());
        };
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handlePhoneChange = (phoneData) => {
        setFormData(prev => ({ ...prev, phone: phoneData }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(clearContactState());

        const payload = {
            fullName: formData.name,
            email: formData.email,
            phone: formData.phone?.fullNumber || "",
            message: formData.message,
            AllowMsg: formData.consent,
        };

        const result = await dispatch(submitContactForm(payload));

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
        <div className="bg-white rounded-2xl shadow-lg p-2.5 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-3"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-3"
                    required
                />

                <CountryPhoneInput onChange={handlePhoneChange} />

                <textarea
                    name="message"
                    placeholder="Message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-3"
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

                {success && (
                    <div className="bg-green-100 text-green-700 px-4 py-3 rounded-md">
                        Thank you! Your message has been submitted successfully.
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-3 rounded-md">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-full font-bold text-lg transition-all duration-300 bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] disabled:opacity-50"
                >
                    {loading ? "Submitting..." : "Get in Touch"}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
