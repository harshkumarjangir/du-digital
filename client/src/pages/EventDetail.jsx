import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById, clearSelectedEvent } from '../redux/slices/eventsSlice';
import { ArrowLeft } from 'lucide-react';
import ImageGalleryModal from '../components/reusable/ImageGalleryModal';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedEvent, eventLoading, error } = useSelector((state) => state.events);
    const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    const BackendImagesURL = import.meta.env.VITE_BACKEND_IMAGES_URL || 'http://localhost:5000/api';

    // Gallery modal state
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchEventById(id));

        return () => {
            dispatch(clearSelectedEvent());
        };
    }, [dispatch, id]);

    if (eventLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading event details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error: {error}</p>
                    <button
                        onClick={() => navigate('/events')}
                        className="text-blue-600 hover:underline"
                    >
                        Back to Events
                    </button>
                </div>
            </div>
        );
    }

    if (!selectedEvent) {
        return null;
    }

    // Debug: Log the event data to see what we're getting
    console.log('Selected Event:', selectedEvent);
    console.log('Images:', selectedEvent.images);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[800px]">
                <img src={`${BackendImagesURL}${selectedEvent.imageUrl}`} alt="" className="w-full h-full object-cover object-center absolute inset-0 " />

                <div className="relative max-w-7xl mx-auto px-6 md:px-20 h-full flex flex-col justify-center text-white z-20">
                    <button
                        onClick={() => navigate('/events')}
                        className="flex items-center gap-2 mb-6 hover:opacity-80 transition hover:underline cursor-pointer"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Events</span>
                    </button>

                    <h1 className="text-3xl md:text-5xl font-semibold text-center mb-4 max-w-4xl mx-auto">
                        {selectedEvent.title}
                    </h1>

                    {selectedEvent.description && (
                        <p className="text-lg opacity-90 max-w-3xl mx-auto">
                            {selectedEvent.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Event Images Gallery */}
            <div className="max-w-7xl mx-auto px-6 md:px-20 py-16">
                <h2 className="text-3xl font-semibold mb-8">Event Gallery</h2>

                {selectedEvent.images && selectedEvent.images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedEvent.images.map((image, index) => (
                            <div
                                key={index}
                                className="relative aspect-square rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                                onClick={() => {
                                    setSelectedImageIndex(index);
                                    setGalleryOpen(true);
                                }}
                            >
                                <img
                                    src={`${BackendImagesURL}${image}`}
                                    alt={`${selectedEvent.title} - Image ${index + 1}`}
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
                                />

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                                        Click to view
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <p className="text-gray-500">No images available for this event</p>
                    </div>
                )}
            </div>

            {/* Event Details */}
            {selectedEvent.details && (
                <div className="bg-gray-50 py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-semibold mb-6">Event Details</h2>
                        <div className="prose max-w-none">
                            <p className="text-gray-700 leading-relaxed">{selectedEvent.details}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Gallery Modal */}
            {galleryOpen && selectedEvent.images && (
                <ImageGalleryModal
                    images={selectedEvent.images}
                    startIndex={selectedImageIndex}
                    onClose={() => setGalleryOpen(false)}
                    baseUrl={BackendImagesURL}
                />
            )}
        </div>
    );
};

export default EventDetail;
