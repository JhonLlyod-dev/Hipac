export const homeCandidatesQuery = `
  *[
    _type == "politician" &&
    status == "active" &&
    category->slug.current == "house-representatives"
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
    _type == "category"
  ] | order(displayOrder asc) {
    _id,
    title,
    description,
    displayOrder,
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

export const electionInfoQuery = `
  *[_type == "election" && isCurrent == true][0] {
    _id,
    name,
    electionDate,
    description,
    importantDates[] {
      title,
      date,
      description,
      isFeatured
    },
    isCurrent
  }
`;