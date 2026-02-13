import Section from '../components/ui/Section';
import { weeklyEvents, experiences } from '../data/content';

const EventsPage = () => (
  <>
    <Section
      eyebrow="Events"
      title="Waterfront shows, offsites, and wrap parties"
      subtitle="Mix and match decks, bonfire coves, and floating entries."
    >
      <div className="grid grid-2">
        {weeklyEvents.map((event) => (
          <article key={event.title} className="card">
            <h3>{event.title}</h3>
            <p>{event.detail}</p>
            <button className="button button-secondary">Feature this week</button>
          </article>
        ))}
      </div>
    </Section>

    <Section
      eyebrow="Recommended modules"
      title="Build your event stack"
      subtitle="Combine experience blocks to craft a custom flow."
    >
      <div className="experience-grid">
        {experiences.map((exp) => (
          <article key={exp.id} className="card">
            <h3>{exp.name}</h3>
            <p>{exp.summary}</p>
            <p className="tag">{exp.idealFor.join(' · ')}</p>
          </article>
        ))}
      </div>
    </Section>
  </>
);

export default EventsPage;
