import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../Api/api';

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (localStorage.getItem('HelloBuildApp')) {
            navigate("/")
        }
    })

    const onSubmit = (e) => {
        e.preventDefault();
        const body = { name, email, password };
        register(body, (response) => {
            if (response.ok) {
                navigate('/login');
            } else {
                alert(response.message);
            }
        })
    }

    const onLoginButton = () => {
        navigate('/login');
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Send</button>
            </form>
            <div>Already registered? <span onClick={onLoginButton}>Sign in</span></div>
        </div>
    )
}

export default Register;