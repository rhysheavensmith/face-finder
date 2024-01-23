const Button = ({ children, backgroundColor, scale, onClick, shadow }) => {
	return (
		<button
			onClick={onClick}
			className={`${
				backgroundColor ? backgroundColor : 'bg-sky-400 hover:bg-sky-600'
			} rounded-full text-white px-3 py-1 font-palanquin ${
				scale && 'hover:scale-110'
			} ${shadow && 'hover:shadow-lg'}`}
		>
			{children}
		</button>
	);
};

export default Button;
