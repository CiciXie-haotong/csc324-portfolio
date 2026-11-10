import { Markdown } from '../components/Markdown';
import { PageHeader } from '../components/PageHeader';
import { SmartLink } from '../components/SmartLink';
import { site } from '../content/site';

export function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title={site.name}>
        <p>{site.role}</p>
      </PageHeader>
      <div className="container section about">
        <div className="about__bio">
          <Markdown source={site.bio.join('\n\n')} />
        </div>
        <aside className="card about__links" aria-labelledby="links-h">
          <h2 id="links-h" className="card__title">
            Links
          </h2>
          <ul className="link-list">
            {site.links.map((link) => (
              <li key={link.label}>
                <SmartLink href={link.href}>{link.label}</SmartLink>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
