import { Package } from "qcobjects";
import OpenAIAPI from "./packages/com.qcobjects.api.services";

Package("qcobjects-openai-api", 
Package("com.qcobjects.api.services.openai",[
    OpenAIAPI
]) as Array<never>);

export default OpenAIAPI;