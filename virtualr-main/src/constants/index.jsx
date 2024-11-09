import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";
import { useEffect, useState } from 'react';

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Show", href: "#Show" },
  { label: "About Us", href: "#About" },
  { label: "Sponsors", href: "#Sponsors" },
  { label: "Podcasts", href: "#Podcasts" },
  { label: "Contact Us", href: "#Contact" },
  { label: "Testimonials", href: "#Testimonial" },
];


const loadColors = async () => {
  const response = await fetch('/src/assets/color.txt');
  const text = await response.text();

  const colorLines = text.split('\n').filter(line => line);

  const colors = {};
  colorLines.forEach(line => {
    const [key, value] = line.split(':').map(part => part.trim());
    if (key && value) {
      colors[key] = value.replace(/['"]/g, ''); // Remove quotes if any
    }
  });
  
  return colors;
};

export const useColors = () => {
  const [colors, setColors] = useState({});

  useEffect(() => {
    
    loadColors().then(fetchedColors => setColors(fetchedColors));
  }, []);
    console.log("Raw file content:", colors);
  return colors;
};
const loadTestimonials = async () => {
  try {
    const response = await fetch('/src/assets/testimonials.txt');
    const text = await response.text();
    const testimonialLines = text.split('\n').filter(line => line.trim()); // Filter out any empty lines

    const testimonials = testimonialLines.map(line => {
      const parts = line.split('|').reduce((acc, part) => {
        // Split only at the first colon to capture the key and full value, including URLs
        const [key, ...valueParts] = part.split(':');
        const value = valueParts.join(':').trim().replace(/['"]/g, ''); // Join value parts back to avoid cutting URLs
        acc[key.trim()] = value;
        return acc;
      }, {});

      return {
        user: parts.user,
        company: parts.company,
        image: parts.image,
        text: parts.text,
      };
    });

    console.log("Parsed Testimonials:", testimonials); // Log to check the output
    return testimonials;
  } catch (error) {
    console.error("Error loading testimonials:", error);
    return []; // Return an empty array if there's an error
  }
};


export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);


  useEffect(() => {
    loadTestimonials().then(fetchedTestimonials => {
      setTestimonials(fetchedTestimonials);
    });
  }, []);

  return testimonials;
};

const loadPodcasts = async () => {
  try {
    const response = await fetch('/src/assets/podcast.txt');
    const text = await response.text();
    const podcastLines = text.split('\n').filter(line => line.trim());

    const podcasts = podcastLines.map(line => {
      const parts = line.split('|').reduce((acc, part) => {
        const [key, ...valueParts] = part.split(':');
        const value = valueParts.join(':').trim().replace(/['"]/g, '');

        // Handling nested platforms object
        if (key.trim() === 'platforms') {
          const platforms = value
            .replace('{', '')
            .replace('}', '')
            .split('|')
            .reduce((platformAcc, platformPart) => {
              const [platformKey, platformValue] = platformPart.split(':');
              platformAcc[platformKey.trim()] = platformValue.trim().replace(/['"]/g, '');
              return platformAcc;
            }, {});
          acc[key.trim()] = platforms;
        } else {
          acc[key.trim()] = value;
        }
        return acc;
      }, {});

      return {
        title: parts.title,
        description: parts.description,
        date: parts.date,
        thumbnail: parts.thumbnail,
        platforms: parts.platforms,
      };
    });

    console.log("Parsed Podcasts:", podcasts);
    return podcasts;
  } catch (error) {
    console.error("Error loading podcasts:", error);
    return [];
  }
};



export const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);


  useEffect(() => {
    loadPodcasts().then(fetchedPodcasts => {
      setPodcasts(fetchedPodcasts);
    });
  }, []);

  return podcasts;
};

export const colors = {
  primaryBrown: "#45392C",       // Navbar, darker elements
  primaryOlive: "#3B4537",       // Text color
  accentBeige: "#D1B692",        // Card background or header text
  accentWarmBrown: "#A67C52",    // Button, link color
  backgroundLight: "#F5EFE7",    // Main background color
};

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Drag-and-Drop Interface",
    description:
      "Easily design and arrange your VR environments with a user-friendly drag-and-drop interface.",
  },
  {
    icon: <Fingerprint />,
    text: "Multi-Platform Compatibility",
    description:
      "Build VR applications that run seamlessly across multiple platforms, including mobile, desktop, and VR headsets.",
  },
  {
    icon: <ShieldHalf />,
    text: "Built-in Templates",
    description:
      "Jumpstart your VR projects with a variety of built-in templates for different types of applications and environments.",
  },
  {
    icon: <BatteryCharging />,
    text: "Real-Time Preview",
    description:
      "Preview your VR application in real-time as you make changes, allowing for quick iterations and adjustments.",
  },
  {
    icon: <PlugZap />,
    text: "Collaboration Tools",
    description:
      "Work together with your team in real-time on VR projects, enabling seamless collaboration and idea sharing.",
  },
  {
    icon: <GlobeLock />,
    text: "Analytics Dashboard",
    description:
      "Gain valuable insights into user interactions and behavior within your VR applications with an integrated analytics dashboard.",
  },
];

export const checklistItems = [
  {
    title: "Code merge made easy",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Review code without worry",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "AI Assistance to reduce time",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Share work in minutes",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
