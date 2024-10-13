import {  Controller, ControllerParams } from "qcobjects";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";

const md = MarkdownIt({
    highlight (str, lang):string {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return "<pre><code class=\"hljs\">" +
                 hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                 "</code></pre>";
        } catch (__) {}
      }
  
      return "<pre><code class=\"hljs\">" + md.utils.escapeHtml(str) + "</code></pre>";
    }
  });

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
                  }
            )
        });

        try {
            const data = await response.json();
            if (typeof data.error !== "undefined"){
                botMessage.textContent = data.error.message;
            } else {
                const markdownText = data.choices[0].message.content.trim();
                const result = md.render(markdownText);
                botMessage.innerHTML = `<div class="content">${result}</div>`;
                botMessage.querySelectorAll("pre code").forEach((block) => {
                    hljs.highlightElement(block as HTMLElement);
                });
            }
        } catch (e) {
            console.error(e);
            botMessage.textContent = "I'm sorry! I got an error connecting to the server.";

        }

        this.userInput.value = "";
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}
