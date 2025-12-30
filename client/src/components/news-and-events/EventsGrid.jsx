const EventsGrid = ({ data }) => {
    return (
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.map((event) => (
                <div
                    key={event._id}
                    className="relative rounded-2xl overflow-hidden shadow-lg group"
                >
                    {/* IMAGE PLACEHOLDER */}
                    <div className="h-[420px] bg-gray-300">
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>

                    {/* CONTENT */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <h3 className="font-semibold text-lg leading-snug mb-4">
                            {event.title}
                        </h3>

                        <button className="bg-white text-black px-6 py-2 rounded-full w-max font-semibold">
                            View More
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EventsGrid;
