import { IRoom } from "../types/IRoom";

const getNameRoom = (item: IRoom, userId: string) => {
    if(item.type === 'private'){
        // const userNames = item.nameRoom.split(' ') as [string, string];
        const nameOther = item.nameRoom.replace(userId, '').trim();
        return nameOther;
      } 
      else if(item.type === 'group'){
        return item.nameRoom;
      }
}

export default getNameRoom;