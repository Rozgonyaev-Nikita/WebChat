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
    avatar?: string;
}

export interface IUserOnline extends IUser {
    isOnline: boolean
  }