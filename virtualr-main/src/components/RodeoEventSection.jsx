import { useState, useEffect } from "react";
import { colors } from "../constants";
import { BACKEND_URL } from "../constants";
import Countdown from "react-countdown";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { parse, startOfWeek, format, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US"; 
import background_pic from "../assets/profile-pictures/podcast.jpg"; // Import background image correctly
import pics1 from "../assets/profile-pictures/podcast.jpg"

const locales = {
    "en-US": enUS,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
  
  // Example events
  const formevents = [
    {
      title: "Networking Event",
      allDay: true,
      start: new Date(2024, 10, 23),
      end: new Date(2024, 10, 23),
    },
    {
      title: "Team Building Workshop",
      start: new Date(2024, 10, 25, 10, 0),
      end: new Date(2024, 10, 25, 14, 30),
    },
    {
      title: "Annual Galfshsffs sgdfhsf a",
      start: new Date(2024, 10, 28, 18, 0),
      end: new Date(2024, 10, 28, 22, 0),
    },
  ];

const FullRodeoSection = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpForm, setRsvpForm] = useState({ name: "", phone: "", email: "" });

  // Fetch events
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/events`);
      const data = await response.json();
      
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  const parseDate = (dateStr) => {
    // Convert "December 22nd, 2024" to a valid Date object
    const cleanedDate = dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1"); // Remove ordinal suffix
    return new Date(cleanedDate);
  };
  const lastEvent = events[0];
  const otherEvents = events.slice(1, events.length);
    const formattedCalendarEvents = events.map(event => ({
    title: event.Name,
    start: parseDate(event.Date), // Ensure proper parsing
    end: parseDate(event.Date),   // Adjust if multi-day
  }));

  useEffect(() => {
    fetchEvents();
 
  }, []);

  // Handle RSVP form submission
  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    console.log("RSVP Details:", rsvpForm);
    // Submit RSVP to backend or process it here
  };
 
  return (
    <section id="rodeo-page" className="flex flex-col items-center text-white">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src={pics1}
          alt="Rodeo Event Background"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-black bg-opacity-50">
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wide"
            style={{ color: colors.backgroundLight }}
          >
            Welcome to the Rodeo!
          </h1>
          <p className="mt-6 text-lg max-w-4xl" style={{ color: colors.backgroundLight }}>
            Explore our thrilling events, enjoy delicious food, meet exciting guests, and RSVP to join us.
          </p>
        </div>
      </div>

      {lastEvent && (
  <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 rounded-xl shadow-lg overflow-hidden ">
    {/* Event Details */}
    <div className="flex flex-col flex-1  h-auto">
      <div className="p-6 flex flex-col">
        <div className="uppercase tracking-wide text-xl font-semibold mb-5">
          {lastEvent.Name}
        </div>
        <p className="text-sm mb-2">
          <strong>Date:</strong> {lastEvent.Date || "TBA"}
        </p>
        <p className="text-sm mb-2">
          <strong>Activities:</strong>{" "}
          {Array.isArray(lastEvent.Time) ? lastEvent.Time.join(", ") : "TBA"}
        </p>
        <p className="text-sm mb-2">
          <strong>Guests:</strong>{" "}
          {Array.isArray(lastEvent.Guests)
            ? lastEvent.Guests.join(", ")
            : "No guests listed"}
        </p>

        <div
          id="countdown"
          className="text-lg font-semibold py-4 rounded-lg mb-4"
        >
          <Countdown
            date={parseDate(lastEvent.Date)}
            renderer={({ days, hours, minutes, seconds, completed }) => {
              if (completed) {
                return <span>The event has started!</span>;
              } else {
                return (
                  <div className="flex justify-start">
                    <div className="text-center my-5 mr-10">
                      <span className="text-xl">{days}</span>
                      <span className="text-xs">Days</span>
                    </div>
                    <div className="text-center my-5 mr-10">
                      <span className="text-xl">{hours}</span>
                      <span className="text-xs">Hours</span>
                    </div>
                    <div className="text-center my-5 mr-10">
                      <span className="text-xl">{minutes}</span>
                      <span className="text-xs">Minutes</span>
                    </div>
                    <div className="text-center my-5">
                      <span className="text-xl">{seconds}</span>
                      <span className="text-xs">Seconds</span>
                    </div>
                  </div>
                );
              }
            }}
          />
        </div>

        <a
          href="#"
          className="block mt-4 text-lg font-bold hover:underline"
        >
          Learn More About the Event
        </a>
        <p className="mt-4">{lastEvent.About || "Details coming soon."}</p>
      
      </div>
    </div>

    {/* RSVP Form */}
    <div className="lg:w-1/3 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">RSVP for {lastEvent.Name}</h3>
      <form onSubmit={handleRsvpSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={rsvpForm.name}
            onChange={(e) =>
              setRsvpForm({ ...rsvpForm, name: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            className="w-full p-2 border border-gray-300 rounded"
            value={rsvpForm.phone}
            onChange={(e) =>
              setRsvpForm({ ...rsvpForm, phone: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={rsvpForm.email}
            onChange={(e) =>
              setRsvpForm({ ...rsvpForm, email: e.target.value })
            }
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="py-2 px-4 rounded hover:bg-gray-400"
            onClick={() => setSelectedEvent(null)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* Event List Section */}
      <div className="w-screen  px-6 py-12 "       style={{
        backgroundImage: `url(${background_pic})`,
      }}>
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherEvents.map((event, index) => (
            <div
              key={index}
              className="bg-customlightBrown p-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex flex-col"
            >
              <h3 className="text-2xl font-semibold mb-4">{event.Name}</h3>
              <div className="mb-4">
                <p className="text-sm mb-2"><strong>Date:</strong> {event.Date}</p>
                <p className="text-sm mb-2"><strong>Guests:</strong> {event.Guests.join(", ")}</p>
                <p className="text-sm"><strong>Activities:</strong> {event.Activities.join(", ")}</p>
              </div>
              {/* RSVP Button moved to bottom */}
              <button
                onClick={() => setSelectedEvent(event)}
                className="mt-auto bg-customBrown text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                RSVP Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Section */}
      <div className="w-full max-w-7xl px-6 py-12">
      <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
        Event Calendar
      </h2>
      <div className="bg-white text-black rounded-lg shadow-lg p-6">
        <Calendar
           titleAccessor={"title"}
          localizer={localizer}
          events={formattedCalendarEvents}
          startAccessor="start"
        
          components={{
            event: ({ event }) => (
              <span style={{ fontSize: "1rem", lineHeight: "4rem", height: 200  }}>
                {event.title}
              </span>
            ),
          }}
          style={{ height: 500 }}
          className="rounded-lg text-black"
        />
      </div>
    </div>

      {/* RSVP Section */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg shadow-lg p-8 max-w-md">
            <h3 className="text-xl font-bold mb-4">RSVP for {selectedEvent.Name}</h3>
            <form onSubmit={handleRsvpSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={rsvpForm.name}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium">Phone</label>
                <input
                  type="text"
                  id="phone"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={rsvpForm.phone}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={rsvpForm.email}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                  onClick={() => setSelectedEvent(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default FullRodeoSection;
