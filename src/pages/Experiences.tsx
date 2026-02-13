import Section from '../components/ui/Section';
import { experiences } from '../data/content';

const ExperiencesPage = () => (
  <>
    <Section
      eyebrow="Experiences"
      title="Adventure layers for every crew"
      subtitle="Each module is modular—stack them to design your own creek script."
    >
      <div className="experience-grid">
        {experiences.map((experience) => (
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
              <li>
                <strong>Ideal for:</strong> {experience.idealFor.join(' · ')}
              </li>
            </ul>
            <button className="button button-secondary">Add to itinerary</button>
          </article>
        ))}
      </div>
    </Section>
  </>
);

export default ExperiencesPage;
