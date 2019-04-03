exports.up = function(connection, Promise) {
  return connection.schema.createTable("users", usersTable => {
    usersTable
      .string("username")
      .primary()
      .notNullable();
    usersTable.string("name");
    usersTable.string("avatar_url");
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable("users");
};
