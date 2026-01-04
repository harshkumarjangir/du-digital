import * as Icons from "lucide-react";

const WhyUsSection = ({ data }) => {
    return (
        <section
            className="relative py-24 bg-cover bg-center text-white"
            style={{ backgroundImage: `url(${data.backgroundImage})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/80" />

            <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                {/* LEFT CONTENT */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-6">
                        {data.title}
                    </h2>

                    <div className="w-12 h-[2px] bg-red-600 mb-6" />

                    <p className="text-gray-300 leading-relaxed max-w-xl mb-8">
                        {data.description}
                    </p>

                    {/* <a
                        href={data.cta.link}
                        className="inline-block bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition"
                    >
                        {data.cta.text}
                    </a> */}
                </div>

                {/* RIGHT FEATURES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {data.features.map((item, index) => {
                        const Icon = Icons[item.icon] || Icons.HelpCircle;

                        return (
                            <div key={index} className="flex items-start gap-4">

                                {/* ICON */}
                                <div className="flex-shrink-0 bg-red-600 p-3 rounded-md">
                                    <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                                </div>

                                {/* TEXT */}
                                <div>
                                    <h4 className="text-lg font-semibold mb-1">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {item.text}
                                    </p>
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default WhyUsSection;
