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
      image {
        url
        description
      }
    }
  }
}
`;
