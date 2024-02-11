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
	const [isDoneSentence, setIsDoneSentence] = useState(false)


	useEffect(()=>{
		setIsDoneSentence(false);
		startTalking();
	}, [isDoneSentence])

	useEffect(() => {
		const u = new SpeechSynthesisUtterance(props.reelData[currSentence][0]);
		setUtterance(u);
		synth.speak(u);
		if (utterance) {
			synth.speak(utterance);
		}
		console.log(utterance)
	}, [])

	useEffect(()=> {
		startTalking()
	}, [isDoneSentence])

	const handleVisibleChange = async () => {
		if (isVisible) {
			await new Promise(resolve => setTimeout(resolve, 1000));
			synth.speak(utterance)
			synth.addEventListener('end', async () => {
				isDoneSentence = true;
				currSentence++;
				if (currSentence == props.reelData.length()) currSentence = 0;
				startTalking();
				console.log('DONE DONE DONE');
			});
			console.log("hi" + props.reelData[0]);
		} else {
			synth.cancel();
			console.log("bye" + props.reelData[0])
		}
	}

	useEffect(()=> {
		handleVisibleChange()
	}, [isVisible])

	const startTalking = () => {
		// synth.speak(utterance);
		synth.addEventListener('end', async () => {
			isDoneSentence = true;
			currSentence++;
			if (currSentence == props.reelData.length()) currSentence = 0;
			startTalking();
			console.log('DONE DONE DONE');
		});
	}

	return (
		<>
			<img src = {props.reelData[currSentence][1]} className="w-screen h-screen bg-cover bg-center" />
			<div ref={triggerRef} className='absolute bg-opacity-70 bg-black mx-10 p-3 rounded' onClick={()=>{synth.speak(utterance)}}>{props.reelData[currSentence][0]}</div>
		</>
	)
}

export default Reel