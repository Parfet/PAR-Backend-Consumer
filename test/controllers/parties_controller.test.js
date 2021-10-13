const chai = require("chai");
const { expect } = chai;
const request = require("supertest");
const { v4: uuidv4 } = require("uuid");

const app = require("../../src/index");
const party_controller = require("../../src/controllers/parties_controller");

describe("PARTY SERVICE", async () => {
  describe("GET", async () => {
    describe("/into", async () => {
      it("Party not found", async () => {
        const party_id = uuidv4();
        const { status } = await request(app)
          .get("/party/info/" + party_id)
          .set("Authorization", "3tkbcgezWtnqM1ztW9kI");
        expect(status).to.equal(204);
      });
    });
  });
  describe("POST", async () => {
    describe("/", async () => {
      it("Create party with empty body", async () => {
        const { status, body } = await request(app)
          .post("/party/ytFiKULEibnFdKODLPIu")
          .send({});
        expect(status).to.equal(400);
        expect(body).to.be.have.key("message");
        expect(body.message).to.equal("Invalid Request");
      });
    });
  });
  
});
