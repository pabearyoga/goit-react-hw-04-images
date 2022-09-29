import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    largeIMG: PropTypes.shape({
      img: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    }),
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handelCloseModal);
    window.addEventListener('click', this.handelCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelCloseModal);
    window.removeEventListener('click', this.handelCloseModal);
  }

  handelCloseModal = event => {
    if (event.code === 'Escape' || event.target.id === 'Overlay') {
      this.props.onClose();
    }
  };
  
  render() {
    const { largeIMG } = this.props;
    return (
      <div className={css.Overlay} id="Overlay">
        <div className={css.Modal}>
          <img src={largeIMG.img} alt={largeIMG.tag} />
        </div>
      </div>
    );
  }
}
