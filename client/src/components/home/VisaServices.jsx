import { useState } from "react";

const VisaServices = ({ data }) => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const duDigitalUrl = import.meta.env.VITE_DUDIGITAL_URL || 'https://dudigitalglobal.com';

    const indiaRedirects = {
        'UAE 5-year Tourist Visa': `${duDigitalUrl}/dubai-5year-tourist-visa/`,
        'Armenia': `${duDigitalUrl}/apply-for-any-visa/`,
        'Australia': `${duDigitalUrl}/australia-tourist-visa/`,
        'Azerbaijan': `${duDigitalUrl}/apply-for-any-visa/`,
        'Bahrain': `${duDigitalUrl}/apply-for-any-visa/`,
        'Bangladesh': 'https://www.bdvisa.com/',
        'Cambodia': `${duDigitalUrl}/apply-for-any-visa/`,
        'Canada': `${duDigitalUrl}/apply-for-any-visa/`,
        'China': `${duDigitalUrl}/apply-for-any-visa/`,
        'Egypt': `${duDigitalUrl}/egypt-visa-for-indians/`,
        'France': `${duDigitalUrl}/apply-for-any-visa/`,
        'Georgia': `${duDigitalUrl}/georgia-evisa/`,
        'Germany': `${duDigitalUrl}/apply-for-any-visa/`,
        'Greece': `${duDigitalUrl}/apply-for-any-visa/`,
        'Indonesia': `${duDigitalUrl}/apply-for-any-visa/`,
        'Japan': `${duDigitalUrl}/japan-tourist-visa-for-indians/`,
        'Kenya': `${duDigitalUrl}/apply-for-any-visa/`,
        'Morocco': `${duDigitalUrl}/morocco-visa/`,
        'Oman': `${duDigitalUrl}/apply-for-any-visa/`,
        'Russia': `${duDigitalUrl}/apply-for-any-visa/`,
        'Singapore': `${duDigitalUrl}/apply-for-any-visa/`,
        'South Korea': `${duDigitalUrl}/south-korea-visa-for-indians/`,
        'Switzerland': `${duDigitalUrl}/apply-for-any-visa/`,
        'Thailand': `${duDigitalUrl}/apply-for-any-visa/`,
        'Tunisia': `${duDigitalUrl}/apply-for-any-visa/`,
        'Turkey': `${duDigitalUrl}/apply-for-any-visa/`,
        'UK': `${duDigitalUrl}/apply-for-any-visa/`,
        'USA': `${duDigitalUrl}/apply-for-any-visa/`,
        'Uzbekistan': `${duDigitalUrl}/apply-for-any-visa/`,
        'Vietnam': `${duDigitalUrl}/apply-for-any-visa/`,
        'Other Countries': `${duDigitalUrl}/apply-for-any-visa/`
    };

    const defaultRedirect = `${duDigitalUrl}/apply-for-any-visa/`;

    // Dynamic options for "Applying from"
    const fromOptions = ["India", "South Korea", "Bangladesh", "Thailand"];

    // Dynamic options for "Applying to", dependent on "from"
    const getToOptions = () => {
        if (from === 'India') {
            return Object.keys(indiaRedirects);
        } else if (from === 'South Korea' || from === 'Thailand') {
            return ['India'];
        } else if (from === 'Bangladesh') {
            return ['UAE', 'Singapore', 'Ireland'];
        }
        return [];
    };

    const handleGo = () => {
        let redirectURL = defaultRedirect;

        if (from === 'India') {
            redirectURL = indiaRedirects[to] || defaultRedirect;
        } else if (from === 'South Korea' && to === 'India') {
            redirectURL = 'https://duicac.dudigitalglobal.com/sk/';
        } else if (from === 'Thailand' && to === 'India') {
            redirectURL = 'https://duicac.dudigitalglobal.com/th/';
        } else if (from === 'Bangladesh') {
            if (to === 'UAE' || to === 'Singapore' || to === 'Ireland') {
                redirectURL = 'https://dudigitalglobal.com/bangladesh-visas-for-uae-singapore/';
            }
        }

        if (to) {
            window.location.href = redirectURL;
        } else {
            alert('Please select a destination.');
        }
    };

    return (
        <section className="relative py-16">
            {/* ... dotted background commented out ... */}

            <div className="relative max-w-6xl mx-auto px-4">

                <div className="bg-white rounded-2xl shadow-xl p-4">

                    {/* Header */}
                    <div className="bg-red-600 text-white text-center py-4 rounded-xl text-2xl font-semibold mb-8">
                        {data.title}
                    </div>

                    {/* Form */}
                    <div className="grid lg:grid-cols-3 gap-6 items-end">

                        {/* From */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                {data.fromLabel}
                            </label>
                            <select
                                value={from}
                                onChange={(e) => {
                                    setFrom(e.target.value);
                                    setTo(""); // Reset 'to' when 'from' changes
                                }}
                                className="w-full border border-red-500 rounded-full px-5 py-3 focus:outline-none"
                            >
                                <option value="" disabled>
                                    -{data.fromPlaceholder}-
                                </option>
                                {fromOptions.map((loc, i) => (
                                    <option key={i} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* To */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                {data.toLabel}
                            </label>
                            <select
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                className="w-full border border-red-500 rounded-full px-5 py-3 focus:outline-none"
                            >
                                <option value="" disabled>
                                    -{data.toPlaceholder}-
                                </option>
                                {getToOptions().map((loc, i) => (
                                    <option key={i} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Button */}
                        <button
                            onClick={handleGo}
                            className="bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] transition-all duration-300 rounded-full px-8 py-3 text-center font-bold text-lg flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {data.buttonText}
                            <span>→</span>
                        </button>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisaServices;
