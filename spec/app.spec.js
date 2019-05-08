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
            console.log(res.body);
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
            console.log(res.body);
            expect(res.body.article.article_id).to.eql(1);
          });
      });
      it("PATCH method to increment or decrement the votes value", () => {
        return request
          .patch("/api/articles/1")
          .send({ inc_votes: 2 })
          .expect(200)
          .then(({ body }) => {
            expect(body.article.votes).to.eql(102);
          });
      });
      it("DELETE method to delete the given article", () => {
        return request
          .delete("/api/articles/1")

          .expect(204)
          .then(({ body }) => {
            expect(body).to.eql({});
          });
      });

      it("GET method to return the comments for a given id", () => {
        return request
          .get("/api/articles/1/comments")
          .expect(200)
          .then(res => {
            console.log(res.body);
            expect(res.body.comments.comment_id).to.eql(2);
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
            expect(body.comment).to.eql({
              comment_id: 19,
              body: "HELLOOOOOOooo",
              author: "butter_bridge",
              votes: 0,
              created_at: Date.now()
              //new date.now()
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
            expect(body.comment.votes).to.eql(18);
          });
      });
      it("DELETE method to delete the given comment", () => {
        return request
          .delete("/api/comments/1")
          .expect(204)
          .then(({ body }) => {
            expect(body).to.eql({});
          });
      });
    });
    describe("/users", () => {
      it("GET method to get a user by the given username", () => {
        return request
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(res => {
            expect(res.body.user.username).to.eql("butter_bridge");
          });
      });
    });
  });
  describe("Error handling tests", () => {
    it("GET status 400 when testing a bad request for with a bad article_id", () => {
      return request
        .get("/api/articles/fghshe")
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("Bad Request");
        });
    });
    it("GET status 404 when imputing a valid article_id that does not exist", () => {
      return request
        .get("/api/articles/1000")
        .expect(404)
        .then(res => {
          console.log(res.body);
          expect(res.body.msg).to.equal("Route Not Found");
        });
    });
    it("GET status 404 when testing a bad route", () => {
      return request
        .get("/api/fghshe")
        .expect(404)
        .then(res => {
          console.log(res.body);
          expect(res.body.msg).to.equal("Route Not Found");
        });
    });
    it("GET status 404 when testing for a bad route", () => {
      return request
        .post("/api/")
        .expect(404)
        .then(res => {
          console.log(res.body);
          expect(res.body.msg).to.equal("Route Not Found");
        });
    });
    it("GET status 404 when providing a non-existent topic", () => {
      return request
        .get("/api/articles?topic=not-a-topic")
        .expect(404)
        .then(res => {
          console.log(res.body);
          expect(res.body.msg).to.equal("Route Not Found");
        });
    });
    xit("GET status 500 when its an internal server error", () => {
      return request
        .get("/api/90")
        .expect(500)
        .then(res => {
          expect(res.body.msg).to.equal("Internal Server Error");
        });
    });
    it("GET status 404 when providing a non-existent author", () => {
      return request
        .get("/api/articles?author=not-an-author")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Route Not Found");
        });
    });
    it("GET status 404 when facing invalid sort queries", () => {
      return request
        .get("/api/articles?sort_by=not-a-column")
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("Bad Request");
        });
    });
    it("PATCH method for sending back the article unchanged after nothing is sent in the req.body", () => {
      return request
        .patch("/api/articles/1")
        .send()
        .expect(200)
        .then(({ body }) => {
          expect(body.article.votes).to.eql(100);
        });
    });
    it.only("POST method sending 400 for posting a comment without the required columns", () => {
      return request
        .post("/api/articles/1/comments")
        .send({
          body: "butter_bridge"
        })
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.eql("Bad Request");
        });
    });
    it("PATCH method sending a 404 for a valid comment_id that doesn't exist", () => {
      return request
        .patch("/api/comments/1000")
        .send({ inc_votes: 2 })
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.eql("Route Not Found");
        });
    });
    it("GET method sending a 404", () => {
      return request
        .get("/api/users/not-a-username")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.eql("Route Not Found");
        });
    });
    it("POST method sending 404 for posting a comment with a valid article_id that doesn't exist", () => {
      return request
        .post("/api/articles/10000/comments")
        .send({
          username: "butter_bridge",
          body: "This a nice comment"
        })
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.eql("Route Not Found");
        });
    });
    it("GET method sending a 404 when sending a valid article_id that does not exist", () => {
      return request
        .get("/api/articles/1000/comments")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.eql("Route Not Found");
        });
    });
    it("PATCH method sending a 404 when giving a valid article_id that doesn't exist", () => {
      return request
        .patch("/api/articles/1000")
        .send({ inc_votes: 2 })
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.eql("Route Not Found");
        });
    });
    it("DELETE method sending a 404 when giving a valid article_id that doesn't exist", () => {
      return request
        .delete("/api/articles/1000")

        .expect(404)
        .then(res => {
          expect(res.body.msg).to.eql("Route Not Found");
        });
    });
    it("DELETE method sending a 404 when given an valid comment_id that doesn't exist", () => {
      return request
        .delete("/api/comments/1000")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.eql("Route Not Found");
        });
    });
  });
});
