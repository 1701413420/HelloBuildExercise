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
        <div className="min-h-screen bg-gray-58 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <div className="text-center font-medium text-xl">HelloBuild</div>
                <div className="text-center font-bold text-3xl text-gray-900 mt-2">Register</div>
            </div>
            <div className="max-w-md w-full mx-auto mt-4 bg-white p-8  border border-gray-300">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">Name</label>
                        <input placeholder="Enter name" type="text" value={name} required onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">Email</label>
                        <input placeholder="Enter email" type="text" value={email} required onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">Password</label>
                        <input placeholder="Enter password" type="password" value={password} required onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <div>
                        <button type="submit" className="w-full mt-2 font-bold py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Register</button>
                    </div>
                </form>
                <div className="w-full mt-4 text-sm text-center text-gray-600">Already registered? <span onClick={onLoginButton} className="text-gray-900 font-bold cursor-pointer">Log in</span></div>
            </div>
        </div>
    )
}

export default Register;