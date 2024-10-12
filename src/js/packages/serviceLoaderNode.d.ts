import { Service } from "qcobjects";
declare const serviceLoaderNode: (service: Service) => Promise<{
    request: any;
    service: Service;
}>;
export default serviceLoaderNode;
