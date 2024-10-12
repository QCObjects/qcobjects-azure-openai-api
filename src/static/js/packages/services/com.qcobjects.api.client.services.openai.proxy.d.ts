import { Service } from "qcobjects";
type StandardResponse = {
    request: XMLHttpRequest;
    service: Service;
};
export declare class ProxyOpenAIService extends Service {
    name: string;
    url: string;
    external: boolean;
    cached: boolean;
    method: string;
    headers: {
        "Content-Type": string;
    };
    data: {};
    withCredentials: boolean;
    constructor();
    done({ service }: StandardResponse): void;
}
export {};
