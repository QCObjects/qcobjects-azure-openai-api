import { BackendMicroservice } from "qcobjects";
declare class OpenAIAPI extends BackendMicroservice {
    post(formData?: object | string): void;
}
export default OpenAIAPI;
