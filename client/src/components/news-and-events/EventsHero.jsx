const EventsHero = ({ data }) => (
    <section
        className="h-[800px] flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${data.background})` }}
    >
        {/* <div className="absolute inset-0 bg-red-900/40" /> */}
        <h1 className="relative text-4xl md:text-5xl font-bold text-white">
            {data.title}
        </h1>
    </section>
);

export default EventsHero;
