\c nc_news_test

SELECT COUNT(comments.article_id), articles.article_id, articles.title FROM articles
LEFT JOIN comments ON comments.article_id = articles.article_id
GROUP BY articles.article_id;
