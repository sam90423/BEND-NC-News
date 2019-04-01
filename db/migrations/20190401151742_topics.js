exports.up = function(connection, Promise) {
  return connection.schema.createTable("topics", topicsTable => {
    topicsTable.increments("topic_id").primary();
    topicsTable.string("description");
    topicsTable.string("slug");
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable("topics");
};
