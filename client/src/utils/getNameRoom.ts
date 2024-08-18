import { IRoom } from "../types/IRoom";

const getNameRoom = (item: IRoom, userId: string) => {
  console.log(item, userId)
  console.log('userId', userId)
  console.log('type', item.type)
    if(item.type === 'private'){
        // const userNames = item.nameRoom.split(' ') as [string, string];
        const nameOther = item.nameRoom.replace(userId, '').trim();
        console.log('nameOther', nameOther);
        return nameOther;
      } 
      else if(item.type === 'group'){
        return item.nameRoom;
      }
}

export default getNameRoom;