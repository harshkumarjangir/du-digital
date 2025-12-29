import VideoCard from "../components/video-gallery/VideoCard";
import videos from "../data/videos.json";

import { useState } from "react";

const VideoGallery = () => {
    const [visibleCount, setVisibleCount] = useState(6);

    // Group by category
    const groupedVideos = videos.reduce((acc, video) => {
        acc[video.category] = acc[video.category] || [];
        acc[video.category].push(video);
        return acc;
    }, {});

    return (
        <div className="w-full">
            {/* ===== HERO ===== */}
            {/* <div className="relative h-[300px] bg-gradient-to-r from-red-900 to-red-600 flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold">Video Gallery</h1>
            </div> */}
            {/* ===== Hero ===== */}
            <section
                className="h-[320px] bg-cover bg-center relative flex items-center justify-center"
                style={{ backgroundImage: `url(${'/assets/video-gallery/video-gallery-bg.jpg'})` }}
            >
                <div className="absolute inset-0 bg-black/60" />
                <h1 className="relative z-10 text-white text-4xl font-semibold">
                Video Gallery
                </h1>
            </section>

            {/* ===== CONTENT ===== */}
            <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
                {Object.entries(groupedVideos).map(([category, items]) => (
                    <div key={category}>
                        <h2 className="text-2xl font-semibold text-center mb-8">
                            {category}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {items.slice(0, visibleCount).map((video) => (
                                <VideoCard key={video._id} video={video} />
                            ))}
                        </div>
                    </div>
                ))}

                {/* ===== LOAD MORE ===== */}
                {visibleCount < videos.length && (
                    <div className="text-center">
                        <button
                            onClick={() => setVisibleCount((p) => p + 6)}
                            className="mt-6 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoGallery;
