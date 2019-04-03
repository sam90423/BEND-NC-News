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
            expect(res.body.articles).to.be.an("array");
          });
      });
      it("GET method to filter the articles by the username", () => {
        return request
          .get("/api/articles?author=butter_bridge")
          .expect(200)
          .then(res => {
            console.log(res.body);
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
    });
  });
});
