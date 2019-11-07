const func = require("./../main");

jest.mock("request", () => (url, timeout, fn) => {
  const fs = require("fs");
  const __dirname = "src/__tests__";
  const error = {};
  const body = fs.readFileSync(__dirname + "/__data__/fail.html").toString();
  const response = {
    body,
    statusCode: 200
  };
  return fn(error, response, body);
});

describe("fail", () => {
  it("content not found", () => {
    return func("http://url.com").then(res => {
      expect(res.url).toBe("http://url.com");
      expect(!res.title).toBe(true);
      expect(!res.siteName).toBe(true);
      expect(!res.image).toBe(true);
      expect(!res.imageWidth).toBe(true);
      expect(!res.imageHeight).toBe(true);
      expect(!res.imageType).toBe(true);
      expect(!res.description).toBe(true);
    });
  });
  it("bad url", () => {
    return func("http://url").then(res => {
      expect(res.url).toBe("http://url");
      expect(!res.title).toBe(true);
      expect(!res.siteName).toBe(true);
      expect(!res.image).toBe(true);
      expect(!res.imageWidth).toBe(true);
      expect(!res.imageHeight).toBe(true);
      expect(!res.imageType).toBe(true);
      expect(!res.description).toBe(true);
    });
  });
  it("not url", () => {
    return func()
      .then(() => {
        expect(true).toBe(false);
      })
      .catch(err => {
        expect(err.message).toBe("You must add a valid url");
      });
  });
});
