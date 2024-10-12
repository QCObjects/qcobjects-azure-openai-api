"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const serviceLoaderNode = (service) => {
    return new Promise((resolve, reject) => {
        const https = require("https");
        const url = new URL(service.url);
        const options = {
            "method": service.method,
            "hostname": url.hostname,
            "path": url.pathname + url.search,
            "headers": service.headers,
            "maxRedirects": 20
        };
        const req = https.request(options, function (res) {
            const chunks = [];
            res.on("data", (chunk) => {
                chunks.push(chunk);
            });
            res.on("end", () => {
                const body = Buffer.concat(chunks);
                service.template = body;
                service.done({ request: req, service });
                resolve({ request: req, service });
            });
            res.on("error", (error) => {
                reject(error);
            });
        });
        req.write(JSON.stringify(service.data));
        req.end();
    });
};
exports.default = serviceLoaderNode;
