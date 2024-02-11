import React, { useRef, useEffect, useState } from 'react'
import useScrollSnap from "react-use-scroll-snap"
import logo from "./logo.svg";
import Reel from './Reel';

const ScrollingPage = (props) => {
    const scrollRef = useRef(null);
    const synth = window.speechSynthesis;
    useScrollSnap({ ref: scrollRef, duration: 2, delay: 0 });
    useEffect(() => {
        window.speechSynthesis.cancel();
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance("hi bye");
        const voices = synth.getVoices();
        u.voice = voices[1]
        synth.speak(u);
        console.log(u)
    }, [])

    useEffect(()=>{
        if (props.images) {
            console.log(props.images);
        }
    }, [props.images])
    return (
        <>
            <div className="App" ref={scrollRef}>
                {props.data.map((reelData)=>(
                    <header className="App-header w-screen h-sreen">
                        <Reel reelData={reelData}/>
                    </header>
                ))}
        </div>
        </>
    )
}

export default ScrollingPage