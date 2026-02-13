import Section from '../components/ui/Section';
import { experiences } from '../data/content';

const ExperiencesPage = () => (
  <>
    <Section
      eyebrow="Experiences"
      title="Ways people use the creek in a day"
      subtitle="Loose ideas for how visitors have used the same rustic space—pick what fits your crew and plan it your way."
    >
      <div className="experience-grid">
        {experiences.map((experience) => (
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
  </>
);

export default ExperiencesPage;
