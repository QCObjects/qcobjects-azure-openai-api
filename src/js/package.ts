import { Package } from "qcobjects";
import AzureOpenAIAPI from "./packages/com.qcobjects.api.services.azure";

Package("qcobjects-azure-openai-api", 
Package("com.qcobjects.api.services.azure.openai",[
    AzureOpenAIAPI
]) as Array<never>);

export default AzureOpenAIAPI;