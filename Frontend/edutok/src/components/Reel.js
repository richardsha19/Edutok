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

	useEffect(() => {
		const u = new SpeechSynthesisUtterance(props.reelData[currSentence][0]);
		setUtterance(u);
		// synth.speak(u);
		// if (utterance) {
		// 	synth.speak(utterance);
		// }
		// console.log(utterance)
	}, [])

	const startTalking = async () => {
		console.log("called!!!!")
		if (isVisible) {
			await new Promise(resolve => setTimeout(resolve, 1000));
			const voices = speechSynthesis.getVoices();
			const goodVoices = [0, 1, 8, 18, 85, 73, 93]
			const selectedVoiceIndex = goodVoices[Math.floor(Math.random() * goodVoices.length)]
			utterance.voice = voices[selectedVoiceIndex]
			synth.speak(utterance)

			utterance.addEventListener('end', async (event) => {
				if (currSentence >= props.reelData.length - 1) setCurrSentence(0);
				else setCurrSentence(currSentence + 1);

				// console.log("the current sentence is " + currSentence)
				const u = new SpeechSynthesisUtterance(props.reelData[currSentence][0]);
				setUtterance(u);
				synth.cancel();
				startTalking();
			});
			// console.log("hi" + props.reelData[0]);
			props.playNextTrack();
		} else {
			synth.cancel();
			// console.log("bye" + props.reelData[0])
		}
	}

	useEffect(()=> {
		startTalking()
	}, [isVisible])

	return (
		<>
			<div id="imageContainer" className='w-screen h-screen bg-cover bg-center'>
				<img src = {props.reelData[currSentence][1]} className="w-screen h-screen bg-cover bg-center" onClick={()=>{startTalking()}}/>

			</div>
			{/* <img src = {props.reelData[currSentence][1]} className="w-screen h-screen bg-cover bg-center" onClick={()=>{startTalking()}}/> */}

			<div ref={triggerRef} className='absolute bg-opacity-70 bg-black mx-10 p-3 rounded'>{props.reelData[0][0]}</div>
		</>
	)
}

export default Reel