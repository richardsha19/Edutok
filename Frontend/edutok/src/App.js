import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import LandingPage from './components/LandingPage';
import ScrollingPage from './components/ScrollingPage';
import reel1img1 from './reel1img1.png'
import TextToSpeech from './components/TextToSpeech';


function App() {
  const [stage, setStage] = useState([1])
  const [data, setData] = useState([])

  useEffect(()=>{
    // set dummy data
    setData([
      [
        ["sentence1 Welcome to the website. If you're here, you're likely looking to find random words.", reel1img1], ["Random Word Generator is the perfect tool to help you do this. While this tool isn't a word creator,", reel1img1]
      ], 
    
      [
        ["Another option you have is choosing the number of syllables of the words or the word length of the randomized words. ", reel1img1], ["You have the option of choosing the types of words you want to be displayed using the dropdown.", reel1img1]
      ],
      [
        ["Another option you have is choosing the number of syllables of the words or the word length of the randomized words. ", reel1img1], ["You have the option of choosing the types of words you want to be displayed using the dropdown.", reel1img1]
      ],
      [
        ["Another option you have is choosing the number of syllables of the words or the word length of the randomized words. ", reel1img1], ["You have the option of choosing the types of words you want to be displayed using the dropdown.", reel1img1]
      ]
    
    ])
  }, [])

  return (
    <div className="App">
      {stage == 0 ?
      (<LandingPage />) : 
      (<ScrollingPage data = {data} />)}

    </div>
  );
}

export default App;
