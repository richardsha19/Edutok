import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import LandingPage from './components/LandingPage';
import ScrollingPage from './components/ScrollingPage';


function App() {
  const [responseData, setResponseData] = useState([])
  const [stage, setStage] = useState([0])

  return (
    <div className="App">
      {stage == 0 ?
      (<LandingPage></LandingPage>) : 
      (<ScrollingPage></ScrollingPage>)}
    </div>
  );
}

export default App;
