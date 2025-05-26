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

  if (!project) return <div className='container'>Loading...</div>;

  return (
    <div className='project-detail-page'>
      <BackButton />
      <div className='container1' style={{ paddingBottom: '60px' }}>
        <h1>{project.title}</h1>
        <p>{project.info}</p>

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

        <section>
          <h2>Research Impact</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.researchImpact}
          </ReactMarkdown>
        </section>

        <section>
          <h2>My Learning</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.myLearning}
          </ReactMarkdown>
        </section>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
