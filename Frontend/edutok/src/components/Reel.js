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
	const [imageIndex, setImageIndex] = useState(0)
	const [clock, setClock] = useState(0)

	useEffect(() => {
		const u = new SpeechSynthesisUtterance(props.reelData[currSentence][0]);
		setUtterance(u);
	}, [])

	const startTalking = async () => {
		if (isVisible) {
			console.log("hi" + props.reelData[0]);
			await new Promise(resolve => setTimeout(resolve, 1000));
			const voices = speechSynthesis.getVoices();
			const goodVoices = [0, 1, 8, 18, 85, 73, 93]
			const selectedVoiceIndex = goodVoices[Math.floor(Math.random() * goodVoices.length)]
			utterance.voice = voices[selectedVoiceIndex]
			synth.speak(utterance)
			
			utterance.addEventListener('end', async (event) => {

				// console.log("the current sentence is " + currSentence)
				const u = new SpeechSynthesisUtterance(props.reelData[currSentence][0]);
				setUtterance(u);
				synth.cancel();
				startTalking();
			});
			
			props.playNextTrack();
		} else {
			console.log("bye" + props.reelData[0])
			synth.cancel();
		}
	}

	useEffect(()=> {
		startTalking()
	}, [isVisible])

	useEffect(()=>{
		const interval = setInterval(()=>{
			if (imageIndex >= props.reelData.length - 1) setImageIndex(0);
			else setImageIndex(imageIndex + 1);
		}, 4000)
	}, [imageIndex])

	return (
		<>
			<div id="imageContainer" className='w-screen h-screen bg-cover bg-center rounded'>
				<img src = {props.reelData[imageIndex][1]} className="object-fixed w-screen h-screen bg-cover bg-center rounded bg-black" onClick={()=>{startTalking()}}/>
			</div>

			<div ref={triggerRef} className='absolute bg-opacity-60 bg-black mx-10 p-3 rounded-lg font-ProximaNova'>{props.reelData[0][0]}</div>
		</>
	)
}

export default Reel