import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Form, Modal, Offcanvas, Spinner } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import { profile, projects, skills } from './content.js';

function Icon({ name, className = '' }) {
  if (name === 'react') return <svg width="42" height="42" viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><circle r="1.8" fill="currentColor" stroke="none" /><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></svg>;
  return <i className={`bi bi-${name} ${className}`} aria-hidden="true" />;
}

function SocialLinks({ openContact, footer = false }) {
  const links = [
    { name: 'LinkedIn', icon: 'linkedin', href: profile.linkedin },
    { name: 'GitHub', icon: 'github', href: profile.github },
    ...(profile.resume ? [{ name: 'Resume', icon: 'file-earmark-pdf', href: profile.resume }] : []),
  ];
  return <div className={footer ? 'footer-links tw:flex tw:items-center tw:justify-center tw:gap-8' : 'social-links tw:flex tw:items-center tw:gap-3'}>
    {links.map((link, index) => <a key={link.name} className={footer ? 'underline-link' : 'social-link entrance'}
      style={{ '--delay': `${650 + index * 100}ms` }} href={link.href} target="_blank" rel="noreferrer" aria-label={`${profile.name} on ${link.name} (opens in a new tab)`}>
      {footer ? link.name : <Icon name={link.icon} />}
    </a>)}
    <button className={footer ? 'plain-button underline-link' : 'social-link entrance'} style={{ '--delay': '850ms' }}
      onClick={openContact} aria-label="Contact Samuel">{footer ? 'Contact' : <Icon name="envelope" />}</button>
  </div>;
}

function Coffee() {
  const cup = useRef(null);
  const [stirring, setStirring] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  function move(event) {
    const box = event.currentTarget.getBoundingClientRect();
    cup.current.style.setProperty('--tilt-x', `${((event.clientX - box.left) / box.width - 0.5) * 8}deg`);
    cup.current.style.setProperty('--tilt-y', `${((event.clientY - box.top) / box.height - 0.5) * -8}deg`);
  }
  function reset() {
    cup.current.style.setProperty('--tilt-x', '0deg');
    cup.current.style.setProperty('--tilt-y', '0deg');
  }
  return <div className="coffee-scene entrance" style={{ '--delay': '400ms' }}>
    <button className={`coffee-interaction ${stirring ? 'is-stirring' : ''}`} aria-label="Stir the coffee"
      onPointerMove={move} onPointerLeave={reset} onBlur={reset}
      onClick={() => { clearTimeout(timer.current); setStirring(true); timer.current = setTimeout(() => setStirring(false), 1200); }}>
      <div className="coffee-object" ref={cup} aria-hidden="true">
        <div className="steam">{Array.from({ length: 8 }, (_, i) => <span key={i} style={{ '--i': i }} />)}</div>
        <div className="saucer" /><div className="cup-handle" />
        <div className="cup-body"><span className="cup-monogram">SD<span>.</span></span></div>
        <div className="cup-rim"><div className="coffee-liquid" /></div>
      </div>
    </button>
  </div>;
}

function Skills() {
  return <ul className="skills tw:grid tw:grid-cols-4 tw:gap-x-4 tw:gap-y-7">
    {skills.map(skill => <li key={skill.name} className="skill" tabIndex={0} aria-label={skill.name}>
      <span className={`skill-mark ${skill.className}`} aria-hidden="true">{skill.icon ? <Icon name={skill.icon} /> : skill.mark}</span>
      <span className="skill-label">{skill.name}</span>
    </li>)}
  </ul>;
}

function ContactForm() {
  const [validated, setValidated] = useState(false);
  const [status, setStatus] = useState('idle');
  const form = useRef(null);
  const config = {
    service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    key: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  };
  const canSend = Boolean(config.service && config.template && config.key);

  async function submit(event) {
    event.preventDefault();
    if (!form.current.checkValidity()) {
      setValidated(true);
      form.current.querySelector(':invalid')?.focus();
      return;
    }
    setStatus('sending');
    if (!canSend) {
      const data = new FormData(form.current);
      const subject = encodeURIComponent(`Portfolio inquiry from ${data.get('user_name')}`);
      const body = encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('user_name')}\nReply to: ${data.get('user_email')}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus('draft');
      return;
    }
    try {
      await emailjs.sendForm(config.service, config.template, form.current, { publicKey: config.key });
      setStatus('success');
      setValidated(false);
      form.current.reset();
    } catch {
      setStatus('error');
    }
  }

  return <Form ref={form} noValidate validated={validated} onSubmit={submit} className="contact-form">
    <Form.Group className="tw:mb-5" controlId="contact-name">
      <Form.Label>Name</Form.Label>
      <Form.Control name="user_name" autoComplete="name" placeholder="Your name" required maxLength={100} disabled={status === 'sending'} />
      <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="tw:mb-5" controlId="contact-email">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" name="user_email" autoComplete="email" placeholder="you@example.com" required maxLength={254} disabled={status === 'sending'} />
      <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="tw:mb-6" controlId="contact-message">
      <Form.Label>Message</Form.Label>
      <Form.Control as="textarea" rows={3} name="message" placeholder="Tell me what you have in mind…" required maxLength={5000} disabled={status === 'sending'} />
      <Form.Control.Feedback type="invalid">Please add a message.</Form.Control.Feedback>
    </Form.Group>
    <Button type="submit" className="send-button tw:w-full" disabled={status === 'sending'}>
      {status === 'sending' ? <><Spinner size="sm" className="tw:mr-2" />Sending…</> : <>{canSend ? 'Send it my way' : 'Open in email app'} <Icon name="arrow-up-right" /></>}
    </Button>
    <p className="form-note tw:mt-3">{canSend ? 'Or email me directly at ' : 'Opens an email draft to '}<a href={`mailto:${profile.email}`}>{profile.email}</a>.</p>
    <div aria-live="polite" aria-atomic="true">
      {status === 'success' && <Alert variant="success">Thanks for your message! I’ll get back to you soon.</Alert>}
      {status === 'draft' && <Alert variant="info">Your email app was requested. Review and send the draft there. If it didn’t open, email me directly using the link above.</Alert>}
      {status === 'error' && <Alert variant="danger">Your message couldn’t be sent. Please try again or email me directly.</Alert>}
    </div>
  </Form>;
}

function AboutContact({ section, close }) {
  const [active, setActive] = useState(section || 'about');
  useEffect(() => { if (section) setActive(section); }, [section]);
  return <Modal show={Boolean(section)} onHide={close} centered size="xl" className="portfolio-modal" aria-labelledby="about-contact-title">
    <button className="modal-close icon-button" onClick={close} aria-label="Close about and contact"><Icon name="x-lg" /></button>
    <h2 id="about-contact-title" className="visually-hidden">About Samuel and contact</h2>
    <div className="modal-tabs" role="group" aria-label="About and contact sections">
      <button className={active === 'about' ? 'selected' : ''} aria-pressed={active === 'about'} onClick={() => setActive('about')}>About me</button>
      <button className={active === 'contact' ? 'selected' : ''} aria-pressed={active === 'contact'} onClick={() => setActive('contact')}>Contact</button>
    </div>
    <div className="modal-panels">
      <section className={`about-panel modal-panel ${active === 'about' ? 'mobile-active' : ''}`} aria-label="About me">
        <span className="eyebrow">A LITTLE INTRODUCTION</span>
        <h3>Here's a bit<br /> about me<span className="accent">.</span></h3>
        <p className="modal-role">Frontend Software Engineer</p>
        <p>I'm <strong>{profile.name}</strong>, a frontend software engineer who enjoys turning ideas into responsive, performant web experiences.</p>
        <p>My projects range from movie discovery and book summaries to interactive interfaces and community game development.</p>
        <h4 className="skills-heading">A few tools I work with</h4>
        <Skills />
      </section>
      <section className={`contact-panel modal-panel ${active === 'contact' ? 'mobile-active' : ''}`} aria-label="Contact Samuel">
        <span className="eyebrow">LET'S CONNECT</span>
        <h3>Let's have<br /> a chat<span className="accent">.</span></h3>
        <p>Have a project or an opportunity in mind? I'd love to hear about it.</p>
        <ContactForm />
      </section>
    </div>
  </Modal>;
}

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  return <article className="project reveal" aria-labelledby={`title-${project.id}`}>
    <div className="project-meta tw:flex tw:items-center tw:justify-between tw:gap-4">
      <span><span className="project-number">0{index + 1}</span>{project.category}</span>
      <span className="project-type">{project.id === 'marvel' ? 'COMMUNITY BUILD' : 'WEB APPLICATION'}</span>
    </div>
    <div className={`project-wrapper ${expanded ? 'is-expanded' : ''}`}>
      <img className="project-image" src={project.image} alt={project.imageAlt} loading="lazy" width="1264" height="712" />
      <div className="project-shade" />
      <div className="project-description" id={`details-${project.id}`}>
        <h3 id={`title-${project.id}`}>{project.name}</h3>
        <p className="project-tech">{project.technologies.join(' · ')}</p>
        <p className="project-copy">{project.description}</p>
        <div className="project-links tw:flex tw:flex-wrap tw:items-center tw:gap-5">
          <a href={project.repository} target="_blank" rel="noreferrer" aria-label={`View ${project.name} source code (opens in a new tab)`}><Icon name="github" /> Source code</a>
          {project.live ? <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} live site (opens in a new tab)`}><Icon name="box-arrow-up-right" /> Live site</a> : <span className="pending-demo"><Icon name="clock" /> {project.note}</span>}
        </div>
      </div>
      <button className="project-toggle" aria-label={`${expanded ? 'Hide' : 'Show'} details for ${project.name}`} aria-expanded={expanded}
        aria-controls={`details-${project.id}`} onClick={() => setExpanded(!expanded)}><Icon name={expanded ? 'dash-lg' : 'plus-lg'} /></button>
    </div>
    <div className="project-caption tw:items-start tw:justify-between tw:gap-4"><span>{project.name}</span><span>{project.technologies.slice(0, 2).join(' / ')}</span></div>
  </article>;
}

export default function App() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.bsTheme || 'light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [section, setSection] = useState(null);
  useEffect(() => {
    document.documentElement.dataset.bsTheme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#242424' : '#dcdcfb';
    try { localStorage.setItem('sam-portfolio-theme', theme); } catch {}
  }, [theme]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => { el.classList.add('will-reveal'); observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  function open(sectionName) { setMenuOpen(false); setSection(sectionName); }
  function toggleTheme() { setTheme(theme === 'light' ? 'dark' : 'light'); }
  const themeButton = <button className="icon-button theme-button" onClick={toggleTheme}
    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} aria-pressed={theme === 'dark'}><Icon name={theme === 'light' ? 'circle-half' : 'sun'} /></button>;

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div id="top" className={section ? 'page-content dialog-open' : 'page-content'}>
      <header className="site-header tw:mx-auto tw:flex tw:items-center tw:justify-between">
        <a href="#top" className="brand" aria-label="Samuel Dolle — home">SD<span>.</span></a>
        <nav className="desktop-nav tw:items-center tw:gap-7" aria-label="Main navigation">
          <button className="plain-button underline-link" onClick={() => open('about')}>About</button>
          <a className="underline-link" href="#projects">Projects</a>
          <button className="plain-button underline-link" onClick={() => open('contact')}>Contact</button>
          {themeButton}
        </nav>
        <div className="mobile-nav"><button className="icon-button" aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(true)}><Icon name="list" /></button></div>
      </header>
      <main id="main">
        <section className="hero tw:relative" aria-labelledby="intro-title">
          <div className="hero-inner tw:mx-auto tw:grid tw:items-center">
            <div className="hero-copy">
              <h1 id="intro-title" className="entrance" style={{ '--delay': '200ms' }}>Hey<span className="hero-name accent">I'm {profile.firstName}.</span></h1>
              <p className="hero-intro entrance" style={{ '--delay': '400ms' }}>I'm a <strong className="accent">{profile.role}</strong> {profile.intro} Here's a bit more <button className="inline-button accent" onClick={() => open('about')}>about me.</button></p>
              <SocialLinks openContact={() => open('contact')} />
            </div>
            <Coffee />
          </div>
          <a href="#projects" className="scroll-indicator" aria-label="Scroll to my projects"><span /></a>
        </section>
        <section id="projects" className="projects-section tw:mx-auto" aria-labelledby="projects-title">
          <div className="section-heading reveal">
            <span className="eyebrow">SELECTED WORK</span>
            <h2 id="projects-title">Here are some of<br className="mobile-break" /> my <span className="accent">projects.</span></h2>
            <p>A few things I've brought to life on screen.</p>
          </div>
          <div className="project-list">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
        </section>
        <section className="contact-invitation reveal tw:mx-auto tw:text-center" aria-labelledby="connect-title">
          <span className="eyebrow">HAVE SOMETHING IN MIND?</span>
          <h2 id="connect-title">Let's build something <span className="accent">great.</span></h2>
          <Button className="contact-cta" onClick={() => open('contact')}>Get in touch <Icon name="arrow-up-right" /></Button>
        </section>
      </main>
      <footer className="site-footer tw:text-center">
        <a className="brand footer-brand" href="#top" aria-label="Back to top">SD<span>.</span><span className="back-top">Top <Icon name="arrow-up" /></span></a>
        <SocialLinks footer openContact={() => open('contact')} />
        <p className="copyright">© {new Date().getFullYear()} {profile.name}</p>
      </footer>
      <button className="floating-contact" onClick={() => open('contact')} aria-label="Open contact form"><Icon name="envelope-fill" /></button>
    </div>
    <Offcanvas show={menuOpen} onHide={() => setMenuOpen(false)} placement="end" className="navigation-drawer" id="mobile-navigation" aria-labelledby="navigation-title">
      <Offcanvas.Header closeButton><Offcanvas.Title id="navigation-title">Samuel Dolle<span className="accent">.</span></Offcanvas.Title></Offcanvas.Header>
      <Offcanvas.Body>
        <nav className="tw:flex tw:flex-col tw:gap-7" aria-label="Mobile navigation">
          <button className="plain-button underline-link" onClick={() => open('about')}>About</button>
          <a className="underline-link" href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <button className="plain-button underline-link" onClick={() => open('contact')}>Contact</button>
          <button className="plain-button menu-theme" onClick={toggleTheme}><Icon name={theme === 'light' ? 'moon' : 'sun'} /> {theme === 'light' ? 'Dark' : 'Light'} mode</button>
        </nav>
      </Offcanvas.Body>
    </Offcanvas>
    <AboutContact section={section} close={() => setSection(null)} />
  </>;
}

