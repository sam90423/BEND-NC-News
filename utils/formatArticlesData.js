exports.formatArticlesData = articles => {
  return articles.map(article => {
    const { created_at, ...restOfArticle } = article;

    return {
      created_at: new Date(article.created_at).toUTCString(),
      ...restOfArticle
    };
  });
};
