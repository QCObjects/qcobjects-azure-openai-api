"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatbotComponent = exports.ChatBotComponent = void 0;
exports.sendMessage = sendMessage;
exports.sendIfEnterKey = sendIfEnterKey;
exports.closeChatbot = closeChatbot;
const qcobjects_1 = require("qcobjects");
const com_qcobjects_ui_controllers_openai_1 = require("../controllers/com.qcobjects.ui.controllers.openai");
class ChatBotComponent extends qcobjects_1.Component {
    constructor() {
        super(...arguments);
        this.tplsource = "inline";
        this.shadowed = true;
        this.template = `
    <style>

        pre code.hljs {
        display: block;
        overflow-x: auto;
        padding: 1em
        }
        code.hljs {
        padding: 3px 5px
        }
        /*

        Dark style from softwaremaniacs.org (c) Ivan Sagalaev <Maniac@SoftwareManiacs.Org>

        */
        .hljs {
        color: #ddd;
        background: #303030
        }
        .hljs-keyword,
        .hljs-selector-tag,
        .hljs-literal,
        .hljs-section,
        .hljs-link {
        color: white
        }
        .hljs-subst {
        /* default */

        }
        .hljs-string,
        .hljs-title,
        .hljs-name,
        .hljs-type,
        .hljs-attribute,
        .hljs-symbol,
        .hljs-bullet,
        .hljs-built_in,
        .hljs-addition,
        .hljs-variable,
        .hljs-template-tag,
        .hljs-template-variable {
        color: #d88
        }
        .hljs-comment,
        .hljs-quote,
        .hljs-deletion,
        .hljs-meta {
        color: #979797
        }
        .hljs-keyword,
        .hljs-selector-tag,
        .hljs-literal,
        .hljs-title,
        .hljs-section,
        .hljs-doctag,
        .hljs-type,
        .hljs-name,
        .hljs-strong {
        font-weight: bold
        }
        .hljs-emphasis {
        font-style: italic
        }


        body {
            font-family: 'Roboto', sans-serif;
            background-color: #e5ddd5;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .chat-container {
            width: 100%;
            height: 100%;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: scroll;
            display: flex;
            flex-direction: column;
            bottom: 0;
            right:0;
            left:0;
            position: fixed;
        }
        .chat-header {
            width: 100%;
            top:0;
            position: fixed;
            background-color: #075e54;
            color: #fff;
            padding: 15px;
            text-align: center;
            font-size: 1.2em;
        }
        .chat-messages {
            padding: 15px;
            flex: 1;
            overflow-y: scroll;
            display: flex;
            flex-direction: column;
            background-color: #e5ddd5;
            padding-bottom: 100px;
            padding-top: 100px;
        }
        .chat-input {
            width: 100%;
            position: fixed;
            display: flex;
            border-top: 1px solid #ddd;
            bottom:0;
        }
        .chat-input input {
            flex: 1;
            padding: 15px;
            border: none;
            border-radius: 0;
            font-size: 1em;
        }
        .chat-input button {
            padding: 15px;
            background-color: #075e54;
            color: #fff;
            border: none;
            cursor: pointer;
            font-size: 1em;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .chat-input button img {
            width: 20px;
            height: 20px;
        }
        .message {
            margin: 10px 0;
            padding: 10px;
            border-radius: 10px;
            max-width: 70%;
        }
        .message.user {
            align-self: flex-end;
            background-color: #dcf8c6;
        }
        .message.bot {
            align-self: flex-start;
            background-color: #fff;
            border: 1px solid #ddd;
        }

        .chat-close-button 
        {
            color: white;
            position: absolute;
            top: 1px;
            right: 1px;
            background-color: transparent;
            border: none;
            font-size: 24px;
            cursor: pointer;
            z-index: 99999;
            border-radius: 50%;
            padding: 12px;
        }
        .content {
            overflow:auto;
        }


    </style>

        <div class="chat-container">
            <div class="chat-close-button" onclick="global.get('closeChatbot')()">⬇️</div>
            <div class="chat-header">QCObjects OpenAI Chatbot</div>
            <div class="chat-messages" id="chat-messages"></div>
            <div class="chat-input">
                <input type="text" id="user-input" placeholder="Type a message...">
                <button onclick="global.get('chatbotSendMessage')()">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/send.png" alt="Send">
                </button>
            </div>
        </div>
    `;
    }
    done(standardResponse) {
        const userInput = this.shadowRoot?.subelements("#user-input").pop();
        userInput?.addEventListener("keyup", (event) => {
            sendIfEnterKey(event);
        });
        return super.done(standardResponse);
    }
}
exports.ChatBotComponent = ChatBotComponent;
exports.chatbotComponent = new ChatBotComponent({ name: "chatbot" });
function sendMessage() {
    exports.chatbotComponent.controller = new com_qcobjects_ui_controllers_openai_1.ChatbotController({ component: exports.chatbotComponent });
    const chatbot = exports.chatbotComponent.controller;
    chatbot.sendMessage();
}
function sendIfEnterKey(event) {
    if (typeof event.key !== "undefined" && event.key === "Enter") {
        sendMessage();
    }
}
function closeChatbot() {
    exports.chatbotComponent.controller = new com_qcobjects_ui_controllers_openai_1.ChatbotController({ component: exports.chatbotComponent });
    const chatbot = exports.chatbotComponent.controller;
    chatbot.closeChat();
}
qcobjects_1.global.set("chatbotSendMessage", sendMessage);
qcobjects_1.global.set("closeChatbot", closeChatbot);
qcobjects_1.global.set("sendIfEnterKey", sendIfEnterKey);
