import {Service, logger, CONFIG} from "qcobjects";

type StandardResponse = { 
  request: XMLHttpRequest;
  service: Service; 
};

export class OpenAIClientService extends Service {
    name = "openai";
    url = "https://api.openai.com/v1/chat/completions";
    external = true;
    cached = false;
    method = "POST";
    headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CONFIG.get("OPENAI_API_KEY", "OPENAI_API_KEY")}`
    };

    data = {};


    withCredentials = false;

    constructor (){
      super();
      this.data = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": "hello world!"}],
        "temperature": 0.7
      };
    }

    done({ service }: StandardResponse) {
      logger.debug(`Received from service call: ${service.template}`);
      const result:string = JSON.parse(service.template);
      service.template = result;
    }

}

