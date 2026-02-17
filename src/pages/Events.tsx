import Section from '../components/ui/Section';
import { weeklyEvents, experiences } from '../data/content';

const EventsPage = () => (
  <>
    <Section
      eyebrow="Events"
      title="Ways people turn Sans Souci into an event backdrop"
      subtitle="These are ideas from past use of the space, not a fixed calendar—crews bring their own plans and gear."
    >
      <div className="grid grid-2">
        {weeklyEvents.map((event) => (
          <article key={event.title} className="card">
            <h3>{event.title}</h3>
            <p>{event.detail}</p>
          </article>
        ))}
      </div>
    </Section>

    <Section
      eyebrow="Ideas to mix and match"
      title="Build your own flow"
      subtitle="Use these experiences as a menu of possibilities—the actual plan is entirely yours."
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
