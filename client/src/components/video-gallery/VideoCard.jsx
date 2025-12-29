import { getEmbedUrl } from "../../utils/youtube";

const VideoCard = ({ video }) => {
    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden p-4">
            <div className="aspect-video">
                <iframe
                    src={getEmbedUrl(video.videoUrl)}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            <div className="p-4">
                <h4 className="text-sm font-semibold text-red-600 leading-snug">
                    {video.title}
                </h4>
            </div>
        </div>
    );
};

export default VideoCard;
