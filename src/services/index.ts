import Requests from "./requests";

const request = new Requests({
  baseURL: "http://127.0.0.1:4523/m1/2733387-2856259-default/",
  timeout: 5000,
});

export default request;
