const Image = ({ imgURL, validImg, handleImgError, box, onImageLoad }) => {
	return (
		<div className='relative'>
			{validImg ? (
				<img
					id='faceImage'
					src={imgURL}
					alt='Target'
					onError={handleImgError}
					onLoad={onImageLoad} // Trigger the load handler when the image loads
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
					right: box.rightCol,
					bottom: box.bottomRow,
					left: box.leftCol,
				}}
			></div>
		</div>
	);
};

export default Image;
