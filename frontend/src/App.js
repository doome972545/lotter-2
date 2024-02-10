import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Home from './page/Home';

function App() {
  const [selectItem, setSelectItem] = useState()

  return (

    <Home />

  );
}

export default App;
