import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client } from '../contentful/client';
import { PROJECT_DETAIL_QUERY } from '../contentful/queries';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './ProjectDetail.css';
import BackButton from '../components/BackButton';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        interface ProjectDetailResponse {
          projectDetailCollection: {
            items: {
              title: string;
              info: string;
              backgroundAndGoals: string;
              method: string;
              crucialInsights: string;
              researchImpact: string;
              myLearning: string;
              projectImagesCollection: {
                items: {
                  url: string;
                  description?: string;
                  title?: string;
                }[];
              };
            }[];
          };
        }

        const res = await client.request<ProjectDetailResponse>(
          PROJECT_DETAIL_QUERY,
          { slug }
        );
        const projectData = res.projectDetailCollection.items[0];
        setProject(projectData);
      } catch (err) {
        console.error('Failed to fetch project detail:', err);
      }
    };

    fetchProjectDetail();
  }, [slug]);

  const openLightbox = (imageUrl: string) => {
    setLightboxImage(imageUrl);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  if (!project) return <div className='container'>Loading...</div>;

  return (
    <div className='project-detail-page'>
      <BackButton />
      <div className='container1' style={{ paddingBottom: '60px' }}>
        <h1>{project.title}</h1>

        <section>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.info}
          </ReactMarkdown>
        </section>

        {/* Background & Goals with Image 1 in grid layout */}
        <section className='section-with-image section-with-image-top'>
          <div className='section-content'>
            <h2>Background & Goals</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.backgroundAndGoals}
            </ReactMarkdown>
          </div>
          {project.projectImagesCollection &&
            project.projectImagesCollection.items[0] && (
              <div className='section-image'>
                <div
                  className='project-image-single'
                  onClick={() =>
                    openLightbox(project.projectImagesCollection.items[0].url)
                  }
                >
                  <img
                    src={project.projectImagesCollection.items[0].url}
                    alt={
                      project.projectImagesCollection.items[0].description ||
                      project.projectImagesCollection.items[0].title ||
                      'Project image 1'
                    }
                  />
                  {project.projectImagesCollection.items[0].title && (
                    <div className='image-caption'>
                      {project.projectImagesCollection.items[0].title}
                    </div>
                  )}
                </div>
              </div>
            )}
        </section>

        <section>
          <h2>Method</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.method}
          </ReactMarkdown>
        </section>

        {/* Crucial Insights with Image 2 in grid layout */}
        <section className='section-with-image section-with-image-top'>
          <div className='section-content'>
            <h2>Crucial Insights</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.crucialInsights}
            </ReactMarkdown>
          </div>
          {project.projectImagesCollection &&
            project.projectImagesCollection.items[1] && (
              <div className='section-image'>
                <div
                  className='project-image-single'
                  onClick={() =>
                    openLightbox(project.projectImagesCollection.items[1].url)
                  }
                >
                  <img
                    src={project.projectImagesCollection.items[1].url}
                    alt={
                      project.projectImagesCollection.items[1].description ||
                      project.projectImagesCollection.items[1].title ||
                      'Project image 2'
                    }
                  />
                  {project.projectImagesCollection.items[1].title && (
                    <div className='image-caption'>
                      {project.projectImagesCollection.items[1].title}
                    </div>
                  )}
                </div>
              </div>
            )}
        </section>

        {/* Research Impact with Image 3 in grid layout */}
        <section className='section-with-image section-with-image-top'>
          <div className='section-content'>
            <h2>Research Impact</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.researchImpact}
            </ReactMarkdown>
          </div>
          {project.projectImagesCollection &&
            project.projectImagesCollection.items[2] && (
              <div className='section-image'>
                <div
                  className='project-image-single'
                  onClick={() =>
                    openLightbox(project.projectImagesCollection.items[2].url)
                  }
                >
                  <img
                    src={project.projectImagesCollection.items[2].url}
                    alt={
                      project.projectImagesCollection.items[2].description ||
                      project.projectImagesCollection.items[2].title ||
                      'Project image 3'
                    }
                  />
                  {project.projectImagesCollection.items[2].title && (
                    <div className='image-caption'>
                      {project.projectImagesCollection.items[2].title}
                    </div>
                  )}
                </div>
              </div>
            )}
        </section>

        <section>
          <h2>My Learnings</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.myLearning}
          </ReactMarkdown>
        </section>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className='lightbox-overlay' onClick={closeLightbox}>
          <div
            className='lightbox-content'
            onClick={(e) => e.stopPropagation()}
          >
            <button className='lightbox-close' onClick={closeLightbox}>
              ×
            </button>
            <img src={lightboxImage} alt='Expanded view' />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;
