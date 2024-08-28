import React, { FC } from 'react';
import classes from './ModalFloat.module.css';
import useModal from '../../hooks/useModal';

interface IModalFloatProps {
  controlElement: React.ReactNode;
  children: React.ReactNode;
};

export const ModalFloat: FC<IModalFloatProps> = ({ children, controlElement }) => {
  const { isOpenModal, onOpenModal, modalRef } = useModal();

  const rootState = [classes.modal];
  if (isOpenModal) {
    rootState.push(classes.active);
  }

  return (
    <div className={classes.controlElement} ref={modalRef}>
      <div onClick={onOpenModal}>
        {controlElement}
      </div>
      <div className={rootState.join(' ')} >
        {children}
      </div>
    </div>
  );
};
