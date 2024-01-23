import { useState } from 'react';
import Navigation from './components/Navigation';
import Image from './components/Image';

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
	const [box, setBox] = useState({});

	// function that sets the img url to the text in the input
	const handleImgURL = () => {
		setValidImg(true);
		setImgURL(imgText);

		const createFaceBox = (clarifaiJSON) => {
			const face =
				clarifaiJSON.outputs[0].data.regions[0].region_info.bounding_box;
			const faceImage = document.getElementById('faceImage');
			const width = Number(faceImage.width);
			const height = Number(faceImage.height);
			console.log(width, height);
			return {
				leftCol: face.left_col * width,
				topRow: face.top_row * height,
				rightCol: width - face.right_col * width,
				bottomRow: height - face.bottom_row * height,
			};
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

		fetch(
			'https://api.clarifai.com/v2/models/' + 'face-detection' + '/outputs',
			apiRequest(imgURL)
		)
			.then((response) => response.json())
			.then((result) => {
				displayFaceBox(createFaceBox(result));
			})
			.catch((error) => console.log('error', error));
	};

	// function to handle error case img urls
	const handleImgError = () => {
		setValidImg(false);
	};

	return (
		<main className='max-lg:max-container h-screen relative'>
			<Navigation handleImgURL={handleImgURL} setImgText={setImgText} />
			<section className='flex h-full p-11 justify-center items-center bg-gray-50'>
				<Image
					imgURL={imgURL}
					validImg={validImg}
					handleImgError={handleImgError}
					box={box}
				/>
			</section>
		</main>
	);
}
