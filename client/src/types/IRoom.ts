export interface IRoom {
    _id: string;
    type: 'private' | 'group';
    nameRoom?: string;
    users: string[];
    messages: IMessage[];
    lastMessage: IMessage;
}

export interface IMessage {
    _id?: object;
    authorName?: string;
    text: string;
    date?: Date;
}