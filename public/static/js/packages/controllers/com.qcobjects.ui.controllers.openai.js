"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotController = void 0;
const qcobjects_1 = require("qcobjects");
const markdown_it_1 = __importDefault(require("markdown-it"));
const highlight_js_1 = __importDefault(require("highlight.js"));
require("highlight.js/styles/default.css");
const md = (0, markdown_it_1.default)({
    highlight(str, lang) {
        if (lang && highlight_js_1.default.getLanguage(lang)) {
            try {
                return "<pre><code class=\"hljs\">" +
                    highlight_js_1.default.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    "</code></pre>";
            }
            catch (__) { }
        }
        return "<pre><code class=\"hljs\">" + md.utils.escapeHtml(str) + "</code></pre>";
    }
});
class ChatbotController extends qcobjects_1.Controller {
    constructor(controllerParams) {
        super(controllerParams);
        const { component } = controllerParams;
        this.chatMessages = component.shadowRoot?.subelements("#chat-messages").pop();
        this.userInput = component.shadowRoot?.subelements("#user-input").pop();
    }
    closeChat() {
        this.component.body.remove();
    }
    sendMessage() {
        if (this.userInput.value.trim() !== "") {
            this.addMessage(this.userInput.value, "user");
            this.getBotResponse(this.userInput.value);
            this.userInput.value = "";
        }
    }
    addMessage(text, sender) {
        const message = document.createElement("div");
        message.textContent = text;
        message.classList.add("message", sender);
        this.chatMessages.appendChild(message);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    async getBotResponse(userMessage) {
        const botMessage = document.createElement("div");
        botMessage.textContent = "Typing...";
        botMessage.classList.add("message", "bot");
        this.chatMessages.appendChild(botMessage);
        const response = await fetch("/api/openai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "messages": [
                    {
                        "role": "system",
                        "content": [
                            {
                                "type": "text",
                                "text": userMessage
                            }
                        ]
                    }
                ],
                "temperature": 0.7,
                "top_p": 0.95,
                "max_tokens": 800
            })
        });
        try {
            const data = await response.json();
            if (typeof data.error !== "undefined") {
                botMessage.textContent = data.error.message;
            }
            else {
                const markdownText = data.choices[0].message.content.trim();
                const result = md.render(markdownText);
                botMessage.innerHTML = `<div class="content">${result}</div>`;
                botMessage.querySelectorAll("pre code").forEach((block) => {
                    highlight_js_1.default.highlightElement(block);
                });
            }
        }
        catch (e) {
            console.error(e);
            botMessage.textContent = "I'm sorry! I got an error connecting to the server.";
        }
        this.userInput.value = "";
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}
exports.ChatbotController = ChatbotController;
