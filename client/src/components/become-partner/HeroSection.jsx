const HeroSection = ({ data }) => {
    return (
        <section className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6">
                <div>
                    <h1 className="text-4xl font-bold">
                        {data.title} <span className="text-red-600">{data.brand}</span>
                    </h1>

                    <ul className="mt-6 space-y-2">
                        {data.points.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <span className="text-red-600">•</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* FORM UI ONLY */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <input className="input" placeholder="Name" />
                    <input className="input mt-3" placeholder="Email Address" />
                    <input className="input mt-3" placeholder="Phone Number" />
                    <button className="btn-primary mt-4 w-full">
                        {data.cta}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
