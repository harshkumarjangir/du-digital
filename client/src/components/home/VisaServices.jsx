import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VisaServices = ({ data }) => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const navigate = useNavigate();

    const indiaRedirects = {
        'UAE 5-year Tourist Visa': `/dubai-5year-tourist-visa`,
        'Armenia': `/apply-for-any-visa`,
        'Australia': `/australia-tourist-visa`,
        'Azerbaijan': `/apply-for-any-visa`,
        'Bahrain': `/apply-for-any-visa`,
        'Bangladesh': 'https://www.bdvisa.com/',
        // 'Bangladesh': `/bangladesh-vac`,
        'Cambodia': `/apply-for-any-visa`,
        'Canada': `/apply-for-any-visa`,
        'China': `/apply-for-any-visa`,
        'Egypt': `/egypt-visa-for-indians`,
        'France': `/apply-for-any-visa`,
        'Georgia': `/georgia-evisa`,
        'Germany': `/apply-for-any-visa`,
        'Greece': `/greece-work-visa`,
        'Indonesia': `/apply-for-any-visa`,
        'Japan': `/japan-tourist-visa-for-indians`,
        'Kenya': `/apply-for-any-visa`,
        'Lebanon': `/lebanon`,
        'Malaysia': `/malaysia-visa-for-indians`,
        'Morocco': `/morocco-visa`,
        'Oman': `/apply-for-any-visa`,
        'Russia': `/apply-for-any-visa`,
        'Serbia': `/serbia-work-permit-visa`,
        'Singapore': `/apply-for-any-visa`,
        'South Korea': `/south-korea-visa-for-indians`,
        'Switzerland': `/apply-for-any-visa`,
        'Thailand': `/digital-arrival-cards`,
        'Tunisia': `/apply-for-any-visa`,
        'Turkey': `/apply-for-any-visa`,
        'UK': `/apply-for-any-visa`,
        'USA': `/apply-for-any-visa`,
        'Uzbekistan': `/apply-for-any-visa`,
        'Vietnam': `/apply-for-any-visa`,
        'Other Countries': `/apply-for-any-visa`
    };

    const defaultRedirect = `/apply-for-any-visa`;

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
            redirectURL = '/sk';
        } else if (from === 'Thailand' && to === 'India') {
            redirectURL = '/th';
        } else if (from === 'Bangladesh') {
            if (to === 'UAE' || to === 'Singapore' || to === 'Ireland') {
                redirectURL = '/bangladesh-visas-for-uae-singapore';
            }
        }

        if (to) {
            if (redirectURL.startsWith('http')) {
                window.open(redirectURL, '_blank', 'noopener,noreferrer');
            } else {
                navigate(redirectURL);
            }
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
                            <label htmlFor="visa-from" className="block mb-2 text-sm font-medium">
                                {data.fromLabel}
                            </label>
                            <select
                                id="visa-from"
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
                            <label htmlFor="visa-to" className="block mb-2 text-sm font-medium">
                                {data.toLabel}
                            </label>
                            <select
                                id="visa-to"
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
