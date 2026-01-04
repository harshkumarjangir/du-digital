const WorkingAt = ({ data }) => (
    <section className="relative bg-red-50 py-16 px-6">
        {/* make a absoluet div cinatinds bg image do not use bgimeg property
         */}
        <div className="absolute inset-0 bg-cover bg-center">
            <div className="bg-red-900/40"></div>
            <img src={data.background} alt="" className="w-full h-full object-fill" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-red-600 text-center mb-4">
                {data.title}
            </h2>
            <div className="border-b-2 border-red-600 w-56 mx-auto mb-8"></div>

            <div className="space-y-4 text-gray-800 text-sm md:text-base leading-relaxed">
                {data.description.map((p, i) => (
                    <p key={i}>{p}</p>
                ))}
            </div>
        </div>
    </section>
);

export default WorkingAt;
