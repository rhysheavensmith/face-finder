import { useState } from 'react';
import Navigation from './components/Navigation';
import Image from './components/Image';

export default function App() {
	// State for the image URL
	const [imgURL, setImgURL] = useState(
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkfvgn-SOCmOFh5LpUidVVEF3nKJUC5LS_lw&usqp=CAU'
	);
	const [imgText, setImgText] = useState(''); // State for the image URL text input
	const [validImg, setValidImg] = useState(true); // State to check if the image URL is valid
	const [box, setBox] = useState({}); // State for the bounding box dimensions

	// Function to update the image URL and trigger the face detection process
	const handleImgURL = () => {
		setValidImg(true);
		setImgURL(imgText);
	};

	// Function to calculate the bounding box dimensions
	const createFaceBox = (clarifaiJSON) => {
		const face =
			clarifaiJSON.outputs[0].data.regions[0].region_info.bounding_box;
		const faceImage = document.getElementById('faceImage');
		const width = Number(faceImage.width);
		const height = Number(faceImage.height);
		return {
			leftCol: face.left_col * width,
			topRow: face.top_row * height,
			rightCol: width - face.right_col * width,
			bottomRow: height - face.bottom_row * height,
		};
	};

	// Function to display the bounding box
	const displayFaceBox = (box) => {
		setBox(box);
	};

	// Function to handle the image load event
	const handleImageLoad = () => {
		// Call the API after the image has loaded
		const requestOptions = apiRequest(imgURL);
		fetch(
			'https://api.clarifai.com/v2/models/face-detection/outputs',
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => displayFaceBox(createFaceBox(result)))
			.catch((error) => console.log('error', error));
	};

	// Function to prepare the API request
	const apiRequest = (imgURL) => {
		const PAT = 'ceb8838c4fe2492babb189ce18595c5c';
		const USER_ID = 'nny4fhhxos0j';
		const APP_ID = 'face-detector';
		const IMAGE_URL = imgURL;

		const raw = JSON.stringify({
			user_app_id: { user_id: USER_ID, app_id: APP_ID },
			inputs: [{ data: { image: { url: IMAGE_URL } } }],
		});

		return {
			method: 'POST',
			headers: { Accept: 'application/json', Authorization: 'Key ' + PAT },
			body: raw,
		};
	};

	// Function to handle image load errors
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
					onImageLoad={handleImageLoad} // Pass the image load handler
				/>
			</section>
		</main>
	);
}
