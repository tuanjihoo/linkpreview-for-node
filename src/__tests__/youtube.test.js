const func = require("./../main");

jest.mock("request", () => (url, timeout, fn) => {
  const fs = require("fs");
  const __dirname = "src/__tests__";
  const error = {};
  const body = fs.readFileSync(__dirname + "/__data__/success.html").toString();
  const response = {
    body,
    statusCode: 200
  };
  return fn(error, response, body);
});
describe("youtube", () => {
  it("if url is youtube link", () => {
    return func("http://youtube.com?v=123").then(res => {
      expect(res.youtube).toBe("https://youtube.com/embed/123");
    });
  });
});
