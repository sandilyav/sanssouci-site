import Section from '../components/ui/Section';
import { photoSpots } from '../data/content';

const PhotoSpotsPage = () => (
  <Section
    eyebrow="Sans Souci Photo Trail"
    title="Timed stops for next-level reels"
    subtitle="Each spot comes with tide intel, wind guidance, and recommended storytelling prompts."
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
);

export default PhotoSpotsPage;
