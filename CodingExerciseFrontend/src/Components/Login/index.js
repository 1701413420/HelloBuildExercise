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
		<div>
			<form onSubmit={onSubmit}>
				<input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<button type="submit">Send</button>
			</form>
			<div>Don't have an account? <span onClick={onRegisterButton}>Register</span></div>
		</div>
	)
}

export default Login;