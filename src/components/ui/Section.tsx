import { ReactNode } from 'react';

type SectionProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  id?: string;
};

const Section = ({ eyebrow, title, subtitle, children, id }: SectionProps) => (
  <section className="section" id={id}>
    <div className="container">
      <p className="section-heading">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      {children}
    </div>
  </section>
);

export default Section;
