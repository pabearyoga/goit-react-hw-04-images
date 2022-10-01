import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import  Searchbar  from './Searchbar/Searchbar';
import 'react-toastify/dist/ReactToastify.css';
import  ImageGallery  from './ImageGallery/ImageGallery';


const App = () => {
  const [query, setQuery] = useState('');
  // const [page, setPage] = useState(1)

  const searchImg = tag => {
    if (query === tag) {
      toast.info('We already found it');
      return;
    }
    setQuery(tag);
  };

  return (
  <div className="App">
    <Searchbar onSubmit={searchImg} />
    <ImageGallery query={query} />
    <ToastContainer position="top-right" autoClose={2000} />
  </div>
);
}

export default App