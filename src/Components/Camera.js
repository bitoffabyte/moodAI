import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { TinyFaceDetectorOptions } from 'face-api.js';
import './Camera.css';
import { database } from '../config';
import { useLocalContext } from '../Context/Context';
export const Camera = ({ id }) => {
	const { loggedInUser } = useLocalContext();

	const [state, setState] = useState(false);
	const [detection, setDetection] = useState({});
	const [mood, setMood] = useState('');
	const mediaHandler = () => {
		// console.log(faceapi.nets)
		const video = document.getElementById('video');
		const displaySize = {
			width: video.width,
			height: video.height,
		};

		// console.log(canvas)
		// console.log(displaySize)
		setInterval(async () => {
			const detections = await faceapi
				.detectSingleFace(video, new TinyFaceDetectorOptions())
				.withFaceLandmarks()
				.withFaceExpressions()
				.withAgeAndGender();
			// .withFaceDescriptors()
			if (detections) {
				// setDetection(detections);
				let max = 0;
				console.log(detections);
				let maxx = '';
				// angry: 0.000982677098363638;
				// disgusted: 0.000010221834600088187;
				// fearful: 0.0000019973390408267733;
				// happy: 0.000006154424227133859;
				// neutral: 0.9919701218605042;
				// sad: 0.0004251169739291072;
				// surprised: 0.006603705696761608;
				if (detections.expressions.angry > max) {
					maxx = 'angry';
					max = detections.expressions.angry;
				}
				if (detections.expressions.disgusted > max) {
					maxx = 'disgusted';
					max = detections.expressions.disgusted;
				}
				if (detections.expressions.fearful > max) {
					maxx = 'fearful';
					max = detections.expressions.fearful;
				}
				if (detections.expressions.happy > max) {
					maxx = 'happy';
					max = detections.expressions.happy;
				}
				if (detections.expressions.neutral > max) {
					maxx = 'neutral';
					max = detections.expressions.neutral;
				}
				if (detections.expressions.sad > max) {
					maxx = 'bored';
					max = detections.expressions.sad;
				}
				if (detections.expressions.surprised > max) {
					maxx = 'surprised';
					max = detections.expressions.surprised;
				}
				setMood(maxx);
				database
					.ref(id + '/' + loggedInUser.displayName)
					.set({ mood: maxx });
			} else {
				setDetection({});
			}
			// detections.map((face,index) => console.log('Face #',index,'Guessed age:',face.age))
		}, 10);
	};

	useEffect(() => {
		Promise.all([
			faceapi.nets.tinyYolov2.loadFromUri('/models'),
			faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
			faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
			faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
			faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
			faceapi.nets.faceExpressionNet.loadFromUri('/models'),
			faceapi.nets.ageGenderNet.loadFromUri('/models'),
		]).then(setState(true));
	}, []);

	const videoConstraints = {
		width: window.screen.width * 0.5,
		height: window.screen.width / 3,
		facingMode: 'user',
	};
	console.log(detection.expressions);
	if (detection.expressions) {
		console.log(detection.expressions.neutral);
	}
	return (
		<div id='videoContainer'>
			{state ? (
				<>
					<p>Mood : {mood}</p>
					<Webcam
						id='video'
						width={videoConstraints.width}
						height={videoConstraints.height}
						audio={false}
						videoConstraints={videoConstraints}
						onUserMedia={mediaHandler}></Webcam>
				</>
			) : null}
		</div>
	);
};

export default React.memo(Camera);
