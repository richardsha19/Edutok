import React, { useState } from 'react';
import UploadFile from './uploadfile';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue } from "firebase/database";
import image from './image.png';



function LandingPage(props) {
  const [number, setNumber] = useState(3);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null)
  let formData;
  
  const selectedMain = "grow justify-center px-12 py-3 text-xl text-center text-black bg-white rounded-tl rounded-bl border border-r-0 border-black border-solid max-md:px-5"
  const selectedSide = "flex justify-center items-center px-8 py-3 rounded-none border rounded-tr rounded-br border-black border-solid basis-0 bg-zinc-300 max-md:px-5"
  const nselectedMain = "grow justify-center px-6 py-3 text-xl bg-white rounded-tl rounded-bl border border-solid border-zinc-300 max-md:pl-5"
  const nselectedSide = "flex justify-center items-center px-8 py-3 rounded-none border rounded-tr rounded-br border-zinc-300 border-solid basis-0 bg-zinc-300 max-md:px-5"


  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
    // Upload the file immediately when selected
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    console.log("formdata:")
    console.log(formData)
    props.setPdfName(event.target.files[0]);
  };

  const handleClick = () => {
    setIsButtonClicked(true);
    
  };

  const handleSubmit = async () => {
    setLoading(true);
    const firebaseConfig = {
      apiKey: "AIzaSyCMpH27r8nISfzVrb7nZaQl2AhRGOZVJyE",
      authDomain: "edutok-f643f.firebaseapp.com",
      databaseURL: "https://edutok-f643f-default-rtdb.firebaseio.com",
      projectId: "edutok-f643f",
      storageBucket: "edutok-f643f.appspot.com",
      messagingSenderId: "249466680883",
      appId: "1:249466680883:web:854cfb9df35a3aff241546",
      measurementId: "G-7LBSRMMVNS"
    };
    // await new Promise(resolve => setTimeout(resolve, 5000));

    try {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const query = ref(db, "PDFs")
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        console.log(data)
        props.setResponse(data);
      }
      props.setStage(1);
      
    })
  } catch (error) {
    console.error(error)
  }
  }

  const handleInputChange1 = (event) => {
    setInputValue(event.target.value);
    props.setBeginPage(event.target.value);
    console.log(event.target.value)
  

      setNumber(1);
      setInput1(event.target.value);


  };
  
  const handleInputChange2 = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value)     
    props.setEndPage(event.target.value);
    
    
    setNumber(0);
    setInput2(event.target.value);



  };



  function writeUserData(filename, filecontent, sIndex, eIndex) {
  
    const firebaseConfig = {
      apiKey: "AIzaSyCMpH27r8nISfzVrb7nZaQl2AhRGOZVJyE",
      authDomain: "edutok-f643f.firebaseapp.com",
      databaseURL: "https://edutok-f643f-default-rtdb.firebaseio.com",
      projectId: "edutok-f643f",
      storageBucket: "edutok-f643f.appspot.com",
      messagingSenderId: "249466680883",
      appId: "1:249466680883:web:854cfb9df35a3aff241546",
      measurementId: "G-7LBSRMMVNS"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase(app);

  
  // Concatenate sIndex and eIndex
    const concatIndex = `${input1}__${input2}`;
    const dataRef = ref(db, '/PDFs');
    console.log("hi");
    console.log(dataRef);

    set(ref(db, 'PDFs/' + filename), 
    {
      filename: {
        file: filecontent,
        indices: {
          [concatIndex]: {
            image: "",
            text: ""
          }
        }
      }
    }
    );
  }


  return (
    
    <div className="flex justify-center items-center px-16 py-12 bg-indigo-700 max-md:px-5 ">
      <div className="flex flex-col items-center mt-36 max-w-full w-[1030px] max-md:mt-10">
        <div className="text-7xl font-extrabold text-center text-lime-300 max-md:max-w-full max-md:text-4xl">
          doomscroll your textbook
        </div>
        <div className="mt-10 text-2xl font-medium text-center text-gray-200">
          powered by edutok 🌶️
        </div>
        
        <div className="flex gap-5 justify-between items-center self-stretch px-20 py-12 mt-28 bg-white rounded-xl max-md:flex-wrap max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col flex-1 self-stretch my-auto">
            <div className="flex gap-0 justify-between">
              <div className="grow my-auto text-2xl text-center text-black">
                1
              </div>
              <div className= {selectedMain}>
                upload textbook pdf
              </div>
              <div className={selectedSide}>
                <div style={{ width: '2vh', height: '2vh' }}>                  
                <button className="aspect-square" onClick={handleClick} >
                <div>
      {/* Display the selected file name */}
      {/* {selectedFile && <div>Selected file: {selectedFile.name}</div>} */}
      {/* Input for selecting the file */}
      <input
        type="file"
        onChange={handleFileUpload}
        style={{ display: 'none' }} // Hide the file input element
        id="fileInput" // Add an ID for the label association
      />
      <label htmlFor="fileInput">
        {/* Replace 'upload-icon.png' with your actual image */}
        <img
          src={image}
          alt="Upload icon"
          style={{
            width: '2vh', // Set the desired width
            height: '2vh', // Set the desired height
            cursor: 'pointer', // Show pointer cursor on hover
          }}
        />
      </label>
    </div>
                {/* <img
                  src={image}
                  alt="Upload icon"
                  style={{ cursor: 'pointer' }}

                /> */}
            </button> 

            </div>

              </div>
            </div>
            <div className="flex gap-0 justify-between mt-16 text-center whitespace-nowrap text-zinc-300 max-md:mt-10">

            <div className="grow my-auto text-2xl" style={{ borderRightStyle: 'none', borderColor: isButtonClicked ? 'black' : 'inherit', color: isButtonClicked ? 'black' : 'text-gray-200' }}>2</div>
              <div className={nselectedMain} style={{ borderRightStyle: 'none', borderColor: isButtonClicked ? 'black' : 'inherit', color: isButtonClicked ? 'black' : 'text-gray-200' }}>
                
                starting page number
              </div>
              <div className={nselectedSide} style={{ borderColor: isButtonClicked ? 'black' : 'inherit' }}>

              {isButtonClicked && (
                                    <input
                                      type="text"
                                      placeholder=""
                                      style={{ width: '50px' }}
                                      className = "bg-zinc-300 border rounded-sm border-black text-black"
                                      onChange={handleInputChange1}

                                    />
                                  )}
                </div>
            </div>
            <div className="flex gap-0 justify-between mt-16 text-center whitespace-nowrap text-zinc-300 max-md:mt-10">

            <div className="grow my-auto text-2xl" style={{ borderRightStyle: 'none', borderColor: inputValue ? 'black' : 'inherit', color: inputValue !== '' ? 'black' : 'text-gray-200' }}>3</div>
              <div className={nselectedMain} style={{ borderRightStyle: 'none', borderColor: inputValue ? 'black' : 'inherit', color: inputValue !== '' ? 'black' : 'text-gray-200' }}>
                
                ending page number
              </div>
              <div className={nselectedSide} style={{ borderColor: inputValue ? 'black' : 'inherit', color: inputValue !== '' ? 'black' : 'text-gray-200' }}>
              {inputValue !== '' && (
                                    <input
                                      type="text"
                                      placeholder=""
                                      style={{ width: '50px' }}
                                      className = "bg-zinc-300 border rounded-sm border-black"
                                      onChange={handleInputChange2}

                                    />
                                  )}

                </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 self-stretch my-auto text-center">
          <div className={`overflow-hidden relative flex justify-center items-center rounded-full ${number === 0 ? 'bg-green-400' : 'bg-red-400'} self-center max-w-full text-7xl font-bold text-white whitespace-nowrap aspect-square w-[166px] max-md:px-5 max-md:text-4xl`}>
          <div className={`overflow-hidden relative flex justify-center items-center rounded-full  ${number === 0 ? 'bg-green-500' : 'bg-red-500'} self-center max-w-full text-7xl font-bold text-white whitespace-nowrap aspect-square w-[120px] max-md:px-5 max-md:text-4xl`}>

      {number}
      </div>
    </div>
    <div className="mt-11 text-3xl text-black max-md:mt-10">
    {number === 0 ? (
      <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full mt-7 max-md:mt-10" onClick={()=>{handleSubmit(); writeUserData("m-b", "fileName", input1, input2)}}>
        {loading ? "Loading..." : "Submit File"}
      </button>
    ) : (
      <p>steps away from doomscrolling</p>
    )}
  </div>

          </div>
        </div>
      </div>
    </div>
  );
}




export default LandingPage