import React, { useState, useEffect, useRef } from "react";
import { getEvents } from "../api/contentApi";
import { showErrorToast } from "../../utils/toastUtils";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";

const EventCard = ({ event }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-md rounded-lg shadow-lg p-4">
      {event.images && event.images.length > 0 ? (
        <Slider {...settings}>
          {event.images.map((img, index) => (
            <div key={index}>
              <img
                src={img.url}
                alt={`${event.title} ${index + 1}`}
                className="w-full h-56 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = "/api/placeholder/400/224";
                }}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="w-full h-56 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg flex items-center justify-center">
          <span className="text-white text-2xl font-bold">{event.title.charAt(0)}</span>
        </div>
      )}
      <div className="mt-4 text-center">
        <h2 className="text-xl text-white font-bold">{event.title}</h2>
        <p className="text-gray-300">{formatDate(event.date)}</p>
        <p className="mt-2 text-gray-300 line-clamp-3">{event.description}</p>
        {event.category && (
          <span className="inline-block mt-2 px-3 py-1 bg-purple-600 bg-opacity-50 rounded-full text-sm text-purple-200">
            {event.category}
          </span>
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
    category: PropTypes.string
  }).isRequired,
};

function DynamicTimeline() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [clickedEvent, setClickedEvent] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents({ limit: 20 });
        setEvents(response.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
        showErrorToast("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (!scrollRef.current || loading) return;
    let scrollSpeed = 1;
    const scrollContainer = scrollRef.current;
    const scrollInterval = setInterval(() => {
      if (!isPaused) {
        scrollContainer.scrollLeft += scrollSpeed;
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 50);
    return () => clearInterval(scrollInterval);
  }, [isPaused, loading]);

  if (loading) {
    return (
      <div className="bg-[#040313] text-white flex flex-col h-[100vh] items-center gap-10 py-2">
        <h1 className="text-4xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500" style={{ fontFamily: "Sora, sans-serif" }}>
          Loading Events...
        </h1>
        <div className="flex overflow-x-auto whitespace-nowrap px-20 w-4/5 h-full py-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="relative mx-4 animate-pulse">
              <div className="w-28 h-28 rounded-full bg-gray-700"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-[#040313] text-white flex flex-col h-[100vh] items-center gap-10 py-2">
        <h1 className="text-4xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500" style={{ fontFamily: "Sora, sans-serif" }}>
          Our Events
        </h1>
        <div className="text-center text-gray-400">
          <p>No events available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#040313] text-white flex flex-col h-[100vh] items-center gap-10 py-2">
      <h1 className="text-4xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500" style={{ fontFamily: "Sora, sans-serif" }}>
        Our Events
      </h1>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto whitespace-nowrap px-20 w-4/5 h-full py-5 relative scroll-container"
      >
        {events.map((event, index) => (
          <div
            key={event._id}
            className="relative mx-4 cursor-pointer h-fit"
            onMouseEnter={() => {
              setHoveredEvent(index);
              setIsPaused(true);
            }}
            onMouseLeave={() => {
              setIsPaused(false);
            }}
          >
            {/* Event Image */}
            <div className="w-28 h-28 rounded-full overflow-hidden bg-white shadow-lg">
              {event.images && event.images.length > 0 ? (
                <img
                  src={event.images[0].url}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/112/112";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">{event.title.charAt(0)}</span>
                </div>
              )}
            </div>

            {/* Event Card on Hover or Click */}
            {(hoveredEvent === index || clickedEvent === index) && (
              <div
                className="absolute left-1/2 transform -translate-x-1/2 max-md:w-72 md:w-100 glassmorphism text-black p-4 rounded-lg shadow-lg overflow-x-auto display-flex scrollbar-hide break-words whitespace-normal mt-5"
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <EventCard event={event} className="w-full z-10" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hide Scrollbar */}
      <style>
        {`
          .scroll-container::-webkit-scrollbar {
            display: none;
          }
          .scroll-container {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
}

export default DynamicTimeline;