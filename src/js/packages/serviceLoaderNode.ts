import { Service } from "qcobjects";

/* eslint-disable @typescript-eslint/no-var-requires */
const serviceLoaderNode = (service:Service):Promise<{request:any,service:Service}> => {
    return new Promise ((resolve, reject)=>{
        const https = require ("https");
        const url = new URL(service.url);
        
        const options = {
          "method": service.method,
          "hostname": url.hostname,
          "path": url.pathname + url.search,
          "headers": service.headers,
          "maxRedirects": 20
        };
        
        const req = https.request(options, function (res: { on: (arg0: string, arg1: { (chunk: any): void; (chunk: any): void; (error: any): void; }) => void; }) {
          const chunks: any[] | readonly Uint8Array[] = [];
        
          res.on("data", (chunk:any) => {
            (chunks as Array<any>).push(chunk);
          });
        
          res.on("end", () => {
            const body = Buffer.concat(chunks);
            service.template = body;
            service.done({request:req, service});
            resolve({request:req, service});
          });
        
          res.on("error", (error) => {
            reject(error);
          });
        });
        
        req.write(JSON.stringify(service.data));
        req.end();
    
    });
  
  };
  
  export default serviceLoaderNode;