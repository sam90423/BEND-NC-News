exports.formatCommentData = (comments, articles) => {
  return comments.map(comment => {
    const { belongs_to, created_at, created_by, ...restOfComment } = comment;

    const matchedArticle = articles.find(article => {
      return belongs_to === article.title;
    });
    return {
      article_id: matchedArticle.article_id,
      created_at: new Date(comment.created_at).toUTCString(),
      author: created_by,
      ...restOfComment
    };
  });
};
