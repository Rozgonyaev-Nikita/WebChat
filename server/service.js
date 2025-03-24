export function notification(data) { //{type: string, to: string, from: string}
    const { type, from, to } = data;
    
    switch(type) {
        case "addFriend":
          toUser.notification.push()
        default:
          //...
    }
}