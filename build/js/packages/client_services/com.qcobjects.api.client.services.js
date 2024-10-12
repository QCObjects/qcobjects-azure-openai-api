"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIClientService = void 0;
const qcobjects_1 = require("qcobjects");
class OpenAIClientService extends qcobjects_1.Service {
    constructor() {
        super();
        this.name = "openai";
        this.url = "https://api.openai.com/v1/chat/completions";
        this.external = true;
        this.cached = false;
        this.method = "POST";
        this.headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${qcobjects_1.CONFIG.get("OPENAI_API_KEY", "OPENAI_API_KEY")}`
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
exports.OpenAIClientService = OpenAIClientService;
