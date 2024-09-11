const request = require("supertest");
const app = require("./server");

describe("Weather Journal App API", () => {
  // Test for the GET /all route
  it("should return an empty projectData object initially", async () => {
    const res = await request(app).get("/all");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({});
  });

  // Test for the POST /add route
  it("should add weather data to the projectData object", async () => {
    const data = {
      temp: 20,
      date: "9/10/2024",
      content: "Nice weather",
    };

    const res = await request(app).post("/add").send(data);

    expect(res.statusCode).toEqual(200);
    expect(res.body.projectData.temp).toEqual(20);
    expect(res.body.projectData.date).toEqual("9/10/2024");
    expect(res.body.projectData.content).toEqual("Nice weather");
  });
});

// Test for POST /add with missing data
it("should return 500 when required data is missing", async () => {
  const incompleteData = {
    date: "9/10/2024",
  };

  const res = await request(app).post("/add").send(incompleteData);

  expect(res.statusCode).toEqual(500);
  expect(res.body.error).toBe(
    "An error occurred while processing your request"
  );
});
