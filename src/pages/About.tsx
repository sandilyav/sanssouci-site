import Section from '../components/ui/Section';
import { historyCopy } from '../data/content';

const AboutPage = () => (
  <Section
    eyebrow="About"
    title="Heritage + present"
    subtitle="From Salt Bungalow (1906) to today’s creekside creator campus."
  >
    <div className="grid grid-2">
      {historyCopy.map((copy) => (
        <article key={copy} className="card">
          <p>{copy}</p>
        </article>
      ))}
    </div>
  </Section>
);

export default AboutPage;
