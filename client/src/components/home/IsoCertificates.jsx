const IsoCertificates = ({ data }) => {
    return (
        <section className="relative py-24 md:px-20 bg-white overflow-hidden">

            {/* FAINT BACKGROUND TITLE */}
            {/* <h2 className="absolute inset-0 flex justify-center items-start pt-20 text-[8rem] font-bold text-black/5 uppercase pointer-events-none">
                Our Certifications
            </h2> */}

            <div className="relative max-w-7xl mx-auto px-6">

                {/* HEADER */}
                <div className="text-center mb-16">
                    <p className="text-sm font-semibold text-[#AC0826] uppercase tracking-wide">
                        {data.label}
                    </p>

                    <h3 className="text-3xl md:text-4xl font-semibold mt-2">
                        {data.title}
                    </h3>

                    {/* RED UNDERLINE */}
                    <div className="w-12 h-[2px] bg-[#AC0826] mx-auto mt-4" />
                </div>

                {/* CERTIFICATES GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 text-center">

                    {data.certificates.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">

                            {/* ISO IMAGE */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-24 object-contain mb-6"
                            />

                            {/* STAR DIVIDER */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-[1px] bg-[#AC0826]" />
                                <span className="text-[#AC0826] text-lg">★</span>
                                <span className="w-8 h-[1px] bg-[#AC0826]" />
                            </div>

                            {/* TEXT */}
                            <p className="font-semibold text-gray-900">
                                {item.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                {item.description}
                            </p>

                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default IsoCertificates;
