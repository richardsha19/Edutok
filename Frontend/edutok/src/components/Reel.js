import React, { useEffect, useState, useRef } from 'react'
import logo from "./logo.svg";
import { useIntersection } from '../hooks/useIntersection';

const Reel = (props) => {
    const [currSentence, setCurrSentence] = useState(0);
	const [imgSrcs, setImgSrcs] = useState([]);
	const [utterance, setUtterance] = useState(null);
	const synth = window.speechSynthesis;
	const triggerRef = useRef(null);
	const isVisible = useIntersection(triggerRef, "0px")

	useEffect(()=> {
		if (isVisible) {
			synth.speak(utterance)
			console.log("hi");
		}
	}, [isVisible])

	useEffect(()=>{
		setCurrSentence(currSentence + 1);
	}, [synth.speaking])

	useEffect(() => {
		const u = new SpeechSynthesisUtterance(props.reelData[currSentence][0]);
		setUtterance(u);
		if (utterance) {
			synth.speak(utterance);
		}
		console.log(utterance)
	}, [])

	useEffect(()=> {

	})

	return (
		<>
			<img ref={triggerRef} src = {props.reelData[currSentence][1]} className="w-screen h-screen bg-cover bg-center" />
			<div className='absolute bg-opacity-70 bg-black mx-10 p-3 rounded' onClick={()=>{synth.speak(utterance)}}>{props.reelData[0][0]}</div>
		</>
	)
}

export default Reel