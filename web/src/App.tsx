import './styles/main.css';

import logoImg from './assets/logo-esports.svg';

function App() {

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="eSports Logo" />

      <h1 className='text-6xl text-white font-black mt-20'>Your <span className='text-transparent bg-duoGradient bg-clip-text'>duo</span> is here!</h1>
    </div>
  );
}

export default App;
