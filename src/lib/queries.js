export const homeCandidatesQuery = `
  *[
    _type == "politician" &&
    status == "active" &&
    category->slug.current == "georgia-congressmen"
  ]
  | order(displayOrder asc)[0...6] {
    _id,
    name,
    title,
    "slug": slug.current,
    photo,
    category->{
      _id,
      title,
      "slug": slug.current
    }
  }
`;

export const homeFocusArticlesQuery = `
  *[_type == "article"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    category->{
      _id,
      title,
      "slug": slug.current
    }
  }
`;

export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    articleNumber,
    excerpt,
    featuredImage,
    publishedAt,
    featured,

    author->{
      _id,
      name,
      photo,
      bio
    },

    category->{
      _id,
      title,
      description,
      "slug": slug.current
    },

    content
  }
`;

export const nextArticleQuery = `
  *[
    _type == "article" &&
    defined(publishedAt)
  ]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt
  }
`;

export const candidatesPageQuery = `
  *[
    _type == "category" &&
    slug.current in [
      "georgia-congressmen",
      "congressmen-outside-georgia",
      "georgia-state-senators",
      "georgia-state-representatives",
      "local-officials"
    ]
  ] {
    _id,
    title,
    description,
    "slug": slug.current,

    "candidates": *[
      _type == "politician" &&
      references(^._id) &&
      status == "active"
    ] | order(displayOrder asc) {
      _id,
      name,
      title,
      "slug": slug.current,
      photo,
      status,
      displayOrder
    }
  }
`;