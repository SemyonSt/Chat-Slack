import React from 'react';
import getModal from './Modal/index';

const Modal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }
  // console.log(modalInfo);

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} />;
};

export default Modal;
