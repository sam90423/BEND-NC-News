# NC-News

## Back-End Heroku Link

https://nc-news808.herokuapp.com

## Netlify Link

https://nc-news808.netlify.com

## Description

This is the back-end to my nc-news project where I created the end-points to manage the data of my website such as articles, comments, topics and users. Its build mainly using Express with Knex, PostgreSQL with Chai and Mocha for TDD.

## End-Points

The end-points can be viewed in the routes folder.

## Available Scripts

Create development and test databases locally:

```bash
npm run setup-dbs
```

Create a new migration file:

```bash
npm run migrate-make <filename>
```

Run all migrations:

```bash
npm run migrate-latest
```

Rollback all migrations:

```bash
npm run migrate-rollback
```

Run tests:

```bash
npm test
```

Rollback, migrate -> latest, then start inserting data into the database:

```bash
npm run seed
```

Run the server with `nodemon`, for hot reload:

```bash
npm run dev
```

Run the server with `node`:

```bash
npm start
```
