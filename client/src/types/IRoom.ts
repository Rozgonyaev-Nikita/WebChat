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

export interface IUser {
    _id: string;
    login: string;
    password: string;
    rooms: string[];
    friends: IFriends;
}

export interface IFriends {
    myFriends: string[];
    request: string[];
    offer: string[];
}