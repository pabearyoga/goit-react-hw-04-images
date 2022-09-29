import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImagesGallaryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  handlerOpenModal,
}) => {
  return (
    <>
      <li
        className={css.ImageGalleryItem}
        onClick={() => handlerOpenModal(largeImageURL, tags)}
      >
        <img
          src={webformatURL}
          alt={tags}
          className={css.ImageGalleryItem__image}
        />
      </li>
    </>
  );
};

ImagesGallaryItem.propsTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  handlerOpenModal: PropTypes.func.isRequired,
};
