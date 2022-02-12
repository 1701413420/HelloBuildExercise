import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGitHubAT } from '../../Api/api';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
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
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get("code");
    if (code) {
      getGitHubAccessToken(code);
    }
  });

  const getGitHubAccessToken = (code) => {
    const body = { code }
    getGitHubAT(body, (response) => {
      if (response.ok) {
        navigate('/profile');
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
  return (
    <div>
      {user.name}
      <button onClick={loginGithub}>Login with Github</button>
    </div>
  )
}

export default Home;