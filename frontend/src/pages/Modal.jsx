import React from 'react';
import { useSelector } from 'react-redux';
import getModal from './Modal/index';

const Modal = () => {
  const modalInfo = useSelector((state) => state.modalsReducer.setModalInfo);
  if (!modalInfo.type) {
    return null;
  }
  // console.log(modalInfo);

  const Component = getModal(modalInfo.type);
  return <Component />;
};

export default Modal;
