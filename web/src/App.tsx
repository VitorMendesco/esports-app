// components
import GameList from './components/GameList';
import CreateAdBanner from './components/CreateAdBanner';
import Input from './components/Form/Input';
import Label from './components/Form/Label';
// radix-ui
import * as Dialog from "@radix-ui/react-dialog";

// styles
import './styles/main.css';
import logoImg from './assets/logo-esports.svg';
import { GameController } from 'phosphor-react';

function App() {

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="eSports Logo" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Your <span className='text-transparent bg-duoGradient bg-clip-text'>duo</span> is here!
      </h1>
      <GameList />
      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/40'>
            <Dialog.Title className='text-3xl text-white font-black'>Publish a new AD</Dialog.Title>

            <form className='mt-8 flex flex-col gap-4'>
              {/* GAME */}
              <div className='flex flex-col gap-2'>
                <Label htmlFor="game">What game?</Label>
                <Input type="text" name="game" placeholder="Select the game you wanna play" />
              </div>

              {/* NICKNAME */}
              <div className='flex flex-col gap-2'>
                <Label htmlFor="name">Your name (or nickname)</Label>
                <Input type="text" name='name' placeholder='What are you called within the game?' />
              </div>

              <div className='grid grid-cols-2 gap-6'>
                {/* YEARS PLAYING */}
                <div className='flex flex-col gap-2'>
                  <Label htmlFor="yearsPlaying">Years playing this game</Label>
                  <Input type="number" name='yearsPlaying' placeholder="It's OK to be zero" />
                </div>

                {/* DISCORD */}
                <div className='flex flex-col gap-2'>
                  <Label htmlFor="discord">What's your Discord?</Label>
                  <Input type="text" name='discord' placeholder="User#0000" />
                </div>
              </div>

              <div className='flex gap-6'>
                {/* WEEK DAYS */}
                <div className='flex flex-col gap-2'>
                  <Label htmlFor="weekDays">When do you usually play?</Label>

                  {/* DAYS */}
                  <div className='grid grid-cols-4 gap-2'>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900'
                      title='Domingo'>D</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900'
                      title='Segunda'>S</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900'
                      title='Terça'>T</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900'
                      title='Quarta'>Q</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900'
                      title='Quinta'>Q</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900'
                      title='Sexta'>S</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900'
                      title='Sábado'>S</button>
                  </div>
                </div>

                {/* HOURS TO PLAY */}
                <div className='flex flex-col gap-2 flex-1'>
                  <Label htmlFor="hoursStart">What time of day?</Label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input type="time" name='hoursStart' placeholder='From' />
                    <Input type="time" name='hoursEnd' placeholder='To' />
                  </div>
                </div>
              </div>

              {/* VOICE CHAT */}
              <div className='mt-2 flex gap-2 text-sm'>
                <Input type="checkbox" />
                I often connect to the voice chat
              </div>

              <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close
                  className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                  Cancel
                </Dialog.Close>
                <button
                  className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
                  type='submit'>
                  <GameController size={24} />
                  Find duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
