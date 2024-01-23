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
					className='rounded-[5%] shadow-2xl max-sm:w-[400px] w-[600px] h-auto'
				/>
			) : (
				<div className='text-gray-700 text-center font-palanquin'>
					Image failed to load. Please check the URL.
				</div>
			)}
			{box.map((b, i) => (
				<div
					key={i}
					className='border-2 rounded-xl border-red-500 absolute'
					style={{
						top: b.topRow,
						right: b.rightCol,
						bottom: b.bottomRow,
						left: b.leftCol,
					}}
				></div>
			))}
		</div>
	);
};

export default Image;
