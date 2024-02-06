import Logo from '../assets/face-recognition.svg';
import { useState } from 'react';

const SignUp = ({ signUp, signInPage }) => {
	const [userCredentials, setUserCredentials] = useState({
		email: '',
		password: '',
	});
	return (
		<div className='flex h-screen px-12 py-12 max-md:px-24'>
			<div className='flex min-h-full flex-1 flex-col justify-center  lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<img className='mx-auto h-10 w-auto' src={Logo} alt='Your Company' />
					<h2 className='font-montserrat mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
						Sign up
					</h2>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form
						className='space-y-6'
						action='#'
						method='POST'
						onSubmit={(event) => signUp(event, userCredentials)}
					>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium font-palanquin leading-6 text-gray-900'
							>
								Email address
							</label>
							<div className='mt-2'>
								<input
									onChange={(event) =>
										setUserCredentials({
											...userCredentials,
											email: event.target.value,
										})
									}
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									required
									className='pl-3 block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
								/>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='password'
									className='block text-sm font-medium font-palanquin leading-6 text-gray-900'
								>
									Choose Password
								</label>
								<div className='text-sm'></div>
							</div>
							<div className='mt-2'>
								<input
									onChange={(event) =>
										setUserCredentials({
											...userCredentials,
											password: event.target.value,
										})
									}
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									required
									className='pl-3 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 rounded-full'
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-full bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
							>
								Sign Up
							</button>
						</div>
					</form>

					<p className='font-palanquin mt-10 text-center text-sm text-gray-500'>
						Already a member?{' '}
						<a
							className='font-semibold leading-6 text-sky-400 hover:text-sky-600 cursor-pointer'
							onClick={signInPage}
						>
							Sign In
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
