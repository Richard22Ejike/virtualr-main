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
