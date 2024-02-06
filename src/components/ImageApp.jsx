import Navigation from './Navigation';
import Image from './Image';

const ImageApp = ({
	handleImageLoad,
	handleImgError,
	imgURL,
	box,
	validImg,
	handleSignInRoute,
	setImgText,
	handleImgURL,
}) => {
	return (
		<div className='h-screen relative'>
			<Navigation
				handleImgURL={handleImgURL}
				setImgText={setImgText}
				signOut={handleSignInRoute}
			/>
			<section className='flex h-full p-11 justify-center items-center bg-gray-50'>
				<Image
					imgURL={imgURL}
					validImg={validImg}
					handleImgError={handleImgError}
					box={box}
					onImageLoad={handleImageLoad}
				/>
			</section>
		</div>
	);
};

export default ImageApp;
