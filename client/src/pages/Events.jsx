import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../redux/slices/eventsSlice';
import EventsHero from '../components/news-and-events/EventsHero';
import eventsData from '../data/eventsPage.json';
import EventsGrid from '../components/news-and-events/EventsGrid';
import PageTabs from '../components/news-and-events/PageTabs';

const Events = () => {
    const dispatch = useDispatch();
    const { events, loading, error } = useSelector((state) => state.events);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    return (
        <div>
            <EventsHero data={eventsData.hero} />
            <PageTabs />

            {loading && (
                <div className="py-20 text-center">
                    <p className="text-gray-600">Loading events...</p>
                </div>
            )}

            {error && (
                <div className="py-20 text-center">
                    <p className="text-red-600">Error: {error}</p>
                </div>
            )}

            {!loading && !error && (
                <EventsGrid data={events} />
            )}
        </div>
    );
};

export default Events;