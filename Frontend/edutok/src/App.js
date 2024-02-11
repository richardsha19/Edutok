import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import LandingPage from './components/LandingPage';
import ScrollingPage from './components/ScrollingPage';
import reel1img1 from './reel1img1.png'
import reel1img2 from './reel1img2.png'
import reel1img3 from './reel1img3.png'


function App() {
  const [stage, setStage] = useState([1])
  const [beginPage, setBeginPage] = useState(3)
  const [endPage, setEndPage] = useState(6)
  const [response, setResponse] = useState(null);
  const [data, setData] = useState([])
  const [pdfName, setPdfName] = useState("ap-b")

  const responseToData = (pdfName, beginPage, endPage, res) => {
    const imgAndText = res["PDFs"][pdfName]["filename"]["indices"][`${beginPage}__${endPage}`]
    const images = imgAndText.image;
    const texts = imgAndText.text;
    console.log(texts)
    let data = []
    for (let i = 0; i < texts.length; i++) {
      let singleReel = []
      for (let j = 0; j < texts[i].length; j++) {
        const entry = [texts[i][j], images[i][j]];;
        singleReel.push(entry)
      }
      data.push(singleReel)
    }
    return data;
  }

  useEffect(()=>{
    // set dummy data
    const dummyResponse = {
      "PDFs": {
        "ap-b": {
          "filename": {
            "indices": {
              "3__6": {
                image:[[reel1img3, reel1img2], [reel1img3, reel1img2, reel1img1]],
                text:[["i am text 0.0", "i am text 0.1"], ["i am text 1.0", "i am text 1.1", "i am text 1.2"]]
              },
              "6__9": {
                image:["i am img 1.0", "i am img 1.1", "i am img 1.2"],
                text:["i am text 1.0", "i am text 1.1", "i am text 1.2"]
              }
            }
          }
        }
      }
    }
    setResponse(dummyResponse);

    setData(responseToData(pdfName, beginPage, endPage, dummyResponse));
    // convert data to favorable form



    // setData([
    //   [
    //     ["page 1 sentence1 Welcome to the website. If you're here, you're likely looking to find random words.", reel1img1], ["Random Word Generator is the perfect tool to help you do this. While this tool isn't a word creator,", reel1img2]
    //   ], 
    
    //   [
    //     ["page 2 Another option you have is choosing the number of syllables of the words or the word length of the randomized words. ", reel1img1], ["You have the option of choosing the types of words you want to be displayed using the dropdown.", reel1img2]
    //   ],
    //   [
    //     ["page 3 Another option you have is choosing the number of syllables of the words or the word length of the randomized words. ", reel1img1], ["You have the option of choosing the types of words you want to be displayed using the dropdown.", reel1img2]
    //   ],
    //   [
    //     ["page 4 Another option you have is choosing the number of syllables of the words or the word length of the randomized words. ", reel1img1], ["You have the option of choosing the types of words you want to be displayed using the dropdown.", reel1img2]
    //   ]
    
    // ])
  }, [])

  return (
    <div className="App bg-black">
      {stage == 0 ?
      (<LandingPage setPdfName = {setPdfName} setData = {setData} setStage = {setStage} setBeginPage = {setBeginPage} setEndPage = {setEndPage} setResponse = {setResponse} />) : 
      (<ScrollingPage data = {data} />)}

    </div>
  );
}

export default App;
