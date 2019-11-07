const func = require("./../main");

jest.mock("request", () => (url, timeout, fn) => {
  const fs = require("fs");
  const __dirname = "src/__tests__";
  const error = "page not found";
  const body = fs.readFileSync(__dirname + "/__data__/fail.html").toString();
  const response = {
    body,
    statusCode: 400
  };
  return fn(error, response, body);
});
describe("request fail", () => {
  it("content fail", () => {
    return func("http://url.com")
      .then(res => {
        expect(res.url).toBe("http://url.com");
      })
      .catch(e => {
        console.log(e);
        expect(true).toBe(false);
      });
  });
});
