import { ArrowRight } from "lucide-react";

const OurBusinesses = ({ data }) => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* ===== HEADER ===== */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-semibold text-gray-900">
                        {data.title}
                    </h2>
                    <div className="w-16 h-[3px] bg-red-600 mx-auto my-4" />
                    <p className="text-gray-600 font-medium">
                        {data.subtitle}
                    </p>
                </div>

                {/* ===== FLAGS ===== */}
                <div className="flex flex-wrap justify-center gap-10 mb-12">
                    {data.countries.map((country, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <img
                                src={country.flag}
                                alt={country.name}
                                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                {country.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mb-20">
                    <a
                        href={data.cta.link}
                        className="inline-block bg-[#FF1033] text-[#FFFDF5] px-8 py-3 rounded-full font-bold text-lg hover:bg-[#511313] hover:text-[#FF1033] transition-all duration-300 cursor-pointer"
                    >
                        {data.cta.text}
                    </a>
                </div>

                {/* ===== BUSINESS CARDS ===== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {data.cards.map((card, i) => (
                        <a
                            key={i}
                            href={card.link}
                            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                        >
                            {/* Image */}
                            <div className="h-44 overflow-hidden">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                    {card.description}
                                </p>

                                <ArrowRight
                                    size={25}
                                    className="text-red-600 group-hover:translate-x-1 transition ml-auto"
                                />
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default OurBusinesses;
