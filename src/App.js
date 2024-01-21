import React, {useCallback, useState} from 'react';
import Button from './components/UI/Button/Button';
import './App.css';
import DemoOutput from './components/Demo/DemoOutput';

function App() {
  const [showParagraph, updateParagraph] = useState(false)
  const [allowToggle, updateToggle] = useState(false);

 const  toggleParagraphhandler = useCallback(() => {
  console.log('clicked')
  if (allowToggle) {
    updateParagraph((prevState) => !prevState); 
  }
  },[allowToggle]);

  const allowToggleHandler =() => {
    console.log(allowToggle)
    updateToggle((prevState) => !prevState);
  }
  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show = {showParagraph}></DemoOutput>
      <Button onClick={allowToggleHandler}>Allow Toggle </Button>
      <Button onClick={toggleParagraphhandler}>toggle paragraph </Button>
    </div>
  );
}

export default App;
