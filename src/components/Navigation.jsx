import Logo from '../assets/face-recognition.svg';
import Button from './Button';

const Navigation = ({ handleImgURL, setImgText }) => {
	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleImgURL();
		}
	};

	return (
		<nav className='py-2 px-8 lg:max-container w-full flex flex-1 justify-between items-center absolute z-10 bg-white font-montserrat font-medium leading-normal'>
			<a className='cursor-pointer' href='/'>
				<img src={Logo} alt='logo' width={50} height={50} />
			</a>

			<div className='border-2 py-1 pr-1 pl-2 rounded-full flex justify-between w-[700px] max-sm:w-[300px] max-lg:w-[400px]'>
				<input
					type='text'
					placeholder='Submit an image URL'
					className='font-palanquin text-gray-400 outline-none w-full bg-transparent pl-3'
					onChange={(e) => setImgText(e.target.value)}
					onKeyPress={handleKeyPress}
				/>
				<Button onClick={() => handleImgURL()}>Submit</Button>
			</div>
			<Button backgroundColor='bg-red-500' scale shadow>
				Sign Out
			</Button>
		</nav>
	);
};

export default Navigation;
