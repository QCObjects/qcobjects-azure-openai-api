"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIClientService = void 0;
const qcobjects_1 = require("qcobjects");
const AZURE_OPENAI_API_KEY = qcobjects_1.CONFIG.get("AZURE_OPENAI_API_KEY", "<AZURE_OPENAI_API_KEY>");
const AZURE_OPENAI_ENDPOINT = qcobjects_1.CONFIG.get("AZURE_OPENAI_ENDPOINT", "<AZURE_OPENAI_ENDPOINT>");
const AZURE_OPENAI_DEPLOYMENT_NAME = qcobjects_1.CONFIG.get("AZURE_OPENAI_DEPLOYMENT_NAME", "<AZURE_OPENAI_DEPLOYMENT_NAME>");
const AZURE_OPENAI_API_VERSION = qcobjects_1.CONFIG.get("AZURE_OPENAI_API_VERSION", "<AZURE_OPENAI_API_VERSION>");
class OpenAIClientService extends qcobjects_1.Service {
    constructor() {
        super();
        this.name = "openai";
        this.url = `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${AZURE_OPENAI_API_VERSION}`;
        this.external = true;
        this.cached = false;
        this.method = "POST";
        this.headers = {
            "Content-Type": "application/json",
            "api-key": `${AZURE_OPENAI_API_KEY}`
        };
        this.data = {};
        this.withCredentials = false;
        this.data = {
            "messages": [
                {
                    "role": "system",
                    "content": [
                        {
                            "type": "text",
                            "text": "You are an AI assistant that helps people find information."
                        }
                    ]
                }
            ],
            "temperature": 0.7,
            "top_p": 0.95,
            "max_tokens": 800
        };
    }
    done({ service }) {
        qcobjects_1.logger.debug(`Received from service call: ${service.template}`);
        const result = JSON.parse(service.template);
        service.template = result;
    }
}
exports.OpenAIClientService = OpenAIClientService;
