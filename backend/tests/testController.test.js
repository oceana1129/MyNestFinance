import request from "supertest";

import app from "../src/testApp.js";

describe("Test API", () => {
  test("creates a test object", async () => {
    const response = await request(app).post("/api/test").send({
      title: "Hello",
      content: "World",
    });

    expect(response.status).toBe(201);

    expect(response.body.savedTest.title).toBe("Hello");

    expect(response.body.savedTest.content).toBe("World");
  });
});

test("gets all tests", async () => {
  await request(app).post("/api/test").send({
    title: "Test One",
    content: "Content One",
  });

  const response = await request(app).get("/api/test");

  expect(response.status).toBe(200);

  expect(response.body.tests.length).toBe(1);
});

test("gets test by id", async () => {
  const created = await request(app).post("/api/test").send({
    title: "My Test",
    content: "My Content",
  });

  const id = created.body.savedTest._id;

  const response = await request(app).get(`/api/test/${id}`);

  expect(response.status).toBe(200);

  expect(response.body.test.title).toBe("My Test");
});

test("updates a test", async () => {
  const created = await request(app).post("/api/test").send({
    title: "Old",
    content: "Old Content",
  });

  const id = created.body.savedTest._id;

  const response = await request(app).put(`/api/test/${id}`).send({
    title: "New",
    content: "New Content",
  });

  expect(response.status).toBe(200);

  expect(response.body.newTest.title).toBe("New");
});

test("deletes a test", async () => {
  const created = await request(app).post("/api/test").send({
    title: "Delete Me",
    content: "Delete Content",
  });

  const id = created.body.savedTest._id;

  const response = await request(app).delete(`/api/test/${id}`);

  expect(response.status).toBe(200);
});
