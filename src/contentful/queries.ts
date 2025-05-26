export const HOMEPAGE_QUERY = `
{
  homepageCollection(limit: 1) {
    items {
      heroTitle
      heroSubtitle
      aboutText
      profileImage {
        url
        description
      }
    }
  }
}
`;

export const PROJECTS_QUERY = `
{
  projectCollection(order: title_ASC) {
    items {
      title
      description
      tags
      externalLink
      slug
      image {
        url
        description
      }
    }
  }
}
`;

export const PROJECT_DETAIL_QUERY = `
  query GetProjectDetail($slug: String!) {
    projectDetailCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        info
        backgroundAndGoals
        method
        crucialInsights
        researchImpact
        myLearning
      }
    }
  }
`;
