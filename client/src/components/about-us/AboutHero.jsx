const AboutHero = ({ data }) => (
    <section
        className="h-[800px] bg-cover bg-center relative flex items-center"
        style={{ backgroundImage: `url(${data.backgroundImage})` }}
    >
        {/* <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-transparent" /> */}
        <div className="relative z-10 max-w-7xl mr-auto px-8 md:px-20 text-white">
            {/* <h1 className="text-4xl md:text-5xl font-bold">{data.title}</h1> */}
            <p className="mt-4 max-w-xl">{data.subtitle}</p>
        </div>
    </section>
);

export default AboutHero;
