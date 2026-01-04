import { ArrowUpRight } from 'lucide-react';

const NewsHome = ({ data }) => {
    const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

    return (
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((item, index) => (
                <a
                    key={item._id}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`group relative flex flex-col gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300 border border-transparent hover:border-gray-100 ${index % 2 !== 0 ? "scale-110" : ""}`}
                >
                    {/* IMAGE CONTAINER */}
                    <div className="relative h-60 w-full overflow-hidden rounded-xl">
                        <img
                            src={`${BackendImagesURL}${item.imageUrl}`}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm group-hover:bg-white transition-colors">
                            <ArrowUpRight className="w-5 h-5 text-gray-900" />
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold tracking-wider text-red-600 uppercase">
                                News
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span className="text-xs text-gray-500">
                                {new Date(item.datePublished).toLocaleDateString("en-IN", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric"
                                })}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-red-700 transition-colors">
                            {item.title}
                        </h3>

                        <p className="text-sm text-gray-600 line-clamp-2">
                            Click to read the full coverage of this news item.
                        </p>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default NewsHome;
