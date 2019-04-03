exports.up = function(connection, Promise) {
  return connection.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title").notNullable();
    articlesTable
      .string("topic")
      .references("slug")
      .inTable("topics")
      .notNullable();
    articlesTable
      .string("author")
      .references("username")
      .inTable("users")
      .notNullable();
    articlesTable.string("body", 5000);
    articlesTable.date("created_at").defaultTo(connection.fn.now());
    articlesTable.integer("votes").defaultTo(0);
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable("articles");
};
