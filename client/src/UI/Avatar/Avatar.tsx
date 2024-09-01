import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import classes from './Avatar.module.css'
import avatarDefault from '../../images/avatarDefault.webp'

export enum ESize {
    MICRO = '30px',
    MIN = '40px',
    MEDIUM = '60px',
}

interface IAvatarProps extends DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  avatar: string;
  size?: ESize;
  className?: string;
}

export const Avatar: FC<IAvatarProps> = ({avatar, size  = ESize.MIN, className}) => {
  return (
    (avatar 
    ? <img className={`${classes.avatar} ${className}`} style={{height: size, width: size}} src={avatar} alt="картинка" /> 
    : <img className={`${classes.avatar} ${className}`} style={{height: size, width: size}} src={avatarDefault}/> )
  )
}