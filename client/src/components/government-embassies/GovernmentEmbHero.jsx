const GovernmentEmbHero = ({ data }) => (
    <section
        className="h-screen md:h-[80vh] bg-cover bg-center relative flex items-center"
        style={{ backgroundImage: `url(${data.backgroundImage})` }}
    >
        {/* <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-transparent" /> */}
        <div className="relative z-10 max-w-4xl mr-auto px-8 md:px-20 text-white">
            <h1 className="text-4xl md:text-5xl font-bold">{data.title}</h1>
            <p className="mt-4 max-w-xl">{data.subtitle}</p>
            <a href={data.button.link} className="mt-8 inline-flex items-center px-6 py-2.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300 cursor-pointer">
                {data.button.text}
            </a>
        </div>
    </section>
);

export default GovernmentEmbHero;
