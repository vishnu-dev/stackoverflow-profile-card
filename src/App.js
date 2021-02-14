import './App.css';
import { useState } from "react";
import ProfileCard from './components/ProfileCard/ProfileCard';
import Configurator from './components/Configurator/Configurator';

function App() {
  const [config, setConfig] = useState({
      size: 'large',
      gradient: ['#20bf55', '#01baef'],
      textColor: '#FFFFFF'
  });
  return (
    <div>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@200;400;600&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@800&display=swap" rel="stylesheet"></link>
      <div className="Main">
        <div className="LeftMain" style={{backgroundImage: 'url(/lightbg.png)', color: '#000'}}>
          <div style={{backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 13 + 'px', padding: '10px'}}>
          <img src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.png" height="40"></img>
          </div>
          <p className="Title">Profile Card</p>
          <ProfileCard config={config}></ProfileCard>
        </div>
        <div className="RightMain">
          <Configurator onChange={setConfig}></Configurator>
        </div>
      </div>
    </div>
  );
}

export default App;
