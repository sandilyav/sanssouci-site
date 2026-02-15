import { Link } from 'react-router-dom';

import Section from '../components/ui/Section';
import { experiences, experiencePracticals } from '../data/content';

const ExperiencesPage = () => {
  const priorityExperiences = experiences.filter((experience) =>
    ['kayaking', 'angling'].includes(experience.id)
  );
  const extendedExperiences = experiences.filter(
    (experience) => !['kayaking', 'angling'].includes(experience.id)
  );

  return (
    <>
      <Section
        eyebrow="Creek adventures"
        title="Start with water. Let the rest of the day fall into place."
        subtitle="Use best-time windows to plan kayaking or angling first, then stretch the evening with whatever your crew needs most."
      >
        <div className="grid grid-2">
          <article className="card">
            <h3>How to plan this well</h3>
            <p>
              Check tide and light before you lock the slot. Most crews paddle first, then shift to golden-hour
              coverage or dockside rest.
            </p>
            <Link to="/" className="button button-secondary">
              View live planning panel
            </Link>
          </article>
          <article className="card">
            <h3>Who this suits best</h3>
            <p>
              For people who want to paddle, drift, and feel the creek change under the light—not just pass through for a frame.
            </p>
            <p className="tag">Prefer a shorter scenic visit? The photo spots page keeps it lighter.</p>
          </article>
        </div>
      </Section>

      <Section
        eyebrow="Core Sessions"
        title="Begin with kayaking and angling"
        subtitle="These are the most repeatable adventure formats and the clearest starting point for new crews."
      >
        <div className="experience-grid">
          {priorityExperiences.map((experience) => (
            <article key={experience.id} className="card experience-card">
              <img src={experience.image} alt={experience.name} />
              <h3>{experience.name}</h3>
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
      </Section>

      <Section
        eyebrow="Extend Your Visit"
        title="Add-on experiences for longer stays"
        subtitle="Once the core water session is set, layer in events, camping, or private blocks."
      >
        <div className="experience-grid">
          {extendedExperiences.map((experience) => (
            <article key={experience.id} className="card experience-card">
              <img src={experience.image} alt={experience.name} />
              <h3>{experience.name}</h3>
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
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Know Before You Go"
        title="Practical guidance for smooth adventure days"
        subtitle="Small prep changes make a big difference on water and around equipment."
      >
        <ul className="flow-list" aria-label="Adventure practical guidance">
          {experiencePracticals.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="cta-row">
          <Link to="/contact" className="button button-primary">
            Book an adventure slot
          </Link>
          <Link to="/photo-spots" className="button button-secondary">
            Prefer Photo Spots instead?
          </Link>
        </div>
      </Section>
    </>
  );
};

export default ExperiencesPage;
