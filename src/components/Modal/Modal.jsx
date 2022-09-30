import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ largeIMG, onClose }) => {
  
  useEffect(() => {
    window.addEventListener('keydown', event => {
      if (event.code === 'Escape' || event.target.id === 'Overlay') {
        onClose();
      }
    });

    return window.removeEventListener('keydown', event => {
      if (event.code === 'Escape') {
        onClose();
      }
    });
  }, [onClose]);

  const handelCloseModal = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };


  return (
    <div className={css.Overlay} id="Overlay" onClick={handelCloseModal}>
      <div className={css.Modal}>
        <img src={largeIMG.img} alt={largeIMG.tag} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  largeIMG: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal