import { Component } from 'react';
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

export class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
  };

  state = {
    images: null,
    totalHits: null,
    tags: '',
    page: null,
    largeIMG: null,
    status: STATUS.idle,
  };

  componentDidUpdate(prevProps, _) {
    const { page } = this.state;
    const { query } = this.props;

    if (prevProps.query !== query) {
      this.setState({ status: STATUS.loading });
      PixabayAPI(query, page)
        .then(({ data }) => {
          if (data.total === 0) {
            toast.error(
              'Sorry, matching your search query. Please try again.'
            );
            this.setState({ status: STATUS.error });
            return;
          }
          this.setState({
            images: data.hits,
            totalHits: data.totalHits,
            page: 1,
            tags: query,
            status: STATUS.success,
          });
        })
        .catch(error => {
          toast.error(error.message);
          this.setState({ status: STATUS.error });
        });
    }
  }

  handlerLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    const { tags, page } = this.state;
    PixabayAPI(tags, page + 1).then(({ data }) => {
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
      }));
    });
  };

  handlerOpenModal = (img, tag) => {
    this.setState({ largeIMG: { img, tag } });
  };

  handlerCloseModal = () => {
    this.setState({
      largeIMG: null,
    });
  };

  render() {
    const { images, status, totalHits, page, largeIMG } = this.state;
    return (
      <>
        {status === STATUS.loading && <Loader />}
        <ul className={css.ImageGallery}>
          {status === STATUS.success &&
            images.map(el => {
              return (
                <ImagesGallaryItem
                  key={el.id}
                  webformatURL={el.webformatURL}
                  tags={el.tags}
                  largeImageURL={el.largeImageURL}
                  handlerOpenModal={this.handlerOpenModal}
                />
              );
            })}
          {largeIMG && (
            <Modal largeIMG={largeIMG} onClose={this.handlerCloseModal} />
          )}
        </ul>
        {totalHits >= 12 * page && status === STATUS.success && (
          <Button onClick={this.handlerLoadMore} />
        )}
      </>
    );
  }
}
