import { IUser } from "./IUser";

export interface IRoom {
    _id: string;
    type: 'private' | 'group';
    nameRoom?: string;
    users: IUser[];
    avatar: string;
    messages: IMessage[];
    lastMessage: IMessage;
}

export interface IMessage {
    _id?: object;
    author: IUser;
    text: string;
    date?: Date;
    read: boolean;
}

export interface IActionAdd {
    action: 'sendInvitation' | '';
}