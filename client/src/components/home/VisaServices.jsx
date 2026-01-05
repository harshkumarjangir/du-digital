import { useState } from "react";

const VisaServices = ({ data }) => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    return (
        <section className="relative py-16">

            {/* dotted background */}
            {/* <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px]" /> */}

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
                                onChange={(e) => setFrom(e.target.value)}
                                className="w-full border border-red-500 rounded-full px-5 py-3 focus:outline-none"
                            >
                                <option value="">
                                    -{data.fromPlaceholder}-
                                </option>
                                {data.locations.map((loc, i) => (
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
                                <option value="">
                                    -{data.toPlaceholder}-
                                </option>
                                {data.locations.map((loc, i) => (
                                    <option key={i} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Button */}
                        <a
                            href={data.buttonLink}
                            className="bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] transition-all duration-300 rounded-full px-8 py-3 text-center font-bold text-lg flex items-center justify-center gap-2"
                        >
                            {data.buttonText}
                            <span>→</span>
                        </a>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisaServices;
