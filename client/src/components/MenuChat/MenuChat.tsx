import React, { FC } from 'react'
import classes from './MenuChat.module.css'
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import useModal from '../../hooks/useModal';
import { ModalChat } from './ModalChat/ModalChat';

interface IMenuChatProps{
  
}

export const MenuChat: FC<IMenuChatProps> = ({}) => {// типы
    const {isOpenModal, onOpenModal, onCloseModal} = useModal();

  return (
    <div className={classes.menu}>
        <ModalChat isOpenModal={isOpenModal} onCloseModal={onCloseModal} />
        <div>Пока не придумал</div>
        <BsFillChatSquareDotsFill onClick={onOpenModal}/>
    </div>
  )
}
