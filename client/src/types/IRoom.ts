import { IUser } from "./IUser";

export interface IRoom {
    _id: string;
    type: 'private' | 'group';
    nameRoom?: string;
    users: IUser[];
    messages: IMessage[];
    lastMessage: IMessage;
}

export interface IMessage {
    _id?: object;
    author: IUser;
    text: string;
    date?: Date;
}

export interface IActionAdd {
    action: 'sendInvitation' | '';
}