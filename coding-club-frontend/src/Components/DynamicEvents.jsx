import { useState, useEffect } from "react";
import { getEvents } from "../api/contentApi";
import { showErrorToast } from "../../utils/toastUtils";
import PropTypes from "prop-types";

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'text-blue-400';
      case 'ongoing': return 'text-green-400';
      case 'completed': return 'text-gray-400';
      case 'cancelled': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-black bg-opacity-50 p-4 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer border group">
      <div className="relative overflow-hidden rounded-lg mb-3">
        {event.images && event.images.length > 0 ? (
          <img
            src={event.images[0].url}
            alt={event.title}
            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = "/api/placeholder/400/160";
            }}
          />
        ) : (
          <div className="w-full h-40 bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">{event.title.charAt(0)}</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-black bg-opacity-70 ${getStatusColor(event.status)}`}>
            {event.status.toUpperCase()}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white line-clamp-2">{event.title}</h3>
        <p className="text-sm text-purple-300">{formatDate(event.date)}</p>
        <p className="text-sm text-gray-200 line-clamp-3">{event.description}</p>
        
        {event.category && (
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-purple-600 bg-opacity-50 rounded-full text-xs text-purple-200">
              {event.category}
            </span>
          </div>
        )}
        
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {event.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                {tag}
              </span>
            ))}
            {event.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                +{event.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      caption: PropTypes.string
    })),
    category: PropTypes.string,
    status: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
};

const DynamicEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const params = {};
        if (filter !== 'all') {
          if (filter === 'upcoming') {
            params.upcoming = 'true';
          } else {
            params.status = filter;
          }
        }
        
        const response = await getEvents({ ...params, limit: 12 });
        setEvents(response.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
        showErrorToast("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filter]);

  const filterOptions = [
    { value: 'all', label: 'All Events' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Past Events' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'hackathon', label: 'Hackathons' },
    { value: 'competition', label: 'Competitions' }
  ];

  if (loading) {
    return (
      <div className="bg-[#040313] min-h-screen py-10">
        <div className="container mx-auto px-6">
          <h1 className="text-center text-3xl font-bold text-white mb-6">
            Loading Events...
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-black bg-opacity-50 p-4 rounded-xl animate-pulse">
                <div className="w-full h-40 bg-gray-700 rounded-lg mb-3"></div>
                <div className="h-6 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#040313] min-h-screen">
      <div className="bg-[#040313] bg-opacity-70 py-10">
        <div className="container mx-auto px-6">
          <h1 className="text-center text-3xl font-bold text-white mb-6">
            Our Events
          </h1>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === option.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {events.length === 0 ? (
            <div className="text-center text-gray-400 py-20">
              <p className="text-xl">No events found for the selected filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicEvents;