import { Component } from "qcobjects";
declare class ChatBotComponent extends Component {
    tplsource: string;
    shadowed: boolean;
    template: string;
}
declare const chatbotComponent: ChatBotComponent;
declare function sendMessage(): void;
export { chatbotComponent, ChatBotComponent, sendMessage };
