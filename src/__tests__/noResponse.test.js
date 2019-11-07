const func = require("./../main");
jest.mock("request", () => (url, timeout, fn) => fn({}, undefined, undefined));

describe("no response", () => {
  it("no response", () => {
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
});
