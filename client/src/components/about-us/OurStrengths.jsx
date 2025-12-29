const OurStrengths = ({ data }) => (
    <section className="py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6">
            {data.map((item, i) => (
                <div key={i} className="bg-gray-900 p-6 rounded border border-red-600">
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-300">{item.description}</p>
                </div>
            ))}
        </div>
    </section>
);

export default OurStrengths;
