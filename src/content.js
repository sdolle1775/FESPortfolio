import marvelImage from '../assets/projects/marvel.jpg';
import netflixImage from '../assets/projects/netflix.jpg';
import summaristImage from '../assets/projects/summarist.jpg';
import skinstricImage from '../assets/projects/skinstric.jpg';

export const profile = {
  name: 'Samuel Dolle',
  firstName: 'Sam',
  role: 'frontend software engineer',
  intro: 'with a passion for building responsive, performant web applications and thoughtful user experiences.',
  email: 'sam_dolle@outlook.com',
  github: 'https://github.com/sdolle1775',
  linkedin: 'https://www.linkedin.com/in/sam-dolle-58072537a/',
  // Add the URL of your real resume when it is ready. The starter PDF is a sample.
  resume: '',
};

export const skills = [
  { name: 'HTML', mark: '5', className: 'html' },
  { name: 'CSS', mark: '3', className: 'css' },
  { name: 'JavaScript', mark: 'JS', className: 'javascript' },
  { name: 'TypeScript', mark: 'TS', className: 'typescript' },
  { name: 'React', icon: 'react', className: 'react' },
  { name: 'Tailwind CSS', mark: '≈', className: 'tailwind' },
  { name: 'Bootstrap', mark: 'B', className: 'bootstrap' },
  { name: 'Python', icon: 'filetype-py', className: 'python' },
];

export const projects = [
  {
    id: 'marvel',
    name: 'Marvel Champions Digital',
    category: 'Community development',
    technologies: ['Python', 'TypeScript', 'HTML & CSS'],
    description: 'A community build of Marvel LCG Digital, extending the original Irefrixs project with campaign support, new content, gameplay corrections, and interface improvements.',
    image: marvelImage,
    imageAlt: 'Gameplay screenshot from the Marvel LCG Digital repository',
    repository: 'https://github.com/sdolle1775/marvel-lcg',
    live: '',
    note: 'Live demo coming soon',
  },
  {
    id: 'netflix',
    name: 'Netflix Clone',
    category: 'Movie discovery',
    technologies: ['React', 'Firebase', 'TMDB API'],
    description: 'A Netflix-inspired movie browsing experience with Firebase authentication, movie data from TMDB, and a responsive interface built with React and Vite.',
    image: netflixImage,
    imageAlt: 'Sign-in page of Samuel’s Netflix Clone project',
    repository: 'https://github.com/sdolle1775/NetflixClone',
    live: 'https://netflix-clone-samdolle.vercel.app',
  },
  {
    id: 'summarist',
    name: 'Summarist',
    category: 'Reading & listening',
    technologies: ['React', 'TypeScript', 'REST APIs'],
    description: 'A book-summary platform with searchable collections, book detail pages, an audiobook player, and complete demo account and subscription flows.',
    image: summaristImage,
    imageAlt: 'Summarist landing page with its book-summary illustration',
    repository: 'https://github.com/sdolle1775/FESProject_Summarist',
    live: 'https://summarist-opal-ten.vercel.app',
  },
  {
    id: 'skinstric',
    name: 'Skinstric',
    category: 'Frontend internship',
    technologies: ['React', 'Tailwind CSS', 'Browser APIs'],
    description: 'An interactive skincare interface with a guided onboarding flow, image upload, camera capture, and an editable results dashboard using simulated analysis data.',
    image: skinstricImage,
    imageAlt: 'Minimal Skinstric landing page with Sophisticated skincare headline',
    repository: 'https://github.com/sdolle1775/skinstric-internship',
    live: 'https://skinstric-internship-zeta.vercel.app',
  },
];
