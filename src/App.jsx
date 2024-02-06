import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ImageApp from './components/ImageApp';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

export default function App() {
	// set the state for the img url
	const [imgURL, setImgURL] = useState(
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkfvgn-SOCmOFh5LpUidVVEF3nKJUC5LS_lw&usqp=CAU'
	);

	// set the state for the img text (url entered into the text box)
	const [imgText, setImgText] = useState('');

	// set the state to check if the img is a valid url
	const [validImg, setValidImg] = useState(true);

	// set state for the box dimensions
	const [box, setBox] = useState([]);

	// function that sets the img url to the text in the input
	const handleImgURL = () => {
		setValidImg(true);
		setImgURL(imgText);
	};

	const createFaceBox = (clarifaiJSON) => {
		if (!clarifaiJSON.outputs[0].data.regions) {
			return [];
		}
		return clarifaiJSON.outputs[0].data.regions.map((region) => {
			const face = region.region_info.bounding_box;
			const faceImage = document.getElementById('faceImage');
			const width = Number(faceImage.width);
			const height = Number(faceImage.height);
			return {
				leftCol: face.left_col * width,
				topRow: face.top_row * height,
				rightCol: width - face.right_col * width,
				bottomRow: height - face.bottom_row * height,
			};
		});
	};

	const displayFaceBox = (box) => {
		setBox(box);
	};

	const apiRequest = (imgURL) => {
		const PAT = 'ceb8838c4fe2492babb189ce18595c5c';
		const USER_ID = 'nny4fhhxos0j';
		const APP_ID = 'face-detector';
		const IMAGE_URL = imgURL;

		const raw = JSON.stringify({
			user_app_id: {
				user_id: USER_ID,
				app_id: APP_ID,
			},
			inputs: [
				{
					data: {
						image: {
							url: IMAGE_URL,
						},
					},
				},
			],
		});
		const requestOptions = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: 'Key ' + PAT,
			},
			body: raw,
		};
		return requestOptions;
	};

	const handleImageLoad = () => {
		fetch(
			'https://api.clarifai.com/v2/models/face-detection/outputs',
			apiRequest(imgURL)
		)
			.then((response) => response.json())
			.then((result) => {
				if (result.outputs && result.outputs[0].data.regions) {
					displayFaceBox(createFaceBox(result));
				} else {
					throw new Error('No face data found in API response');
				}
			})
			.catch((error) =>
				console.error('Error during API call or data processing:', error)
			);
	};

	// function to handle error case img urls
	const handleImgError = () => {
		setValidImg(false);
	};

	//function to handle routing
	const navigate = useNavigate();

	const handleSignUp = (event, userCredentials) => {
		event.preventDefault();
		fetch('http://localhost:3000/signup', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: userCredentials.email,
				password: userCredentials.password,
				id: Math.floor(Math.random() * 10000),
			}),
		});
		console.log(userCredentials);
		navigate('/main');
	};

	const handleSignIn = (event, userCredentials) => {
		event.preventDefault();
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: userCredentials.email,
				password: userCredentials.password,
			}),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Invalid credentials');
				}
			})
			.then(() => {
				// Handle successful sign in
				navigate('/main');
			})
			.catch((error) => {
				// Handle sign in error
				console.error('Sign in failed:', error.message);
				alert('wrong credentials');
			});
	};

	const handleSignUpPageRoute = () => {
		navigate('/sign-up');
	};

	const handleSignInPageRoute = () => {
		navigate('/');
	};

	return (
		<>
			<main className='max-lg:max-container h-screen relative'>
				<Routes>
					<Route
						path='/main'
						element={
							<ImageApp
								imgURL={imgURL}
								validImg={validImg}
								box={box}
								handleImgError={handleImgError}
								handleImageLoad={handleImageLoad}
								handleImgURL={handleImgURL}
								setImgText={setImgText}
								handleSignInRoute={handleSignInPageRoute}
							/>
						}
					/>
					<Route
						path='sign-up'
						element={
							<SignUp
								signUp={handleSignUp}
								signInPage={handleSignInPageRoute}
							/>
						}
					/>
					<Route
						path='/'
						element={
							<SignIn
								signIn={handleSignIn}
								signUpPage={handleSignUpPageRoute}
							/>
						}
					/>
				</Routes>
			</main>
		</>
	);
}
