import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import BestTimeToVisitPanel from '../components/ui/BestTimeToVisitPanel';
import Section from '../components/ui/Section';
import {
  heroContent,
  reelGrid,
  experiences,
  photoSpots,
  placeProof,
  laneChoices,
  adventureFlow,
  photoFlow,
  planTimeline,
  travelCopy,
  contactInfo
} from '../data/content';

const heroBackdrops = ['/backdrops/Backdrop1.webp', '/backdrops/Backdrop2.webp', '/backdrops/Backdrop3.webp'];

const HomePage = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const featuredExperiences = experiences.slice(0, 3);
  const featuredSpots = photoSpots.slice(0, 3);

  useEffect(() => {
    if (heroBackdrops.length <= 1) return;

    const interval = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroBackdrops.length);
    }, 12000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Explore the Beauty of Sans Souci Gardens</title>
        <meta name="description" content="Discover the stunning landscapes and history of Sans Souci Gardens. A must-visit destination for nature lovers and history enthusiasts alike." />
        <meta property="og:title" content="Explore the Beauty of Sans Souci Gardens" />
        <meta property="og:description" content="Discover the stunning landscapes and history of Sans Souci Gardens. A must-visit destination for nature lovers and history enthusiasts alike." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sanssouci.in" />
        <link rel="canonical" href="https://sanssouci.in" />
      </Helmet>
      <section
        className="section hero hero--photo hero--photo-rotating"
        id="hero"
        style={{
          ['--hero-backdrop-url' as string]: `url('${heroBackdrops[heroIndex]}')`
        }}
      >
        <div className="container hero-grid">
          <div className="hero__content">
            <h1>{heroContent.headline}</h1>
            <p>{heroContent.subhead}</p>
            <p>
              Sunrise mist, late-evening glow, water, trees, boats, and rustic seating—every corner here is framed
              for the camera. You bring the friends, we’ll handle the backdrops.
            </p>
            <p>Want more than just photos? Stay on for creek angling or slip into a kayak and see Ennore from the water.</p>
            <div className="hero__cta">
              <Link to="/booking" className="button button-primary">
                {heroContent.primaryCta}
              </Link>
            </div>
            <p className="hero__footnote">* Rs. 100 per person for 1 hour stay – 8am to 6pm.</p>
          </div>
          <div className="hero__media hero__best-time">
            <BestTimeToVisitPanel />
          </div>
        </div>
      </section>

      <Section
        eyebrow="Why This Place"
        title="A creekside location built for motion, light, and pause"
        subtitle="From Ennore Creek calm to cinematic sunsets, Sans Souci works for both active sessions and short scenic stops."
      >
        <div className="grid grid-2">
          {placeProof.map((proof) => (
            <article key={proof.title} className="card">
              <h2>{proof.title}</h2>
              <p>{proof.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Choose Your Visit"
        title="Lean into adventure or linger with your camera."
        subtitle="Start with the option that feels right today—you can always drift from one mood into the other once you arrive."
      >
        <div className="lane-grid">
          {laneChoices.map((lane) => (
            <article key={lane.id} className="card lane-card">
              <h2>{lane.title}</h2>
              <p>{lane.summary}</p>
              <Link to={lane.to} className="button button-secondary">
                {lane.cta}
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="For adventurous days"
        title="Experiences built around the creek"
        subtitle="Start with kayaking, then graduate into longer sessions and slow-water adventures."
      >
        <div className="experience-grid">
          {featuredExperiences.map((experience) => (
            <article key={experience.id} className="card experience-card">
              <img src={experience.image} alt={`${experience.name} at Sans Souci creek`} />
              <h2>{experience.name}</h2>
              <div className="experience-card__body">
                <p>{experience.summary}</p>
              </div>
              <div className="experience-card__meta">
                <ul>
                  <li>
                    <strong>Why it looks good:</strong> {experience.whyItLooksGood}
                  </li>
                  <li>
                    <strong>Duration:</strong> {experience.duration}
                  </li>
                  <li>
                    <strong>Best time:</strong> {experience.bestTime}
                  </li>
                  <li>
                    <strong>Ideal for:</strong>
                    <div className="experience-card__pills">
                      {experience.idealFor.map((cohort) => (
                        <span key={cohort} className="tag">
                          {cohort}
                        </span>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="cta-row">
          <Link to="/experiences" className="button button-secondary">
            View all experiences
          </Link>
        </div>
        <ul className="flow-list" aria-label="Adventure flow">
          {adventureFlow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="For unhurried pauses"
        title="Photo spots along the water"
        subtitle="A quick scenic visit with a few corners that photograph well, plus simple timing and angle suggestions."
        id="photo-trail"
      >
        <div className="experience-grid">
          {featuredSpots.map((spot) => (
            <article key={spot.id} className="photo-spot-card">
              <img src={spot.image} alt={`${spot.name} - photo spot at Sans Souci`} />
              <h2>{spot.name}</h2>
              <p>{spot.reelIdea}</p>
              <ul>
                <li>
                  <strong>Best time:</strong> {spot.bestTime}
                </li>
                <li>
                  <strong>Tide:</strong> {spot.tide}
                </li>
                <li>
                  <strong>Wind:</strong> {spot.wind}
                </li>
                <li>
                  <strong>Angle:</strong> {spot.angle}
                </li>
              </ul>
              <p className="tag">{spot.hashtag}</p>
            </article>
          ))}
        </div>
        <div className="cta-row">
          <Link to="/photo-spots" className="button button-secondary">
            Explore all photo spots
          </Link>
        </div>
        <ul className="flow-list" aria-label="Photo spots flow">
          {photoFlow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Plan This Weekend"
        title={travelCopy.promise}
        subtitle="Here’s how most creator crews use a sunset slot."
      >
        <div className="grid grid-2">
          <div>
            <div className="timeline">
              {planTimeline.map((slot) => (
                <div key={slot.time} className="timeline-item">
                  <time>{slot.time}</time>
                  <h2>{slot.title}</h2>
                  <p>{slot.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3>Directions</h3>
            <p>{travelCopy.directions}</p>
            <Link to="/location" className="button button-secondary">
              See location guide
            </Link>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Booking"
        title="Ready to book Sans Souci?"
        subtitle="Send us your preferred date, headcount, and vibe—we’ll respond within 2 hours."
        id="booking"
      >
        <div className="grid grid-2">
          <form className="card" aria-label="Booking form">
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" required />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" required />
            </div>
            <div>
              <label htmlFor="group">Group size</label>
              <input id="group" name="group" type="number" min={1} />
            </div>
            <div>
              <label htmlFor="message">Intent / vibe</label>
              <textarea id="message" name="message" rows={4} />
            </div>
            <button className="button button-primary" type="submit">
              Send enquiry
            </button>
          </form>
          <div className="card">
            <h2>Talk to us now</h2>
            {contactInfo.phones.map((phone) => (
              <p key={phone}>
                <a href={`tel:${phone.replace(/\s|\-/g, '')}`}>{phone}</a>
              </p>
            ))}
            <p>{contactInfo.address}</p>
          </div>
        </div>
      </Section>
    </>
  );
};

export default HomePage;
