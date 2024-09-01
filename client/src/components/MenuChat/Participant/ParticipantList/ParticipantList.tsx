import React, { FC } from 'react'
import { useGetMyFriendsByLoginQuery } from '../../../../store/userApi'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import List from '../../../List/List';
import { ParticipantItem } from '../ParticipantItem/ParticipantItem';

interface IParticipantListProps{

}

export const ParticipantList: FC<IParticipantListProps> = () => {
  

  

  return (
    <div>
      {/* <List items={friends} renderItem={(friend) => <ParticipantItem/>}/> */}
    </div>
  )
}
