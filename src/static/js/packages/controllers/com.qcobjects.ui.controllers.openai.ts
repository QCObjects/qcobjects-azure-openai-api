import {  Controller, ControllerParams } from "qcobjects";

export class ChatbotController extends Controller {
    chatMessages: any;
    userInput: any;
    
    constructor(controllerParams:ControllerParams) {
        super(controllerParams);
        const {component} = controllerParams;
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

    addMessage(text:string, sender:string) {
        const message = document.createElement("div");
        message.textContent = text;
        message.classList.add("message", sender);
        this.chatMessages.appendChild(message);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    async getBotResponse(userMessage:string) {
        const botMessage = document.createElement("div");
        botMessage.textContent = "Typing...";
        botMessage.classList.add("message", "bot");
        this.chatMessages.appendChild(botMessage);

        const response = await fetch("/api/openai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "model": "gpt-4o-mini",
                    "messages": [{"role": "user", "content": userMessage}],
                    "temperature": 0.7
                }
            )
        });

        try {
            const data = await response.json();
            if (typeof data.error !== "undefined"){
                botMessage.textContent = data.error.message;
            } else {
                botMessage.textContent = data.choices[0].text.trim();
            }
        } catch (e) {
            console.error(e);
            botMessage.textContent = "I'm sorry! I got an error connecting to the server.";

        }

        this.userInput.value = "";
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}
