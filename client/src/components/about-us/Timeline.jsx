const Timeline = ({ data }) => (
    <section className="py-16 text-center">
        <h3 className="text-red-600 font-bold">{data.year}</h3>
        <p className="font-semibold mt-2">{data.title}</p>
        <p className="text-gray-600">{data.subtitle}</p>
        <img src={data.flag} alt="" className="mx-auto mt-4 h-8" />
    </section>
);

export default Timeline;
