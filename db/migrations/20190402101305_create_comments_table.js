exports.up = function(connection, Promise) {
  return connection.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable
      .integer("article_id")
      .references("article_id")
      .inTable("articles")
      .onDelete("CASCADE");
    commentsTable.string("body", 5000);
    commentsTable
      .string("author")
      .references("username")
      .inTable("users")
      .notNullable()
      .onDelete("CASCADE");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.date("created_at").defaultTo(connection.fn.now());
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable("comments");
};
