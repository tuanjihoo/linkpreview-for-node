const func = require("./../main");
const sinon = require("sinon");
const fs = require("fs");

const makeRequestOne = (url, timeout, fn) => {
  const __dirname = "src/__tests__";
  const error = {};
  const body = fs.readFileSync(__dirname + "/__data__/successDeepVideo.html").toString();
  const response = {
    body,
    statusCode: 200
  };
  return { body, response };
};

const makeRequestTwo = (url, timeout, fn) => {
  const __dirname = "src/__tests__";
  const error = {};
  const body = fs.readFileSync(__dirname + "/__data__/successDeepVideoTwo.html").toString();
  const response = {
    body,
    statusCode: 200
  };
  return { body, response };
};
const makeRequestFail = (url, timeout, fn) => {
  const __dirname = "src/__tests__";
  const error = {};
  const body = fs.readFileSync(__dirname + "/__data__/successDeepVideoTwo.html").toString();
  const response = {
    body,
    statusCode: 400
  };
  return { body, response };
};

const makeRequestWithNoDeepUrl = (url, timeout, fn) => {
  const __dirname = "src/__tests__";
  const error = {};
  const body = fs.readFileSync(__dirname + "/__data__/successWithNoDeepUrl.html").toString();
  const response = {
    body,
    statusCode: 200
  };
  return { body, response };
};

describe("deepVideo", () => {
  it("if html as link in description", () => {
    const stub = sinon
      .stub(func, "makeRequest")
      .onCall(0)
      .resolves(makeRequestOne())
      .onCall(1)
      .resolves(makeRequestTwo())
      .resolves(makeRequestTwo());
    return func("http://test.com?v=123", true).then(res => {
      expect(res.ogVideoUrl).toBe("https://youtrube.com/embed/12345");
      stub.restore();
    });
  });
  it("if request return error for deepVideo", () => {
    const stub = sinon
      .stub(func, "makeRequest")
      .onCall(0)
      .resolves(makeRequestOne())
      .onCall(1)
      .resolves(makeRequestFail())
      .resolves(makeRequestFail());
    return func("http://test.com?v=123", true).then(res => {
      expect(res.ogVideoUrl).toBe(null);
      stub.restore();
    });
  });
  it("if response does not have deep url", () => {
    const stub = sinon
      .stub(func, "makeRequest")
      .onCall(0)
      .resolves(makeRequestWithNoDeepUrl())
      .onCall(1)
      .resolves(makeRequestFail())
      .resolves(makeRequestFail());
    return func("http://test.com?v=123", true).then(res => {
      expect(res.ogVideoUrl).toBe(null);
      stub.restore();
    });
  });
});
