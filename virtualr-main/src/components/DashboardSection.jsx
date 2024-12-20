import  { useState, useEffect } from 'react';
import { BACKEND_URL } from '../constants';

const Dashboard = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    user: '',
    text: '',
    company: '',
    image: ''
  });
  const [abouts, setAbouts] = useState([]);
  const [newAbout, setNewAbout] = useState({
    title: '',
    image: '',
    text: '',
  });
  const [podcasts, setPodcasts] = useState([]);
  const [newPodcast, setNewPodcast] = useState({
    title: '',
    description: '',
    date: '',
    thumbnail: '',
    spotify:'',
    apple:'',
    google:'',
  });
  const [shows, setShows] = useState([]);
  const [newShow, setNewShow] = useState({
    video: '',
    title: '',
    subtitle: '',
    link: '',
    text: '',
  });
  const [sponsors, setSponsors] = useState([]);
  const [newSponsor, setNewSponsor] = useState({
    name: '',
    link: '',
    description: '',
    logo: ''
  });

  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    activities: [],
    about: '',
    time: [],
    guest: [],
    date: '',
  });
  const [rsvps, setRsvps] = useState([]);
  const [tempValue, setTempValue] = useState('');
  const addToArray = (key) => {
    console.log('Adding to array:', key);
    if (!Array.isArray(newEvent[key])) {
      console.error(`Invalid key "${key}". Expected an array.`);
      return;
    }
    const updatedArray = [...newEvent[key], tempValue];
    setNewEvent({
      ...newEvent,
      [key]: updatedArray,
    });
    setTempValue('');
    console.log(`Updated ${key}:`, updatedArray);
  };
  

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setNewEvent({ ...newEvent, date: formattedDate });
  };
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

  const addEvent = async () => {
    try {
      console.log(newEvent);
      await fetch(`${BACKEND_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });
      fetchEvents();
      setNewEvent({    name: '',
        activities: [],
        about: '',
        time: [],
        guest: [],
        date: '',});
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const deleteEvent = async (name) => {
    try {
      await fetch(`${BACKEND_URL}/events/${name}`, {
        method: 'DELETE'
      });
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  // Fetch all sponsors from the server
  const fetchSponsors = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/sponsors`);
      const data = await response.json();
      setSponsors(data);
    } catch (error) {
      console.error("Error fetching sponsors:", error);
    }
  };
  const fetchRsvps = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/rsvps`);
      const data = await response.json();
      setRsvps(data);
    } catch (error) {
      console.error("Error fetching rsvps:", error);
    }
  };
  useEffect(() => {
    fetchRsvps();
  }, []);

  const groupedRsvps = rsvps.reduce((groups, rsvp) => {
    const { id } = rsvp;
    if (!groups[id]) {
      groups[id] = [];
    }
    groups[id].push(rsvp);
    return groups;
  }, {});

  const addSponsor = async () => {
    try {
      await fetch(`${BACKEND_URL}/sponsors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSponsor)
      });
      fetchSponsors();
      setNewSponsor({ name: '', link: '', description: '', logo: '' });
    } catch (error) {
      console.error("Error adding sponsor:", error);
    }
  };

  const deleteSponsor = async (user) => {
    try {
      await fetch(`${BACKEND_URL}/sponsors/${user}`, {
        method: 'DELETE'
      });
      fetchSponsors();
    } catch (error) {
      console.error("Error deleting sponsor:", error);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/shows`);
      const data = await response.json();
      setShows(data);
    } catch (error) {
      console.error("Error fetching shows:", error);
    }
  };

  const addShow = async () => {
    try {
      await fetch(`${BACKEND_URL}/shows`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newShow)
      });
      fetchShows();
      setNewShow({ video: '', title: '', link: '', subtitle: '', text: '' });
    } catch (error) {
      console.error("Error adding show:", error);
    }
  };

  const deleteShow = async (title) => {
    try {
      await fetch(`${BACKEND_URL}/shows/${title}`, {
        method: 'DELETE'
      });
      fetchShows();
    } catch (error) {
      console.error("Error deleting show:", error);
    }
  };

  useEffect(() => {
    fetchShows();
    fetchEvents();
  }, []);

  const loadPodcasts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/podcasts`);
      const data = await response.json();
      setPodcasts(data);
    } catch (error) {
      console.error("Error loading podcasts:", error);
    }
  };

  const loadRsvps = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/rsvps`);
      const data = await response.json();
      setRsvps(data);
    } catch (error) {
      console.error("Error loading rsvps:", error);
    }
  };

  const addPodcast = async () => {
    try {
      await fetch(`${BACKEND_URL}/podcasts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPodcast)
      });
      loadPodcasts();
    } catch (error) {
      console.error("Error adding podcast:", error);
    }
  };

  const deletePodcast = async (title) => {
    try {
      await fetch(`${BACKEND_URL}/podcasts/${title}`, {
        method: 'DELETE'
      });
      loadPodcasts();
    } catch (error) {
      console.error("Error deleting podcast:", error);
    }
  };

  const deleteRsvp = async (name) => {
    try {
      await fetch(`${BACKEND_URL}/rsvps/${name}`, {
        method: 'DELETE'
      });
      loadRsvps();
    } catch (error) {
      console.error("Error deleting rsvp:", error);
    }
  };

  useEffect(() => {
    loadPodcasts();
    loadRsvps();
  }, []);

  const fetchAbouts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/abouts`);
      const data = await response.json();
      setAbouts(data);
    } catch (error) {
      console.error("Error fetching abouts:", error);
    }
  };

  const addAbout = async () => {
    try {
      await fetch(`${BACKEND_URL}/abouts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAbout)
      });
      fetchAbouts();
      setNewAbout({ title: '', image: '', text: '' });
    } catch (error) {
      console.error("Error adding about:", error);
    }
  };

  const deleteAbout = async (user) => {
    try {
      await fetch(`${BACKEND_URL}/abouts/${user}`, {
        method: 'DELETE'
      });
      fetchAbouts();
    } catch (error) {
      console.error("Error deleting about:", error);
    }
  };

  useEffect(() => {
    fetchAbouts();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/testimonials`);
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const addTestimonial = async () => {
    try {
      await fetch(`${BACKEND_URL}/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTestimonial)
      });
      fetchTestimonials();
      setNewTestimonial({ user: '', text: '', company: '', image: '' });
    } catch (error) {
      console.error("Error adding testimonial:", error);
    }
  };

  const deleteTestimonial = async (user) => {
    try {
      await fetch(`${BACKEND_URL}/testimonials/${user}`, {
        method: 'DELETE'
      });
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
  
    <div className="tracking-wide bg-green-700 py-8">
  {/* Sponsors Section */}
  <h2 className="text-3xl text-center font-semibold text-white my-10">Partners</h2>
  <div className="flex flex-wrap justify-center">
    {sponsors.map((sponsor, index) => (
      <div key={index} className="item-card bg-green-700 p-4 m-2 rounded-lg shadow-md">
        <img src={sponsor.logo} alt={sponsor.name} className="w-full h-20 object-contain mb-2" />
        <h4 className="text-lg font-medium">{sponsor.name}</h4>
        <p className="text-sm">{sponsor.description}</p>
        <a href={sponsor.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mr-9">Visit</a>
        <button onClick={() => deleteSponsor(sponsor.name )} className="text-red-500 mt-2">Delete</button>
      </div>
    ))}
  </div>
  <form onSubmit={addSponsor} className="mt-8">
    <div className="flex flex-col sm:flex-col gap-4 mb-4 items-center text-black">
      <input type="text" placeholder="Sponsor Name" className="px-4 py-2 rounded-md w-8/12"  
      value={newSponsor.name} 
      onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })}
           />
      <input type="url" placeholder="Sponsor Logo URL" className="px-4 py-2 rounded-md w-8/12"  
      value={newSponsor.logo}
      onChange={(e) => setNewSponsor({ ...newSponsor, logo: e.target.value })}
           />
      <input type="text" placeholder="Sponsor Description" className="px-4 py-2 rounded-md w-8/12" 
      value={newSponsor.description}
      onChange={(e) => setNewSponsor({ ...newSponsor, description: e.target.value })}
            />
      <input type="url" placeholder="Sponsor Link" className="px-4 py-2 rounded-md w-8/12"  
      value={newSponsor.link}
      onChange={(e) => setNewSponsor({ ...newSponsor, link: e.target.value })}
           />
      <button onClick={addSponsor} type="submit" className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300">Add Sponsor</button>
    </div>
  </form>

  {/* Shows Section */}
  <h2 className="text-3xl text-center font-semibold text-white my-10">Shows</h2>
  <div className="flex flex-wrap justify-center">
    {shows.map((show, index) => (
      <div key={index} className="item-card bg-green-700 p-4 m-2 rounded-lg shadow-md">
         <iframe
    src={
      show.video.includes("youtube.com") || show.video.includes("youtu.be")
        ? `https://www.youtube.com/embed/${show.video.split("/").pop()}`
        : show.video
    }
    title="YouTube video"
    className=" w-60 h-60 object-contain mb-2"
    frameBorder="0"
    allow="autoplay; encrypted-media"
    allowFullScreen
  ></iframe>
        <h4 className="text-lg font-medium">{show.title}</h4>
        <p className="text-sm">{show.subtitle}</p>
        
        <button onClick={() => deleteShow(show.title)} className="text-red-500 mt-2">Delete</button>
      </div>
    ))}
  </div>
  <form className="mt-8 text-black">
    <div className="flex flex-col sm:flex-col gap-4 mb-4 items-center">
      <input type="text" placeholder="Show Title" className="px-4 py-2 rounded-md w-120"
            value={newShow.title} 
      onChange={(e) => setNewShow({ ...newShow, title: e.target.value })} />
      <input type="text" placeholder="Show Subtitle" className="px-4 py-2 rounded-md w-120" 
            value={newShow.subtitle} 
      onChange={(e) => setNewShow({ ...newShow, subtitle: e.target.value })}/>
      <input type="text" placeholder="Show link" className="px-4 py-2 rounded-md w-120" 
        value={newShow.link} 
       onChange={(e) => setNewShow({ ...newShow, link: e.target.value })}/>   
      <input type="text" placeholder="Show video link" className="px-4 py-2 rounded-md w-120" 
            value={newShow.video} 
      onChange={(e) => setNewShow({ ...newShow, video: e.target.value })}/>
      <textarea type="text" placeholder="Show text" className="px-4 py-2 rounded-md w-7/12" 
            value={newShow.text} 
      onChange={(e) => setNewShow({ ...newShow, text: e.target.value })}/>
      <button onClick={addShow} type="submit" className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300">Add Show</button>

    </div>
  </form>

  {/* Podcasts Section */}
  <h2 className="text-3xl text-center font-semibold text-white my-10">Podcasts</h2>
  <div className="flex flex-wrap justify-center">
    {podcasts.map((podcast, index) => (
      <div key={index} className="item-card bg-green-950 p-4 m-2 rounded-lg shadow-md">
        <h4 className="text-lg font-medium">{podcast.title}</h4>
        <p className="text-sm">{podcast.description}</p>
        <p className="text-sm">{podcast.date}</p>
        <p className="text-sm">{podcast.spotify}</p>
        <p className="text-sm">{podcast.apple}</p>
        <p className="text-sm">{podcast.google}</p>
        
        <img src={podcast.thumbnail} alt={podcast.title} className="w-full h-20 object-contain mb-2" />
        <button onClick={() => deletePodcast(podcast.title)} className="text-red-500 mt-2">Delete</button>
      </div>
    ))}
  </div>
  <form  className="mt-8">
    <div className="flex flex-col sm:flex-col items-center gap-4 mb-4 text-black">
      <input type="text" placeholder="Podcast Title" className="px-4 py-2 rounded-md w-7/12"
       value={newPodcast.title} 
      onChange={(e) => setNewPodcast({ ...newPodcast, title: e.target.value })} />
      <input type="text" placeholder="Podcast date" className="px-4 py-2 rounded-md w-7/12"
       value={newPodcast.date} 
      onChange={(e) => setNewPodcast({ ...newPodcast, date: e.target.value })} />
      <input type="text" placeholder="Podcast thumbnail" className="px-4 py-2 rounded-md w-7/12"
       value={newPodcast.thumbnail} 
      onChange={(e) => setNewPodcast({ ...newPodcast, thumbnail: e.target.value })} />
      <input type="text" placeholder="Podcast platform spotify" className="px-4 py-2 rounded-md w-7/12"
       value={newPodcast.spotify} 
      onChange={(e) => setNewPodcast({ ...newPodcast, spotify: e.target.value })} />
      <input type="text" placeholder="Podcast platform apple" className="px-4 py-2 rounded-md w-7/12"
       value={newPodcast.apple} 
      onChange={(e) => setNewPodcast({ ...newPodcast, apple: e.target.value })} />
      <input type="text" placeholder="Podcast platform google" className="px-4 py-2 rounded-md w-7/12"
       value={newPodcast.google} 
      onChange={(e) => setNewPodcast({ ...newPodcast, google: e.target.value })} />
      <textarea placeholder="Podcast Description" className="px-4 py-2 rounded-md w-7/12"
            value={newPodcast.description} 
            onChange={(e) => setNewPodcast({ ...newPodcast, description: e.target.value })} ></textarea>
      <button onClick={addPodcast} type="submit" className="items-center px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300">Add Podcast</button>

    </div>
  </form>

  {/* Abouts Section */}
  <h2 className="text-3xl text-center font-semibold text-white my-10">Abouts</h2>
  <div className="flex flex-wrap justify-center">
    {abouts.map((about, index) => (
      <div key={index} className="item-card bg-green-700 p-4 m-2 rounded-lg shadow-md">
        <h4 className="text-lg font-medium">{about.title}</h4>
        <p className="text-sm text-wrap">{about.text}</p>
        <img src={about.image} alt={about.title} className="w-full h-20 object-contain mb-2" />
        <button onClick={() => deleteAbout(about.title)} className="text-red-500 mt-2">Delete</button>
      </div>
    ))}
  </div>
  <form  className="mt-8">
    <div className="flex flex-col sm:flex-col gap-4 mb-4 items-center text-black">
      <input type="text" placeholder="About Title" className="px-4 py-2 rounded-md w-8/12"   
      value={newAbout.title} 
      onChange={(e) => setNewAbout({ ...newAbout, title: e.target.value })}/>
      <input type="text" placeholder="About Image" className="px-4 py-2 rounded-md w-8/12"   
      value={newAbout.image} 
      onChange={(e) => setNewAbout({ ...newAbout, image: e.target.value })}/>
      <textarea placeholder="About Text" className="px-4 py-2 rounded-md w-8/12"  
      value={newAbout.text} 
      onChange={(e) => setNewAbout({ ...newAbout, text: e.target.value })}></textarea>
      <button onClick={addAbout} type="submit" className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300">Add About</button>

    </div>
     </form>
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        What People are saying
      </h2>
      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2">
            <div className="rounded-md p-6 text-md font-thin bg-green-950">
              <p className="mb-6">{testimonial.text}</p>
              <div className="flex items-start mt-8">
                <img
                  className="w-12 h-12 mr-6 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.user}
                  style={{
                    border: `2px solid`,
                  }}
                />
                <div>
                  <h6 className="font-medium">{testimonial.user}</h6>
                  <span className="text-sm font-normal italic">{testimonial.company}</span>
                </div>
              </div>
            </div>
            <button onClick={() => deleteTestimonial(testimonial.user)} className="mt-2 text-red-500">
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Form to add a new testimonial */}
      <div className="mt-8 text-center">
        <h3 className="text-2xl font-medium text-white mb-4">Add a Testimonial</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="User"
            value={newTestimonial.user}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, user: e.target.value })}
            className="px-4 py-2 rounded-md text-black"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Testimonial text"
            value={newTestimonial.text}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })}
            className="px-4 py-2 rounded-md text-black w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Company"
            value={newTestimonial.company}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
            className="px-4 py-2 rounded-md text-black"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Image URL"
            value={newTestimonial.image}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, image: e.target.value })}
            className="px-4 py-2 rounded-md text-black"
          />
        </div>
        <button onClick={addTestimonial} className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300">
          Add Testimonial
        </button>
      </div>
            {/* Event List Section */}
            <div className="w-screen  px-6 py-12 ">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-customlightBrown p-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex flex-col"
            >
              <h3 className="text-2xl font-semibold mb-4">{event.Name}</h3>
              <div className="mb-4">
                <p className="text-sm mb-2"><strong>Date:</strong> {event.Date}</p>
                <p className="text-sm mb-2"><strong>About:</strong> {event.About}</p>
                <p className="text-sm mb-2"><strong>Guests:</strong> {event.Guests.join(", ")}</p>
                <p className="text-sm mb-2"><strong>Time:</strong> {event.Time.join(", ")}</p>
                <p className="text-sm"><strong>Activities:</strong> {event.Activities.join(", ")}</p>
              </div>
              <button onClick={() => deleteEvent(event.Name)} className="mt-2 text-red-500">
              Delete
            </button>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
        <h3 className="text-2xl font-medium text-white mb-4">Add a Event</h3>
      
        <h2>
  Guests: {newEvent.guest.length > 0 ? newEvent.guest.join(", ") : "No guests added yet"}
</h2>
<h2>
  Activities: {newEvent.activities.length > 0 ? newEvent.activities.join(", ") : "No activities added yet"}
</h2>
<h2>
  Schedule: {newEvent.time.length > 0 ? newEvent.time.join(", ") : "No Schedule added yet"}
</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            className="px-4 py-2 rounded-md text-black"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="About"
            value={newEvent.about}
            onChange={(e) => setNewEvent({ ...newEvent, about: e.target.value })}
            className="px-4 py-2 rounded-md text-black w-full"
          />
        </div>
        <div className="mb-4 flex gap-4">
          <input
            type="text"
            placeholder="Add Activity"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="px-4 py-2 rounded-md text-black flex-1"
          />
          <button
            onClick={() => addToArray('activities')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add
          </button>
        </div>
      
        <div className="mb-4 flex gap-4">
          <input
            type="text"
            placeholder="Add Schedule"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="px-4 py-2 rounded-md text-black flex-1"
          />
          <button
            onClick={() => addToArray('time')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add
          </button>
        </div>
        <div className="mb-4 flex gap-4">
          <input
            type="text"
            placeholder="Add Guest"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="px-4 py-2 rounded-md text-black flex-1"
          />
          <button
            onClick={() => addToArray('guest')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add
          </button>
        </div>
        <div className="mb-4">
          <input
            type="date"
            onChange={handleDateChange}
            className="px-4 py-2 rounded-md text-black"
          />
        </div>
        <button
          onClick={addEvent}
          className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300"
        >
          Add Event
        </button>
      </div>
      </div>

      <div className="rsvp-list">
      {Object.keys(groupedRsvps).map((groupId) => (
        <div key={groupId} className="rsvp-group border p-4 mb-4 rounded">
          {/* Group Header */}
          <h2 className="text-xl font-bold mb-3">Group ID: {groupId}</h2>

          {/* List of RSVPs in this group */}
          <ul className="list-disc pl-6">
            {groupedRsvps[groupId].map((rsvp) => (
              <li key={rsvp.name} className="mb-2">
                <p><strong>Name:</strong> {rsvp.name}</p>
                <p><strong>Phone:</strong> {rsvp.phone}</p>
                <p><strong>Email:</strong> {rsvp.email}</p>
                <button onClick={() => deleteRsvp(rsvp.name)} className="mt-2 text-red-500">
              Delete
            </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    </div>
 

    
    
  );
};

export default Dashboard;
