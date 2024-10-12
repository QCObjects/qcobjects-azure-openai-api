import { logger, Service } from "qcobjects";

type StandardResponse = {
    request: XMLHttpRequest;
    service: Service;
};
export default class ProxyOpenAIService extends Service {
    name = "openaiproxy";
    url = "/api/openai";
    external = false;
    cached = false;
    method = "POST";
    headers = {
        "Content-Type": "application/json"
    };

    data = {};


    withCredentials = false;

    constructor() {
        super();
        this.data = {
            "model": "gpt-4o-mini",
            "messages": [{ "role": "user", "content": "hello world!" }],
            "temperature": 0.7
        };
    }

    done({ service }: StandardResponse) {
        logger.debug(`Received from service call: ${service.template}`);
        const result: string = JSON.parse(service.template);
        service.template = result;
    }

}