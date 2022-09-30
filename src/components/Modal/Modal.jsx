import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({largeIMG, onClose}) => {
  useEffect(() => {
    window.addEventListener('keydown', handelCloseModal);
    window.addEventListener('click', handelCloseModal);

    return () => {
      window.addEventListener('keydown', handelCloseModal);
      window.addEventListener('click', handelCloseModal);
    }

  }, [() => handelCloseModal]);

  const handelCloseModal = event => {
    if (event.code === 'Escape' || event.target.id === 'Overlay') {
    onClose();
    }
  };


  return (
    <div className={css.Overlay} id="Overlay">
      <div className={css.Modal}>
        <img src={largeIMG.img} alt={largeIMG.tag} />
      </div>
    </div>
  );
}

export default Modal