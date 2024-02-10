import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import LandingPage from './components/LandingPage';
import ScrollingPage from './components/ScrollingPage';


function App() {
  const [images, setImages] = useState([])
  const [sentences, setSentences] = useState([])
  const [stage, setStage] = useState([0])

  useEffect(()=>{
    // set dummy data
    setSentences([
      ["1st reel, 1st sentence", "1st reel, 2nd sentence", "1st reel, 3rd sentence"],
      ["2nd reel, 1st sentence", "2nd reel, 2nd sentence", "2nd reel, 3rd sentence", "2nd reel, 4th sentence"]
    ])
    setImages([
      ['./reel1img1.png', './reel1img1.png', './reel1img1.png'],
      ['./reel1img1.png', './reel1img1.png', './reel1img1.png', './reel1img1.png']
    ])
  }, [])

  return (
    <div className="App">
      {stage == 0 ?
      (<LandingPage />) : 
      (<ScrollingPage images={images} sentences={sentences} />)}
    </div>
  );
}

export default App;
