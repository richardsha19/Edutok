import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import LandingPage from './components/LandingPage';
import ScrollingPage from './components/ScrollingPage';
import reel1img1 from './reel1img1.png'
import reel1img2 from './reel1img2.png'
import reel1img3 from './reel1img3.png'


function App() {
  const [stage, setStage] = useState([0])
  const [beginPage, setBeginPage] = useState(3)
  const [endPage, setEndPage] = useState(6)
  const [response, setResponse] = useState(null);
  const [data, setData] = useState([])
  const [pdfName, setPdfName] = useState("ap-b")

  const responseToData = async (pdfName, beginPage, endPage, response) => {
    const reels = await response["ap-psych"]["filename"]["indices"]
    let data = []
    console.log("lengthhi" + Object.entries(reels).length);
    for (const [key, reel] of Object.entries(reels)) {
      let slide = [];
      console.log("length" + reel.image.length);
      for (let j = 0; j < reel.image.length; j++) {
        slide.push([reel.text, reel.image[j]])
      }
      data.push(slide);

    }
    // for (let i = 0; i < texts.length; i++) {
    //   let singleReel = []
    //   for (let j = 0; j < texts[i].length; j++) {
    //     const entry = [texts[i][j], images[i][j]];;
    //     singleReel.push(entry)
    //   }
    //   data.push(singleReel)
    // }
    console.log(data);
    return data;
  }

  const getData = async () => {
    if (response) {

    await setData(await responseToData(pdfName, beginPage, endPage, response));
    }
  }

  useEffect(()=>{
    getData();
  }, [response])

  return (
    <div className="App bg-black">
      {stage == 0 ?
      (<LandingPage setPdfName = {setPdfName} setStage = {setStage} setBeginPage = {setBeginPage} setEndPage = {setEndPage} setResponse = {setResponse} />) : 
      (<ScrollingPage data = {data} />)}

    </div>
  );
}

export default App;
