import React, { FC } from 'react'
import classes from './MyModal.module.css'

interface IMyModalPorps {
  children: React.ReactNode;
  isOpenModal: boolean;
  close: () => void;
}

export const MyModal: FC<IMyModalPorps> = ({ children, isOpenModal, close }) => {

  const rootState = [classes.wrapper];
  if (isOpenModal) {
    rootState.push(classes.active);
  }
  return (
    <div className={rootState.join(' ')} onClick={close}>
      <div className={classes.main} onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}
