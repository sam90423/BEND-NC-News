const connection = require("../db/connection");
const { expect } = require("chai");
const { formatCommentData } = require("../utils/formatCommentData");
const { formatArticlesData } = require("../utils/formatArticlesData");
describe("testing formatCommentData", () => {
  //beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  it("testing if formatComment data returns an array", () => {
    const input = [];
    const actual = formatCommentData(input);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it("testing if formatComment can format one comment", () => {
    const input = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      }
    ];
    const articles = [
      {
        article_id: 27,
        title:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        topic: "football",
        author: "grumpy19",
        body:
          "With each click and drag of a mouse, young soccer fanatics are creating the building blocks of the advanced stats that are changing how the sport is played, watched and analyzed. Opta and Prozone are among the companies that have taken soccer stats far beyond goals and saves, into the realm of pass completion percentage, defensive touches, percentage of aerial balls won, tackle percentage and goals scored above expectation. Cameras alone can’t process all these stats. So companies employ people — mostly young, mostly male, most logging matches in their spare time as a second job — to watch matches and document every event. Their work has helped develop stats that capture the value of players who don’t score many goals, but who set them up with pinpoint passing and hustle. Teams use advanced stats to decide which players to buy and put on the pitch. And fans, whether they like it or not, read and hear more numbers than ever before about this sport that for so long bucked the sports-analytics trend.",
        created_at: 1522206238717
      }
    ];

    const actual = formatCommentData(input, articles);
    const expected = [
      {
        article_id: 27,
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",

        author: "tickle122",
        votes: -1,
        created_at: "Sat, 09 Jul 2016 18:07:18 GMT"
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("test if my function can format multiple comments", () => {
    const input = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      },
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        created_by: "grumpy19",
        votes: 7,
        created_at: 1478813209256
      }
    ];
    const articles = [
      {
        article_id: 27,
        title:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        topic: "football",
        author: "grumpy19",
        body:
          "With each click and drag of a mouse, young soccer fanatics are creating the building blocks of the advanced stats that are changing how the sport is played, watched and analyzed. Opta and Prozone are among the companies that have taken soccer stats far beyond goals and saves, into the realm of pass completion percentage, defensive touches, percentage of aerial balls won, tackle percentage and goals scored above expectation. Cameras alone can’t process all these stats. So companies employ people — mostly young, mostly male, most logging matches in their spare time as a second job — to watch matches and document every event. Their work has helped develop stats that capture the value of players who don’t score many goals, but who set them up with pinpoint passing and hustle. Teams use advanced stats to decide which players to buy and put on the pitch. And fans, whether they like it or not, read and hear more numbers than ever before about this sport that for so long bucked the sports-analytics trend.",
        created_at: 1522206238717
      },
      {
        article_id: 13,
        title: "Making sense of Redux",
        topic: "coding",
        author: "jessjelly",
        body:
          "When I first started learning React, I remember reading lots of articles about the different technologies associated with it. In particular, this one article stood out. It mentions how confusing the ecosystem is, and how developers often feel they have to know ALL of the ecosystem before using React. And as someone who’s used React daily for the past 8 months or so, I can definitely say that I’m still barely scratching the surface in terms of understanding how the entire ecosystem works! But my time spent using React has given me some insight into when and why it might be appropriate to use another technology — Redux (a variant of the Flux architecture).",
        created_at: 1514093931240
      }
    ];
    const actual = formatCommentData(input, articles);
    const expected = [
      {
        article_id: 27,
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",

        author: "tickle122",
        votes: -1,
        created_at: "Sat, 09 Jul 2016 18:07:18 GMT"
      },
      {
        article_id: 13,
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        author: "grumpy19",
        votes: 7,
        created_at: "Thu, 10 Nov 2016 21:26:49 GMT"
      }
    ];
    expect(actual).to.eql(expected);
  });
});

describe("testing formatArticlesData", () => {
  after(() => connection.destroy());

  it("testing if my function returns and array", () => {
    const input = [];
    const actual = formatArticlesData(input);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it("testing if my function can format one article", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];

    const actual = formatArticlesData(input);
    const expected = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "Thu, 15 Nov 2018 12:21:54 GMT",
        votes: 100
      }
    ];
    expect(actual[0].created_at).to.eql(expected[0].created_at);
  });
});
