import { Link } from 'react-router-dom';

import Section from '../components/ui/Section';
import { photoSpots, photoSpotGuidelines } from '../data/content';

const PhotoSpotsPage = () => (
  <>
    <Section
      eyebrow="Photo spots"
      title="A scenic creek stop you can do in one short visit"
      subtitle="Come for timed views, simple capture cues, and a quiet Ennore Creek reset before heading back to the city."
    >
      <div className="grid grid-2">
        <article className="card">
          <h3>What this visit is for</h3>
          <p>
            This page is designed for low-commitment visits: arrive, cover a few strong frames, relax by the water,
            and leave without planning a full activity block.
          </p>
        </article>
        <article className="card">
          <h3>Entry expectations</h3>
          <ul className="flow-list" aria-label="Photo spots entry guidance">
            {photoSpotGuidelines.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </Section>

    <Section
      eyebrow="Timed Spot List"
      title="Capture-ready locations with practical cues"
      subtitle="Each spot includes best window, tide/wind context, and an easy angle to reduce trial-and-error."
    >
      <div className="experience-grid">
        {photoSpots.map((spot) => (
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
              <li>
                <strong>Hashtag:</strong> {spot.hashtag}
              </li>
            </ul>
          </article>
        ))}
      </div>
    </Section>

    <Section
      eyebrow="Next Step"
      title="Want more than a scenic stop?"
      subtitle="If you are ready to move from frames to water sessions, switch to the Adventure track."
    >
      <div className="cta-row">
        <Link to="/experiences" className="button button-primary">
          Try kayaking and angling
        </Link>
        <Link to="/contact" className="button button-secondary">
          Ask about timings and access
        </Link>
      </div>
    </Section>
  </>
);

export default PhotoSpotsPage;
