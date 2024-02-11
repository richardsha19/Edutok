import React, { useRef, useEffect, useState } from 'react'
import useScrollSnap from "react-use-scroll-snap"
import logo from "./logo.svg";
import Reel from './Reel';

const ScrollingPage = (props) => {
    const scrollRef = useRef(null);
    const synth = window.speechSynthesis;
    useScrollSnap({ ref: scrollRef, duration: 2, delay: 0 });

    const audioTracks = [
        '/local-forecast-elevator.mp3',
        '/fluffing-a-duck.mp3',
        '/monkeys-spinning-monkeys.mp3',
        '/sneaky-snitch.mp3',
        '/carefree.mp3',
        '/hall-of-the-mountain-king.mp3',
        '/cipher.mp3'
    ]

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const playNextTrack = () => {
        const nextIndex = (currentTrackIndex + 1) % audioTracks.length;
        setCurrentTrackIndex(nextIndex);
    }

    useEffect(()=>{
        console.log(audioTracks[currentTrackIndex]);
    }, [currentTrackIndex])

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
        <audio autoPlay loop src={audioTracks[currentTrackIndex]}>
        </audio>
        {props.data.map((reelData)=>(
            <header className="App-header w-screen h-sreen">
                <Reel reelData={reelData} playNextTrack={playNextTrack}/>
            </header>
        ))}
    </div>
    </>
    )
}

export default ScrollingPage