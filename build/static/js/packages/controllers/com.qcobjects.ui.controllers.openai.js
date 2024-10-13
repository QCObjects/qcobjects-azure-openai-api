"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotController = void 0;
const qcobjects_1 = require("qcobjects");
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
                botMessage.textContent = data.choices[0].message.content.trim();
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
