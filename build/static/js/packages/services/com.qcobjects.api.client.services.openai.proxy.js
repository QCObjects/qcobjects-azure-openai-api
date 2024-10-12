"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qcobjects_1 = require("qcobjects");
class ProxyOpenAIService extends qcobjects_1.Service {
    constructor() {
        super();
        this.name = "openaiproxy";
        this.url = "/api/openai";
        this.external = false;
        this.cached = false;
        this.method = "POST";
        this.headers = {
            "Content-Type": "application/json"
        };
        this.data = {};
        this.withCredentials = false;
        this.data = {
            "model": "gpt-4o-mini",
            "messages": [{ "role": "user", "content": "hello world!" }],
            "temperature": 0.7
        };
    }
    done({ service }) {
        qcobjects_1.logger.debug(`Received from service call: ${service.template}`);
        const result = JSON.parse(service.template);
        service.template = result;
    }
}
exports.default = ProxyOpenAIService;
