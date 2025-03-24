export interface IFriends {
    myFriends: string[];
    request: string[];
    offer: string[];
    wait: string[]
}

export interface IUser {
    _id: string;
    login: string;
    password: string;
    rooms: string[];
    friends: IFriends;
    notifications: INotification[];
    avatar?: string;
}

export interface INotification{ 
    id?: string;
    type: 'addFriend';// или
    from: IUser;
    to: string;
    viewed?: boolean;
}

export interface INotification2{ // получает только login avatar
    id?: string;
    type: 'addFriend';// или
    from: string;
    to: string;
    viewed?: boolean;
}

export interface IUserOnline extends IUser {
    isOnline: boolean
  }