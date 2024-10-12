"use strict";

import { BackendMicroservice, CONFIG, logger, Microservice, Service } from "qcobjects";
import {OpenAIClientService} from "./client_services/com.qcobjects.api.client.services";
import serviceLoaderNode from "./serviceLoaderNode";

class OpenAIAPI extends BackendMicroservice {

  post(formData?: object | string): void {
    const clientService = new OpenAIClientService();
    if (typeof formData !== "undefined") {
      clientService.data = JSON.parse(formData as string);
    }
    serviceLoaderNode(clientService)
    .then(({service})=>{
      logger.debug(`Received from OpenAI: ${service.template}`);
      this.body = service.template;
    }).catch((error:any) => {
      logger.debug(`An error ocurred: ${error as string}`);
      this.body = error as string;
    }).finally(()=>{
      this.done();
    });

  }

}

export default OpenAIAPI;