import { ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const EventsGrid = ({ data }) => {
    const navigate = useNavigate();
    const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

    const COLORS = [
        "bg-yellow-400",
        "bg-green-500",
        "bg-red-500",
        "bg-blue-500",
        "bg-emerald-500",
        "bg-pink-500",
    ];

    // Stable color based on blog id
    const getColorFromId = (id) => {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash += id.charCodeAt(i);
        }
        return COLORS[hash % COLORS.length];
    };


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
                // onClick={() => navigate(`/events/${event._id}`)}
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

                    {/* TOP RIGHT ARROW BUTTON */}
                    {/* <button
                        onClick={() => navigate(`/events/${event._id}`)}
                        className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 transition"
                    >
                        <span className="text-xl font-bold text-red-500">↗</span>
                    </button> */}

                    <Link to={`/events/${event._id}`} className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 transition z-10">
                        <ArrowUpRight size={24} className="text-red-600 " />
                    </Link>

                    {/* CONTENT */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-0">
                        {/* Category Badge */}
                        <span className={`${getCategoryColor(event.category)} text-white text-xs px-3 py-1 rounded-full w-max mb-3 font-medium`}>
                            {event.category}
                        </span>

                        <Link to={`/events/${event._id}`} className="bg-[#FF1033] text-[#FFFDF5] px-6 py-2 mb-4 rounded-full w-max font-bold hover:bg-[#511313] hover:text-[#FF1033] transition-all duration-300 cursor-pointer">
                            View More
                        </Link>

                        <h3 className="font-semibold text-lg leading-snug mb-0">
                            {event.title}
                        </h3>
                    </div>
                </div>


            ))}
        </div>
    );
};

export default EventsGrid;




// {/* <div
//     key={event._id}
//     className="relative h-[460px] rounded-[32px] overflow-hidden group shadow-xl cursor-pointer"
// >
//     {/* IMAGE */}
//     {event.imageUrl ? (
//         <img
//             src={`${BackendImagesURL}${event.imageUrl}`}
//             alt={event.title}
//             className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//         />
//     ) : (
//         <div className="absolute inset-0 bg-gray-300" />
//     )}

//     {/* GRADIENT OVERLAY */}
//     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

//     {/* TOP LEFT BADGE */}
//     <span
//         className={`absolute top-5 left-5 px-4 py-1.5 text-sm font-semibold text-white rounded-full ${getCategoryColor(
//             event.category
//         )}`}
//     >
//         {event.category}
//     </span>

//     {/* TOP RIGHT ARROW BUTTON */}
//     <button
//         onClick={() => navigate(`/events/${event._id}`)}
//         className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 transition"
//     >
//         <span className="text-xl font-bold text-red-500">↗</span>
//     </button>

//     {/* BOTTOM CONTENT */}
//     <div className="absolute bottom-0 p-6 text-white">
//         <h3 className="text-2xl font-bold leading-snug max-w-[90%]">
//             {event.title}
//         </h3>
//     </div>
// </div> */}
