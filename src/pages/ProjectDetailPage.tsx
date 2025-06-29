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

        {/* Image 1 - Under the title */}
        {project.projectImagesCollection &&
          project.projectImagesCollection.items[0] && (
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
            </div>
          )}

        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {project.info}
        </ReactMarkdown>

        <section>
          <h2>Background & Goals</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.backgroundAndGoals}
          </ReactMarkdown>
        </section>

        <section>
          <h2>Method</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.method}
          </ReactMarkdown>
        </section>

        <section>
          <h2>Crucial Insights</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.crucialInsights}
          </ReactMarkdown>
        </section>

        {/* Image 2 - After Crucial Insights */}
        {project.projectImagesCollection &&
          project.projectImagesCollection.items[1] && (
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
            </div>
          )}

        <section>
          <h2>Research Impact</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.researchImpact}
          </ReactMarkdown>
        </section>

        {/* Image 3 - After Research Impact */}
        {project.projectImagesCollection &&
          project.projectImagesCollection.items[2] && (
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
            </div>
          )}

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
