const request = require("supertest");
const server = require("../api/server.js");

describe("server", () => {
  it("runs the tests", () => {
    expect(true).toBe(true);
  });

  describe("POST /register", () => {
    it("returns 400 code if missing required fields", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "thompson" })
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
    it("returns json object in response", () => {
      return request(server)
        .post("/api/auth/register")
        .send()
        .then(res => {
          expect(res.type).toMatch(/json/);
        });
    });
  });
  describe("POST /login", () => {
    it("returns 400 code if missing required fields", () => {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "thompson" })
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
    it("returns json object in response", () => {
      return request(server)
        .post("/api/auth/login")
        .send()
        .then(res => {
          expect(res.type).toMatch(/json/);
        });
    });
  });
});
