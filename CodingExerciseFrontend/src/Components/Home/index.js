import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getGitHubAT } from '../../Api/api';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const userTemp = localStorage.getItem('HelloBuildApp');
    if (!userTemp) {
      navigate("/login");
    } else {
      setUser(JSON.parse(userTemp))
    }
    if (localStorage.getItem('HelloBuildAppGAT')) {
      navigate("/profile");
    }
  }, [navigate]);

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      getGitHubAccessToken(code);
    }
  });

  const getGitHubAccessToken = (code) => {
    const body = { code }
    getGitHubAT(body, (response) => {
      if (response.ok) {
        setTimeout(() => {
          navigate('/profile');
        }, 1000);
      } else {
        alert(response.message);
      }
    });
  };

  const loginGithub = () => {
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=repo`,
      "_self"
    );
  };

  const onLogOutButton = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-gray-58 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center font-medium text-xl">{user.name}</div>
        <div className="text-center font-bold text-3xl text-gray-900 mt-2">Welcome</div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8  border border-gray-300">
        <div className="w-full text-xl text-center text-gray-600">
          Log in with your Github account to view your repositories and add them to favorites.
        </div>
        <button onClick={loginGithub} className="w-full mt-4 font-bold py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Log in with Github</button>
        <div className="w-full mt-4 text-sm text-center text-gray-600">{user.email} <span onClick={onLogOutButton} className="text-gray-900 font-bold cursor-pointer">Log out</span></div>
      </div>
    </div>
  )
}

export default Home;