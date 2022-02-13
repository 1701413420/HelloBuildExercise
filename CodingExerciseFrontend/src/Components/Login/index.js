import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Api/api';

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (localStorage.getItem('HelloBuildApp')) {
			navigate("/")
		}
	})

	const onSubmit = (e) => {
		e.preventDefault();
		const body = { email, password };
		login(body, (response) => {
			if (response.ok) {
				navigate('/');
			} else {
				alert(response.message);
			}
		})
	}

	const onRegisterButton = () => {
		navigate('/register');
	}

	return (
		<div className="min-h-screen bg-gray-58 flex flex-col justify-center">
			<div className="max-w-md w-full mx-auto">
				<div className="text-center font-medium text-xl">HelloBuild</div>
				<div className="text-center font-bold text-3xl text-gray-900 mt-2">Log in</div>
			</div>
			<div className="max-w-md w-full mx-auto mt-4 bg-white p-8  border border-gray-300">
				<form onSubmit={onSubmit} className="space-y-6">
					<div>
						<label className="text-sm font-bold text-gray-600 block">Email</label>
						<input placeholder="Enter email" type="text" value={email} required onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded mt-1" />
					</div>
					<div>
						<label className="text-sm font-bold text-gray-600 block">Password</label>
						<input placeholder="Enter password" type="password" value={password} required onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded mt-1" />
					</div>
					<div>
						<button type="submit" className="w-full mt-2 font-bold py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Log in</button>
					</div>
				</form>
				<div className="w-full mt-4 text-sm text-center text-gray-600">Don't have an account? <span onClick={onRegisterButton} className="text-gray-900 font-bold cursor-pointer">Register</span></div>
			</div>
		</div>
	)
}

export default Login;