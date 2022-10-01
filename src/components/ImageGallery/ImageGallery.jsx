import { useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

import { PixabayAPI } from 'servises/PixabayAPI';
import { ImagesGallaryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import  Modal  from 'components/Modal/Modal';

const STATUS = {
  idle: 'idle',
  loading: 'loading',
  error: 'error',
  success: 'success',
};

const ImageGallery = ({query}) => {
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [tags, setTags] = useState('');
  const [page, setPage] = useState(null);
  const [largeIMG, setLargeIMG] = useState(null);
  const [status, setStatus] = useState(STATUS.idle);

  useEffect(() => {
    if (tags !== query) {
      setImages([]);
    }
  }, [query, tags]);

  useEffect(() => {
    if (!query) {
      return
    }

    setStatus(STATUS.loading)

    PixabayAPI(query, page)
      .then(({ data }) => {
        if (data.total === 0) {
          toast.error(
            'Sorry, matching your search query. Please try again.'
          );

          setStatus(STATUS.error)
          setImages([]);
          setTotalHits(null);
          return;
        }
        
        setTags(query);
        setImages(prevState => [...prevState, ...data.hits]);
        setTotalHits(data.totalHits);
        setStatus(STATUS.success)
      })
      .catch(error => {
        toast.error(error.message);
        setStatus(STATUS.error)
      });

  }, [page, query])

  const handlerLoadMore = () => {
    setPage(prevState => (prevState + 1)); 
  } 

  const handlerOpenModal = (img, tag) => {
    setLargeIMG({img, tag})
  };

  const handlerCloseModal = () => {
    setLargeIMG(null)
  };

      return (
      <>
        {status === STATUS.loading && <Loader />}
        <ul className={css.ImageGallery}>
          {images.length > 0 &&
            images.map(el => {
              return (
                <ImagesGallaryItem
                  key={el.id}
                  webformatURL={el.webformatURL}
                  tags={el.tags}
                  largeImageURL={el.largeImageURL}
                  handlerOpenModal={handlerOpenModal}
                />
              );
            })}
          {largeIMG && (
            <Modal largeIMG={largeIMG} onClose={handlerCloseModal} />
          )}
        </ul>
        {totalHits >= 12 * page && status === STATUS.success && (
          <Button onClick={handlerLoadMore} />
        )}
      </>
    );

}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery