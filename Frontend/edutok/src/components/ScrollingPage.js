import React, { useRef } from 'react'
import useScrollSnap from "react-use-scroll-snap"
import logo from "./logo.svg";

const ScrollingPage = (props) => {
    const scrollRef = useRef(null);
    useScrollSnap({ ref: scrollRef, duration: 50, delay: 20 });
  return (
    <>
        <div>ScrollingPage</div>
        <div className="App" ref={scrollRef}>
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Page 1</p>
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