import React, { FC } from 'react'
import classes from './MyModal.module.css'

interface IMyModalPorps {
  children: React.ReactNode;
  visableModal: boolean; 
  setVisableModal: (visableModal: boolean) => void;
}

export const MyModal: FC<IMyModalPorps> = ({children, visableModal, setVisableModal}) => {

  const rootState = [classes.wrapper];
    if(visableModal){
        rootState.push(classes.active);
    }
  return (
    <div className={rootState.join(' ')} onClick={() => setVisableModal(false)}>
        <div className={classes.main} onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}
