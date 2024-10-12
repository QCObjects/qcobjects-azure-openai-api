import {Service, logger, CONFIG} from "qcobjects";

type StandardResponse = { 
  request: XMLHttpRequest;
  service: Service; 
};

const AZURE_OPENAI_API_KEY = CONFIG.get("AZURE_OPENAI_API_KEY", "<AZURE_OPENAI_API_KEY>");
const AZURE_OPENAI_ENDPOINT = CONFIG.get("AZURE_OPENAI_ENDPOINT", "<AZURE_OPENAI_ENDPOINT>");
const AZURE_OPENAI_DEPLOYMENT_NAME = CONFIG.get("AZURE_OPENAI_DEPLOYMENT_NAME", "<AZURE_OPENAI_DEPLOYMENT_NAME>");
const AZURE_OPENAI_API_VERSION = CONFIG.get("AZURE_OPENAI_API_VERSION", "<AZURE_OPENAI_API_VERSION>");

export class OpenAIClientService extends Service {
    name = "openai";
    url = `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${AZURE_OPENAI_API_VERSION}`;
    external = true;
    cached = false;
    method = "POST";
    headers = {
        "Content-Type": "application/json",
        "api-key": `${AZURE_OPENAI_API_KEY}`
    };

    data = {};


    withCredentials = false;

    constructor (){
      super();
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

    done({ service }: StandardResponse) {
      logger.debug(`Received from service call: ${service.template}`);
      const result:string = JSON.parse(service.template);
      service.template = result;
    }

}

