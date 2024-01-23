const Image = ({ validImg, imgURL, handleImgError, box }) => {
	console.log(box);
	return (
		<div className='relative'>
			{validImg ? (
				<img
					id='faceImage'
					src={imgURL}
					alt='people'
					onError={handleImgError}
					className='rounded-[5%] shadow-2xl h-[400px] max-md:h-[300px] w-auto'
				/>
			) : (
				<div className='text-gray-700 text-center font-palanquin'>
					Image failed to load. Please check the URL.
				</div>
			)}
			<div
				className='border-2 border-red-500 absolute'
				style={{
					top: box.topRow,
					bottom: box.bottomRow,
					right: box.rightCol,
					left: box.leftCol,
				}}
			></div>
		</div>
	);
};

export default Image;
