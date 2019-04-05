process.env.NODE_ENV = "test";

const { expect } = require("chai");
const supertest = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

const request = supertest(app);

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET status:200", () => {
      return request
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
    describe("/topics", () => {
      it("GET method to retireve all the topics", () => {
        return request
          .get("/api/topics")
          .expect(200)
          .then(res => {
            expect(res.body.topics).to.be.an("array");
          });
      });
    });
    describe("/articles", () => {
      it("GET method to retrieve all the articles", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(res => {
            console.log(res.body.articles);
            expect(res.body.articles).to.be.an("array");
          });
      });
      it("GET method to filter the articles by the username", () => {
        return request
          .get("/api/articles?author=butter_bridge")
          .expect(200)
          .then(res => {
            expect(res.body.articles[0].author).to.eql("butter_bridge");
          });
      });
      it("GET method to filter the topic value specified by the query", () => {
        return request
          .get("/api/articles?topic=cats")
          .expect(200)
          .then(res => {
            expect(res.body.articles[0].topic).to.eql("cats");
          });
      });
      it("GET method to add a comment count to article_id", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(res => {
            console.log(res.body);
            res.body.articles.forEach(article => {
              expect(article).to.have.keys(
                "author",
                "title",
                "article_id",
                "topic",
                "body",
                "created_at",
                "votes",
                "comment_count"
              );
              expect(res.body.articles[0].comment_count).to.eql("13");
            });
          });
      });
      it("GET method to sort the articles by any valid column", () => {
        return request
          .get("/api/articles?sort_by=created_at")
          .expect(200)
          .then(res => {
            expect(res.body.articles[0].created_at).to.eql(
              "2018-11-15T00:00:00.000Z"
            );
          });
      });
      it("GET method to sort the articles by any valid column", () => {
        return request
          .get("/api/articles?sort_by=created_at")
          .expect(200)
          .then(res => {
            expect(res.body.articles[0].created_at).to.eql(
              "2018-11-15T00:00:00.000Z"
            );
          });
      });
      it("GET method to sort the articles by any valid column with non default values", () => {
        return request
          .get("/api/articles?sort_by=votes&&order=asc")
          .expect(200)
          .then(res => {
            expect(res.body.articles[0].votes).to.eql(0);
          });
      });
      it("GET method to find the article by article_id", () => {
        return request
          .get("/api/articles/1")
          .expect(200)
          .then(res => {
            expect(res.body.articles[0].article_id).to.eql(1);
          });
      });
      it("PATCH method to increment or decrement the votes value", () => {
        return request
          .patch("/api/articles/1")
          .send({ inc_votes: 2 })
          .expect(200)
          .then(({ body }) => {
            expect(body.articles.votes).to.eql(102);
          });
      });
      it("DELETE method to delete the given article", () => {
        return request
          .delete("/api/articles/1")

          .expect(204)
          .then(({ body }) => {
            console.log(body);
            expect(body).to.eql({});
          });
      });

      it("GET method to return an array of the comments for a given id", () => {
        return request
          .get("/api/articles/1/comments")
          .expect(200)
          .then(res => {
            console.log(res.body);
            expect(res.body.comments[0].article_id).to.eql(1);
          });
      });
      it("POST method to post a comment", () => {
        return request
          .post("/api/articles/1/comments")
          .send({
            username: "butter_bridge",
            body: "HELLOOOOOOooo"
          })
          .expect(201)
          .then(({ body }) => {
            console.log({ body });
            expect(body.comment).to.eql({
              comment_id: 19,
              article_id: 1,
              body: "HELLOOOOOOooo",
              author: "butter_bridge",
              votes: 0,
              created_at: "2019-04-04T23:00:00.000Z"
            });
          });
      });
    });
    describe("/comments", () => {
      it("PATCH method to increment or decrement the votes value", () => {
        return request
          .patch("/api/comments/1")
          .send({ inc_votes: 2 })
          .expect(200)
          .then(({ body }) => {
            expect(body.patchedComment.votes).to.eql(18);
          });
      });
    });
  });
});
