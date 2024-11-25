const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;
const cors = require("cors");
app.use(
    cors({
      origin: ["http://localhost:5173", "https://rsvp-nbhy.onrender.com","https://rsvp-dashboard-dbl9.onrender.com", "https://virtualr-main.onrender.com",],
      credentials: true,
    })
  );

app.use(express.json());

const filePath = './podcast.txt';
const testimonialFilePath = './testimonials.txt';
const sponsorFilePath = './sponsors.txt';
const showFilePath= './show.txt';
const aboutFilePath = './about.txt';
const eventFilePath = './event.txt';
const rsvpFilePath = './rsvp.txt';


// Get all rsvps
app.get('/rsvps', (req, res) => {

  fs.readFile(rsvpFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const rsvps = data
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.split('|').reduce((acc, part) => {
        const [key, ...valueParts] = part.split(':');
        const value = valueParts.join(':').trim();
        acc[key.trim()] = value.replace(/['"]/g, '');
        return acc;
      }, {}));
    res.json(rsvps);
  });
});

// Add a new testimonial
app.post('/rsvps', (req, res) => {
  const newRsvp = req.body;
  const rsvpLine = `name: "${newRsvp.name}" | phone: "${newRsvp.phone}" | email: "${newRsvp.email}" | id: "${newRsvp.id}" \n`;

  fs.appendFile(rsvpFilePath, `${rsvpLine}`, err => {
    if (err) return res.status(500).send('Error adding rsvp');
    res.send('Rsvp added successfully');
  });
});

// Delete a testimonial by user name
app.delete('/rsvps/:name', (req, res) => {
  const nameToDelete = req.params.name;

  fs.readFile(rsvpFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error reading file');
    }

    // Split the file into lines (assuming each RSVP is on a new line)
    const lines = data.split('\n');

    // Find the index of the first line that contains the `name`
    const indexToDelete = lines.findIndex(line => line.includes(`name: "${nameToDelete}"`));

    // If the RSVP with the name is not found
    if (indexToDelete === -1) {
      return res.status(404).send('RSVP not found');
    }

    // Remove only the first matching RSVP
    lines.splice(indexToDelete, 1);

    // Write the updated lines back to the file
    fs.writeFile(rsvpFilePath, lines.join('\n'), err => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Error deleting RSVP');
      }

      res.send('RSVP deleted successfully');
    });
  });
});

// Get all events// Get all events
// Get all events
app.get('/events', (req, res) => {
  fs.readFile(eventFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');

    try {
      const events = [];
      
      // Split the file by event "Name"
      const eventBlocks = data.split(/\n(?=Name:)/); // Split by lines that start with "Name:" (using lookahead)

      eventBlocks.forEach(block => {
        if (block.trim()) {
          const eventObj = {};
          const lines = block.split('\n'); // Split the block into individual lines

          // Process each line in the block
          lines.forEach(line => {
            const [key, ...valueParts] = line.split(':'); // Split line by ":"
            if (key && valueParts.length) {
              const formattedKey = key.trim(); // Clean the key
              const formattedValue = valueParts.join(':').trim().replace(/['"]/g, ''); // Clean the value (remove quotes)

              // Handle specific fields
              if (formattedKey === 'Activities' || formattedKey === 'Guests') {
                eventObj[formattedKey] = formattedValue.split(',').map(a => a.trim());
              } else if (formattedKey === 'Time') {
                eventObj[formattedKey] = formattedValue.split(',').map(t => t.trim());
              } else {
                eventObj[formattedKey] = formattedValue; // General case for other fields
              }
            }
          });

         // Log the event object for debugging
          // Add the event to the list
          events.push(eventObj);
        }
      });
    
      // Send the parsed events as JSON
      res.json(events);
    } catch (error) {
      res.status(500).send('Error processing file data');
    }
  });
});

app.post('/events', (req, res) => {
  const newEvent = req.body;
 console.log(newEvent);
  // Use default values for undefined fields
  const name = newEvent.name || 'Untitled Event';
  const activities = Array.isArray(newEvent.activities) ? newEvent.activities.join(', ') : 'No activities';
  const about = newEvent.about || 'No description';
  const time = Array.isArray(newEvent.time) ? newEvent.time.join(', ') : 'No time specified';
  const guest = Array.isArray(newEvent.guest) ? newEvent.guest.join(', ') : 'No guests';
  const date = newEvent.date || 'No date';

  const eventLine = `Name: "${name}"\nActivities: "${activities}"\nAbout: "${about}"\nTime: "${time}"\nGuests: "${guest}"\nDate: "${date}"\n\n`;

  // Append to file
  fs.appendFile(eventFilePath, eventLine, err => {
    if (err) return res.status(500).send('Error adding event');
    res.send('Event added successfully');
  });
});

app.delete('/events/:name', (req, res) => {
  const eventNameToDelete = req.params.name;

  fs.readFile(eventFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');

    const eventBlocks = data.split(/\n(?=Name:)/);
    const filteredBlocks = eventBlocks.filter(block => !block.includes(`Name: "${eventNameToDelete}"`));

    fs.writeFile(eventFilePath, filteredBlocks.join('\n'), err => {
      if (err) return res.status(500).send('Error deleting event');
      res.send('Event deleted successfully');
    });
  });
});



// Get all abouts
app.get('/abouts', (req, res) => {

    fs.readFile(aboutFilePath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error reading file');
      const abouts = data
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.split('|').reduce((acc, part) => {
          const [key, ...valueParts] = part.split(':');
          const value = valueParts.join(':').trim();
          acc[key.trim()] = value.replace(/['"]/g, '');
          return acc;
        }, {}));
      res.json(abouts);
    });
  });
  
  // Add a new testimonial
  app.post('/abouts', (req, res) => {
    const newAbout = req.body;
    const aboutLine = `title: "${newAbout.title}" | image: "${newAbout.image}" | text: "${newAbout.text}" \n`;
  
    fs.appendFile(aboutFilePath, `${aboutLine}`, err => {
      if (err) return res.status(500).send('Error adding about');
      res.send('About added successfully');
    });
  });
  
  // Delete a testimonial by user name
  app.delete('/abouts/:title', (req, res) => {
    const nameToDelete = req.params.title;

    console.log(nameToDelete)
    fs.readFile(aboutFilePath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error reading file');
      
      // Parse the data into an array (assuming each testimonial is on a new line)
      const lines = data.split('\n');
    
      // Filter out the testimonial by user (ensure the format matches)
      const filteredLines = lines.filter(line => !line.includes(`title: "${nameToDelete}"`));
    
      fs.writeFile(aboutFilePath, filteredLines.join('\n'), err => {
        if (err) return res.status(500).send('Error deleting about');
        res.send('About deleted successfully');
      });
    });
  });

// Get all shows
app.get('/shows', (req, res) => {

    fs.readFile(showFilePath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error reading file');
      const shows = data
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.split('|').reduce((acc, part) => {
          const [key, ...valueParts] = part.split(':');
          const value = valueParts.join(':').trim();
          acc[key.trim()] = value.replace(/['"]/g, '');
          return acc;
        }, {}));
    
      res.json(shows);
    });
  });
  
  // Add a new testimonial
  app.post('/shows', (req, res) => {
    const newShow = req.body;
    const showLine = `video: "${newShow.video}"| title: "${newShow.title}"| link: "${newShow.link}"| subtitle: "${newShow.subtitle}"| text: "${newShow.text}" \n`;
  
    fs.appendFile(showFilePath, `${showLine}`, err => {
      if (err) return res.status(500).send('Error adding show');
      res.send('Show added successfully');
    });
  });
  
  // Delete a testimonial by user name
  app.delete('/shows/:title', (req, res) => {
    const nameToDelete = req.params.title;
    console.log('hi')
    console.log(nameToDelete)
    fs.readFile(showFilePath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error reading file');
      
      // Parse the data into an array (assuming each testimonial is on a new line)
      const lines = data.split('\n');
    
      // Filter out the testimonial by user (ensure the format matches)
      const filteredLines = lines.filter(line => !line.includes(`title: "${nameToDelete}"`));
    
      fs.writeFile(showFilePath, filteredLines.join('\n'), err => {
        if (err) return res.status(500).send('Error deleting show');
        res.send('Show deleted successfully');
      });
    });
  });


// Get all sponsors
app.get('/sponsors', (req, res) => {
    fs.readFile(sponsorFilePath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error reading file');
      const sponsors = data
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.split('|').reduce((acc, part) => {
          const [key, ...valueParts] = part.split(':');
          const value = valueParts.join(':').trim();
          acc[key.trim()] = value.replace(/['"]/g, '');
          return acc;
        }, {}));
    
      res.json(sponsors);
    });
  });
  
  // Add a new testimonial
  app.post('/sponsors', (req, res) => {
    const newSponsor = req.body;
    const sponsorLine = `logo: "${newSponsor.logo}"| name: "${newSponsor.name}"| link: "${newSponsor.link}"| description: "${newSponsor.description}" \n`;
    console.log(newSponsor.logo)
    fs.appendFile(sponsorFilePath, `${sponsorLine}`, err => {
      if (err) return res.status(500).send('Error adding sponsor');
      res.send('Sponsor added successfully');
    });
  });
  
  // Delete a testimonial by user name
  app.delete('/sponsors/:name', (req, res) => {
    const nameToDelete = req.params.name;
    console.log('hi')
    console.log(nameToDelete)
    fs.readFile(sponsorFilePath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error reading file');
      
      // Parse the data into an array (assuming each testimonial is on a new line)
      const lines = data.split('\n');
    
      // Filter out the testimonial by user (ensure the format matches)
      const filteredLines = lines.filter(line => !line.includes(`name: "${nameToDelete}"`));
    
      fs.writeFile(sponsorFilePath, filteredLines.join('\n'), err => {
        if (err) return res.status(500).send('Error deleting sponsor');
        res.send('Sponsor deleted successfully');
      });
    });
  });



// Get all testimonials
app.get('/testimonials', (req, res) => {
  fs.readFile(testimonialFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const testimonials = data
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.split('|').reduce((acc, part) => {
        const [key, ...valueParts] = part.split(':');
        const value = valueParts.join(':').trim();
        acc[key.trim()] = value.replace(/['"]/g, '');
        return acc;
      }, {}));
    res.json(testimonials);
  });
});

// Add a new testimonial
app.post('/testimonials', (req, res) => {
  const newTestimonial = req.body;
  const testimonialLine = `user: "${newTestimonial.user}" | company: "${newTestimonial.company}" | image: "${newTestimonial.image}"  | text: "${newTestimonial.text}" \n`;

  fs.appendFile(testimonialFilePath, `${testimonialLine}`, err => {
    if (err) return res.status(500).send('Error adding testimonial');
    res.send('Testimonial added successfully');
  });
});

// Delete a testimonial by user name
app.delete('/testimonials/:user', (req, res) => {
  const userToDelete = req.params.user;
  console.log('hi')
  console.log(userToDelete)
  fs.readFile(testimonialFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    
    // Parse the data into an array (assuming each testimonial is on a new line)
    const lines = data.split('\n');
  
    // Filter out the testimonial by user (ensure the format matches)
    const filteredLines = lines.filter(line => !line.includes(`user: "${userToDelete}"`));
  
    fs.writeFile(testimonialFilePath, filteredLines.join('\n'), err => {
      if (err) return res.status(500).send('Error deleting testimonial');
      res.send('Testimonial deleted successfully');
    });
  });
});
// Get all podcasts
app.get('/podcasts', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading file');

        const podcasts = data
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.split('|').reduce((acc, part) => {
          const [key, ...valueParts] = part.split(':');
          const value = valueParts.join(':').trim();
          acc[key.trim()] = value.replace(/['"]/g, '');
          return acc;
        }, {}));
        res.json(podcasts);
    });
});

// Add a new podcast
app.post('/podcasts', (req, res) => {
  const newPodcast = req.body;
  const podcastLine = `title: "${newPodcast.title}"| description: "${newPodcast.description}"| date: "${newPodcast.date}"| thumbnail: "${newPodcast.thumbnail}" | google: "${newPodcast.google}" | spotify: "${newPodcast.spotify}"| apple: "${newPodcast.apple}" \n`;
   console.log('add product m')
  fs.appendFile(filePath, `\n${podcastLine}`, err => {
    if (err) return res.status(500).send('Error adding podcast');
    res.send('Podcast added successfully');
  });
});

// Delete a podcast by title
app.delete('/podcasts/:title', (req, res) => {
  const titleToDelete = req.params.title;
  console.log(titleToDelete)
  console.log('detele podcast')
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');

    // Parse the data into an array (assuming each testimonial is on a new line)
    const lines = data.split('\n');
  
    // Filter out the testimonial by user (ensure the format matches)
    const filteredLines = lines.filter(line => !line.includes(`title: "${titleToDelete}"`));
  
  
      fs.writeFile(filePath, filteredLines.join('\n'), err => {
      if (err) return res.status(500).send('Error deleting podcast');
      res.send('Podcast deleted successfully');
    });
  });
});

app.listen(PORT, "0.0.0.0", () => console.log(`Server Port: ${PORT} connected`));
