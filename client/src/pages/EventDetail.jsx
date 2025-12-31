import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById, clearSelectedEvent } from '../redux/slices/eventsSlice';
import { ArrowLeft } from 'lucide-react';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedEvent, eventLoading, error } = useSelector((state) => state.events);
    const BackendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

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
                        onClick={() => navigate('/news-and-media/event')}
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

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[400px] bg-gradient-to-br from-green-600 to-green-800">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

                <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center text-white">
                    <button
                        onClick={() => navigate('/news-and-media/event')}
                        className="flex items-center gap-2 mb-6 hover:opacity-80 transition"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Events</span>
                    </button>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-4xl">
                        {selectedEvent.title}
                    </h1>

                    {selectedEvent.description && (
                        <p className="text-lg opacity-90 max-w-3xl">
                            {selectedEvent.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Event Images Gallery */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-semibold mb-8">Event Gallery</h2>

                {selectedEvent.images && selectedEvent.images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedEvent.images.map((image, index) => (
                            <div
                                key={index}
                                className="relative aspect-video rounded-xl overflow-hidden shadow-lg group"
                            >
                                <img
                                    src={`${BackendURL}${image}`}
                                    alt={`${selectedEvent.title} - Image ${index + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                />
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
        </div>
    );
};

export default EventDetail;
