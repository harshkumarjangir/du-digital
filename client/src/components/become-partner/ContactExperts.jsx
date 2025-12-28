import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactExperts = ({ data }) => {
    return (
        <section className="bg-black text-white py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
                {/* Title */}
                <h2 className="text-4xl font-bold mb-8">
                    {data.title}
                </h2>

                {/* CTA */}
                <button className="bg-red-600 hover:bg-red-700 transition px-8 py-3 font-semibold mb-16">
                    {data.ctaText}
                </button>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {data.cards.map((card, index) => (
                        <div
                            key={index}
                            className="relative bg-white text-black p-4 shadow-lg"
                        >
                            {/* Icon */}
                            <div className="absolute -top-6 right-6 bg-red-600 text-white p-4 rounded-full">
                                {card.type === "phone" ? (
                                    <FaPhoneAlt />
                                ) : (
                                    <FaMapMarkerAlt />
                                )}
                            </div>

                            <h3 className="text-xl font-semibold mb-4">
                                {card.title}
                            </h3>

                            {/* Phone Cards */}
                            {card.type === "phone" &&
                                card.regions.map((item, i) => (
                                    <div key={i} className="mb-6">
                                        <p className="text-red-600 font-semibold">
                                            {item.region}
                                        </p>
                                        <p className="text-red-600">
                                            {item.name} ({item.designation})  {item.phone}
                                        </p>
                                        {/* <p className="text-red-600">
                                            {item.phone}
                                        </p> */}
                                    </div>
                                ))}

                            {/* Location Card */}
                            {card.type === "location" && (
                                <div>
                                    <p className="text-red-600 font-semibold">
                                        {card.addressTitle}:
                                    </p>
                                    <p className="mt-2">
                                        {card.address}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactExperts;
