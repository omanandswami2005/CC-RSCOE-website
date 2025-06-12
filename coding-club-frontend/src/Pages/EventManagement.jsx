import { useEffect, useState } from "react";
import EventCard from "../Components/EventCard";
import EventForm from "../Components/EventForm";
import { fetchEvents, addEvent } from "../api/eventApi";

const EventManagement = () => {
  const [events, setEvents] = useState([]);

  // Load events once on mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to load events:", error);
      }
    };
    loadEvents();
  }, []);

  // Handle add event - receives FormData from EventForm
  const handleAddEvent = async (formData) => {
    try {
      const addedEvent = await addEvent(formData); // addEvent sends FormData to backend
      setEvents((prev) => [addedEvent, ...prev]); // prepend new event to list
    } catch (error) {
      console.error("Failed to add event:", error);
      alert("Oops! Could not add event. Please try again.");
    }
  };

  return (
    <div className="mt-2 bg-[#0a0112] min-h-screen text-gray-300 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-xl mx-auto py-1 ">
        <h3 className="text-center text-4xl md:text-5xl font-extrabold mb-8 mt-12 tracking-wide">
          Our Events
        </h3>
      </div>

      <div className="flex justify-center mb-12">
        <EventForm onSubmit={handleAddEvent} />
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event._id} {...event} />
        ))}
      </div>
    </div>
  );
};

export default EventManagement;
