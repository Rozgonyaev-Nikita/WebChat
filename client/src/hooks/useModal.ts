import { useEffect, useRef, useState } from 'react';

const useModal = () => {
  const [isOpenModal, setModalOpen] = useState<boolean>(false);
  
  const modalRef = useRef<HTMLDivElement | null>(null);

  const onOpenModal = (): void => {
    setModalOpen(true);
  };

  const onCloseModal = (): void => {
    setModalOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onCloseModal();
    }
  };

  useEffect(() => {
    if (isOpenModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenModal]);

  return { isOpenModal, onOpenModal, onCloseModal, modalRef };
};

export default useModal;
