import {Route, CONFIG } from "qcobjects";
/*
* The next values are the default settings
* You can change any value in runtime by using CONFIG.set
* or changing the static initial value in a config.json file
*/
CONFIG.set("OpenAIAPIEnabled", true);
const backend = CONFIG.get("backend", {});
if (typeof backend.routes === "undefined"){
  backend.routes = [];
}
backend.routes.push({
  name:"QCObjects Open AI API Proxy",
  description:"This endpoint returns same response like if you were calling to OpenAI API",
  path: "^/api/openai$",
  microservice:"qcobjects-azure-openai-api",
  headers: {
    "content-type": "text/html; charset=utf-8"
  },
  responseHeaders:{
  },
  cors:{
    "allow_origins":"*"
  }
} as Route);
CONFIG.set("backend", backend);
