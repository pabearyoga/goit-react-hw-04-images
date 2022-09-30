import { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

 const Searchbar = ({onSubmit}) => {
  const [value, setValue] = useState('')
  
  const handleChange = evt => {
    setValue(evt.currentTarget.value.toLowerCase())
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (value.trim() === '') {
      toast.info('Введіть щось !');
      return;
    }
    
    onSubmit(value);
    setValue('');
  };


    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchForm__button}>
            Search
          </button>

          <input
            className={css.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={handleChange}
          />
        </form>
      </header>
    );

 }

export default Searchbar
// export default Searchbar
// export class Searchbar extends Component {
//   static propTypes = {
//     onSubmit: PropTypes.func,
//   };

//   state = {
//     value: '',
//   };

  // handleChange = evt => {
  //   this.setState({ value: evt.currentTarget.value.toLowerCase() });
  // };

  // handleSubmit = evt => {
  //   evt.preventDefault();

  //   if (this.state.value.trim() === '') {
  //     toast.info('Введіть щось !');
  //     return;
  //   }
    
  //   this.props.onSubmit(this.state.value);
  //   this.setState({ value: '' });
  // };

  // render() {
  //   const { value } = this.state;
  //   return (
  //     <header className={css.Searchbar}>
  //       <form className={css.SearchForm} onSubmit={this.handleSubmit}>
  //         <button type="submit" className={css.SearchForm__button}>
  //           Search
  //         </button>

  //         <input
  //           className={css.SearchForm__input}
  //           type="text"
  //           autoComplete="off"
  //           autoFocus
  //           placeholder="Search images and photos"
  //           value={value}
  //           onChange={this.handleChange}
  //         />
  //       </form>
  //     </header>
  //   );
//   }
// }
