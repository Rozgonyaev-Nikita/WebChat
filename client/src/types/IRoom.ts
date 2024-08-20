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
    authorName?: string;
    text: string;
    date?: Date;
}

export interface IActionAdd {
    action: 'sendInvitation' | '';
}