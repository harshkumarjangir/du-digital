const WhyDuGlobal = ({ data }) => {
    return (
        <section className="py-16 text-center">
            <h2 className="text-3xl font-bold mb-10">Why DU Global?</h2>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6">
                {data.map((item, i) => (
                    <div
                        key={i}
                        className="border border-red-500 rounded-xl p-6 text-red-600 font-semibold"
                    >
                        {item.title}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyDuGlobal;
