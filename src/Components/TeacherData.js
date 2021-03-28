import './Teacherdata.css';
import { database } from '../config';
import { useEffect, useState } from 'react';
import { Bar } from '@reactchartjs/react-chart.js';
import { Button } from '@material-ui/core';

const TeacherData = ({ id }) => {
	const [students, setStudnets] = useState([]);
	const [moods, setMoods] = useState([]);
	const [beep, setBeep] = useState(true);
	const [labels, setlabels] = useState([
		'happy',
		'angry',
		'disgusted',
		'fearful',
		'neutral',
		'bored',
		'surprised',
	]);
	const data = {
		labels: labels,
		datasets: [
			{
				label: '# of Students',
				data: moods,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	};
	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	};
	useEffect(() => {
		var starCountRef = database.ref(id + '/');
		const uns = starCountRef.on('value', (snapshot) => {
			const data = snapshot.val();
			console.log(data);

			const mood = {
				happy: 0,
				angry: 0,
				disgusted: 0,
				fearful: 0,
				neutral: 0,
				bored: 0,
				surprised: 0,
			};
			let st = [];
			let bt = [];
			Object.keys(data).map((key, index) => {
				st = [...st, { mood: data[key], name: key }];
				console.log(data[key].mood);
				const s = data[key].mood;
				mood[s] += 1;
			});
			Object.values(mood).map((val) => {
				bt = [...bt, val];
			});
			console.log(bt);
			setMoods(bt);
			console.log(st);
			setStudnets(st);
		});
	}, []);
	return (
		<div style={{ height: '80%' }}>
			<p>Invite id : {id}</p>
			<div className='buttons'>
				<Button
					variant='contained'
					color='primary'
					onClick={() => {
						setBeep(true);
					}}
				>
					Graph
				</Button>
				<Button
					variant='contained'
					color='secondary'
					onClick={() => {
						setBeep(false);
					}}
				>
					Data
				</Button>
			</div>
			{beep ? (
				<Bar data={data} options={options} />
			) : (
				<div className='sdsds'>
					<div className='data'>
						{students.map((i, index) => {
							return (
								<div className='boix'>
									Name: {i.name}
									<br />
									Mood: {i.mood.mood}
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default TeacherData;
