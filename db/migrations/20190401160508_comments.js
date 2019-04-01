exports.up = function(connection, Promise) {
  return connection.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable.string("body");
    commentsTable.string("belongs_to");
    commentsTable.string("created_by");
    commentsTable.integer("votes");
    commentsTable.timestamp("created_at").defaultTo(connection.fn.now());
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable("comments");
};
