import { useNavigate } from 'react-router-dom';

const EventsGrid = ({ data }) => {
    const navigate = useNavigate();
    const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

    // Category color mapping
    const categoryColors = {
        'Business Networking': 'bg-red-500',
        'Industry Conference': 'bg-green-500',
        'Product Launch': 'bg-yellow-500',
        'Community Event': 'bg-blue-500',
        'Trade Show': 'bg-purple-500',
        'default': 'bg-gray-500'
    };

    const getCategoryColor = (category) => {
        return categoryColors[category] || categoryColors.default;
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((event) => (
                <div
                    key={event._id}
                    className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                    onClick={() => navigate(`/events/${event._id}`)}
                >
                    {/* IMAGE */}
                    <div className="h-[420px] relative">
                        {event.imageUrl ? (
                            <img
                                src={`${BackendImagesURL}${event.imageUrl}`}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-300" />
                        )}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
                    </div>

                    {/* CONTENT */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        {/* Category Badge */}
                        <span className={`${getCategoryColor(event.category)} text-white text-xs px-3 py-1 rounded-full w-max mb-3 font-medium`}>
                            {event.category}
                        </span>

                        <h3 className="font-semibold text-lg leading-snug mb-4">
                            {event.title}
                        </h3>

                        <button className="bg-white text-black px-6 py-2 rounded-full w-max font-semibold hover:bg-gray-100 transition">
                            View More
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EventsGrid;
