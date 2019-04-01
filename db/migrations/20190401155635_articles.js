exports.up = function(connection, Promise) {
  return connection.schema.createTable("artciles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title");
    articlesTable.string("topic");
    articlesTable.string("author");
    articlesTable.string("body");
    articlesTable.timestamp("created_at").defaultTo(connection.fn.now());
    articlesTable.integer("votes");
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable("articles");
};
