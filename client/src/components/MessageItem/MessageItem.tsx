import React, { FC } from 'react'
import {IMessage} from '../../types/IRoom'

interface IMessageItemProps {
    message: IMessage,
}

export const MessageItem: FC<IMessageItemProps> = ({message}) => {
  return (
    <div>
        {message.text}
    </div>
  )
}
