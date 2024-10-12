"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qcobjects_1 = require("qcobjects");
const com_qcobjects_api_services_azure_1 = __importDefault(require("./packages/com.qcobjects.api.services.azure"));
(0, qcobjects_1.Package)("qcobjects-azure-openai-api", (0, qcobjects_1.Package)("com.qcobjects.api.services.azure.openai", [
    com_qcobjects_api_services_azure_1.default
]));
exports.default = com_qcobjects_api_services_azure_1.default;
