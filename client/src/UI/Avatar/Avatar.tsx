import React, { FC } from 'react'
import classes from './Avatar.module.css'
import avatarDefault from '../../images/avatarDefault.webp'

export enum ESize {
    MICRO = '30px',
    MIN = '40px',
    MEDIUM = '60px',
}

interface IAvatarProps{
  avatar: string,
  className?: string
  size: ESize,
}

export const Avatar: FC<IAvatarProps> = ({avatar, size, className}) => {
  return (
    (avatar 
    ? <img className={`${classes.avatar} ${className}`} style={{height: size, width: size}} src={avatar} alt="картинка" /> 
    : <img className={`${classes.avatar} ${className}`} style={{height: size, width: size}} src={avatarDefault}/> )
  )
}