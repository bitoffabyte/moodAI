import React from 'react';
import LandBG from '../Components/LandBG';
import './landing.css';
import img from '../assets/Group 17.png';
import logo from '../assets/Group.svg';
import { useLocalContext } from '../Context/Context';
const Landing = () => {
	const { login } = useLocalContext();
	return (
		<LandBG>
			<div className='ins'>
				<p className='title'>Intract</p>
				<p className='tag'> Insert Cool Tag line</p>
				<br />
				<br />
				<br />
				<img src={img} className='signin' onClick={login} />
			</div>
			<img src={logo} className='image' />
		</LandBG>
	);
};

export default Landing;
