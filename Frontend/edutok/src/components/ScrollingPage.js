import React, { useRef, useEffect, useState } from 'react'
import useScrollSnap from "react-use-scroll-snap"
import logo from "./logo.svg";

const ScrollingPage = (props) => {
    const scrollRef = useRef(null);
    useScrollSnap({ ref: scrollRef, duration: 5, delay: 0 });
    const [imgSrcs, setImgSrcs] = useState([])
    
    useEffect(()=>{
        if (props.images) {
            console.log(props.images);
        }
        import('./reel1img1.png').then((image) => {
            setImgSrcs([[image.default]]);
        });
    }, [props.images])
    return (
        <>
            <div className="App" ref={scrollRef}>
                
                <header className="App-header">
                    <div className="w-screen h-screen bg-cover bg-center" style={{backgroundImage:imgSrcs[0] ? "url("+imgSrcs[0][0]+")" : logo}}>
                        {props.sentences[0] ? props.sentences[0][0] : ""}
                    </div>
                    {/* <img src={imgSrcs[0] ? imgSrcs[0][0] : logo} className="" alt="logo" /> */}
                </header>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>page 2</p>
                </header>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Page 3</p>
                </header>
        </div>
        </>
    )
}

export default ScrollingPage