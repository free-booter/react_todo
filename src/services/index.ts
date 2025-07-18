import Requests from "./requests";

const request = new Requests({
  baseURL: "/api",
  timeout: 5000,
});

export default request;
