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
});
