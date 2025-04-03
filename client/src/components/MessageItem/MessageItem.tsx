import React, { FC } from 'react'
import { IMessage } from '../../types/IRoom'
import classes from './MessageItem.module.css'
import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from "react-icons/io5";
import { Avatar, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface IMessageItemProps {
    message: IMessage,
    whose: 'my' | 'alien',
}

export const MessageItem: FC<IMessageItemProps> = ({ message, whose }) => {
    const formattedTime = new Date(message.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = new Date(message.date).toLocaleDateString();
    
    return (
        <div className={`${classes.messageContainer} ${whose === 'my' ? classes.myMessageContainer : classes.alienMessageContainer}`}>
            {whose === 'alien' && (
                <div className={classes.avatar}>
                    <Avatar 
                        size="small" 
                        icon={<UserOutlined />} 
                        src={message.author.avatar} 
                    />
                </div>
            )}
            
            <div className={`${classes.messageContent} ${whose === 'my' ? classes.myMessage : classes.alienMessage}`}>
                {whose === 'alien' && (
                    <div className={classes.authorName}>{message.author.login}</div>
                )}
                
                <div className={classes.messageBubble}>
                    <div className={classes.messageText}>{message.text}</div>
                    
                    <div className={classes.messageMeta}>
                        <Tooltip title={formattedDate}>
                            <span className={classes.messageTime}>{formattedTime}</span>
                        </Tooltip>
                        {whose === 'my' && (
                            <span className={classes.readStatus}>
                                {message.read ? (
                                    <IoCheckmarkDoneOutline className={classes.readIcon} />
                                ) : (
                                    <IoCheckmarkOutline className={classes.unreadIcon} />
                                )}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}