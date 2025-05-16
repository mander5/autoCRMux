import { useEffect, useState } from 'react';
import { client } from '../contentful/client';
import { HOMEPAGE_QUERY, PROJECTS_QUERY } from '../contentful/queries';

interface HomepageData {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  profileImage: {
    url: string;
    description: string;
  };
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  externalLink: string;
  image: {
    url: string;
    description: string;
  };
}

export default function Home() {
  const [homepage, setHomepage] = useState<HomepageData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homepageRes: {
          homepageCollection: {
            items: HomepageData[];
          };
        } = await client.request(HOMEPAGE_QUERY);

        const projectsRes: {
          projectCollection: {
            items: Project[];
          };
        } = await client.request(PROJECTS_QUERY);

        setHomepage(homepageRes.homepageCollection.items[0]);
        setProjects(projectsRes.projectCollection.items);
      } catch (err) {
        console.error('Error fetching data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!homepage) return <p>No homepage content found.</p>;

  return (
    <div className='container'>
      <header>
        <h1>{homepage.heroTitle}</h1>
        <h2>{homepage.heroSubtitle}</h2>
        <img
          src={homepage.profileImage.url}
          alt={homepage.profileImage.description}
        />
        <p>{homepage.aboutText}</p>
      </header>

      <section>
        <h3>Projects</h3>
        <div className='projects-grid'>
          {projects.map((project, i) => (
            <div key={i} className='project-card'>
              <img src={project.image.url} alt={project.image.description} />
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <div className='project-tags'>
                {project.tags.map((tag, idx) => (
                  <span key={idx} className='project-tag'>
                    {tag}
                  </span>
                ))}
              </div>
              {project.externalLink && (
                <a
                  href={project.externalLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='project-link'
                >
                  View Case Study
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
