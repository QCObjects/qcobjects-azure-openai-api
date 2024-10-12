import { Component, ControllerParams, global} from "qcobjects";
import { ChatbotController } from "../controllers/com.qcobjects.ui.controllers.openai";

export class ChatBotComponent extends Component {
   
    tplsource = "inline";
    shadowed = true;
    template = `
    <style>
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
            overflow: hidden;
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
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            background-color: #e5ddd5;
            justify-content: flex-end;
        }
        .chat-input {
            display: flex;
            border-top: 1px solid #ddd;
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

export const chatbotComponent = new ChatBotComponent({name:"chatbot"});


export function sendMessage() {
    chatbotComponent.controller = new ChatbotController({component:chatbotComponent} as ControllerParams);
    const chatbot = chatbotComponent.controller as ChatbotController;
    chatbot.sendMessage();
}

export function closeChatbot() {
    chatbotComponent.controller = new ChatbotController({component:chatbotComponent} as ControllerParams);
    const chatbot = chatbotComponent.controller as ChatbotController;
    chatbot.closeChat();
}
global.set("chatbotSendMessage", sendMessage);
global.set("closeChatbot", closeChatbot);

