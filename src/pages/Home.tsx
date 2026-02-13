import { Link } from 'react-router-dom';

import Section from '../components/ui/Section';
import {
  heroContent,
  reelGrid,
  experiences,
  photoSpots,
  whySansSouci,
  planTimeline,
  travelCopy,
  contactInfo
} from '../data/content';

const HomePage = () => {
  const featuredExperiences = experiences.slice(0, 3);
  const featuredSpots = photoSpots.slice(0, 3);

  return (
    <>
      <section className="section hero" id="hero">
        <div className="container hero-grid">
          <div className="hero__content">
            <p className="tag">Chennai · Ennore Creek</p>
            <h1>{heroContent.headline}</h1>
            <p>{heroContent.subhead}</p>
            <div className="hero__cta">
              <Link to="/photo-spots" className="button button-primary">
                {heroContent.primaryCta}
              </Link>
              <Link to="/plan" className="button button-secondary">
                {heroContent.secondaryCta}
              </Link>
            </div>
            <div className="hero__stats">
              {heroContent.stats.map((stat) => (
                <div key={stat.label} className="hero__stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero__media">
            <img src="/media/spot-sunset.jpg" alt="Sunset jetty at Sans Souci" />
          </div>
        </div>
      </section>

      <Section
        eyebrow="Reel Preview"
        title="What your feed could look like this weekend"
        subtitle="Vertical-native tiles curated from our recent shoots. All shot on phones, edited on site."
      >
        <div className="reel-grid">
          {reelGrid.map((reel) => (
            <article key={reel.id} className="reel-card">
              <img src={reel.image} alt={reel.label} />
              <span>{reel.label}</span>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Most Instagrammable"
        title="The Sans Souci Photo Trail"
        subtitle="Timed stops for creators chasing reflections, silhouettes, and bonfire glow."
        id="photo-trail"
      >
        <div className="experience-grid">
          {featuredSpots.map((spot) => (
            <article key={spot.id} className="photo-spot-card">
              <img src={spot.image} alt={spot.name} />
              <h3>{spot.name}</h3>
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
      </Section>

      <Section
        eyebrow="Experiences"
        title="Adventure layers built for reels and memory reels"
        subtitle="Swap between adrenaline and calm without leaving the property."
      >
        <div className="experience-grid">
          {featuredExperiences.map((experience) => (
            <article key={experience.id} className="card">
              <img src={experience.image} alt={experience.name} />
              <h3>{experience.name}</h3>
              <p>{experience.summary}</p>
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
              </ul>
              <p className="tag">{experience.idealFor.join(' · ')}</p>
            </article>
          ))}
        </div>
        <div className="cta-row">
          <Link to="/experiences" className="button button-secondary">
            View all experiences
          </Link>
        </div>
      </Section>

      <Section eyebrow="Why Sans Souci" title="Chennai’s golden hour secret" id="why">
        <div className="grid grid-2">
          {whySansSouci.map((reason) => (
            <article key={reason} className="card">
              <p>{reason}</p>
            </article>
          ))}
        </div>
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
                  <h3>{slot.title}</h3>
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
            <h3>Talk to us now</h3>
            {contactInfo.phones.map((phone) => (
              <p key={phone}>
                <a href={`tel:${phone.replace(/\s|\-/g, '')}`}>{phone}</a>
              </p>
            ))}
            <p>
              <a href="mailto:bookings@sanssouci.in">bookings@sanssouci.in</a>
            </p>
            <p>{contactInfo.address}</p>
          </div>
        </div>
      </Section>
    </>
  );
};

export default HomePage;
