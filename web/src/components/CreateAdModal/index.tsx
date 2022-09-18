// libs
import axios from "axios";

// react
import { useState, useEffect, FormEvent } from "react";

// radix-ui
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

// components
import Input from '../Form/Input';
import Label from '../Form/Label';
import { Game } from "../GameList";

// styles
import { Check, GameController } from 'phosphor-react';

let dataTest: any;
export default function CreateAdModal() {

    const [games, setGames] = useState<Game[]>([]);
    useEffect(() => {
        axios('http://localhost:3333/games', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => setGames(res.data))
            .catch(err => console.log(err));
    }, []);

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if (Object.entries(data).filter(item => item[1] == "").length > 0 || weekDays.length == 0) {
            alert('Nem tentou')
        } else {
            try {
                await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                    "name": data.nickname,
                    "weekDays": weekDays.map(Number),
                    "useVoiceChannel": voiceChannel,
                    "yearsPlaying": Number(data.yearsPlaying),
                    "hoursStart": data.hoursStart,
                    "hoursEnd": data.hoursEnd,
                    "discord": data.discord,
                })

                alert('Ad created!')
            } catch (error) {
                alert('Error at ad creation')
                console.log(error);
            }
        }

    }

    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [voiceChannel, setVoiceChannel] = useState<boolean>(false);
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/40'>
                <Dialog.Title className='text-3xl text-white font-black'>Publish a new AD</Dialog.Title>

                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                    {/* GAME */}
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="game">What game?</Label>
                        <select
                            name="game"
                            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                            defaultValue=""
                        >
                            <option disabled value="">Select the game you wanna play</option>
                            {games.map(game => (
                                <option key={game.idGame} value={game.idGame}>{game.title}</option>
                            ))}
                        </select>
                    </div>

                    {/* NICKNAME */}
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="nickname">Your name (or nickname)</Label>
                        <Input type="text" name='nickname' placeholder='What are you called within the game?' />
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

                    {/* WEEK DAYS */}
                    <div className='flex gap-6'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="weekDays">When do you usually play?</Label>

                            {/* DAYS */}
                            <ToggleGroup.Root
                                type="multiple"
                                className="grid grid-cols-4 gap-2"
                                value={weekDays}
                                onValueChange={setWeekDays}>
                                <ToggleGroup.Item
                                    value="0"
                                    className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Domingo'>D</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="1"
                                    className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Segunda'>S</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="2"
                                    className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Terça'>T</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="3"
                                    className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Quarta'>Q</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="4"
                                    className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Quinta'>Q</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="5"
                                    className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Sexta'>S</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="6"
                                    className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Sábado'>S</ToggleGroup.Item>
                            </ToggleGroup.Root>
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
                    <label className='mt-2 flex items-center gap-2 text-sm'>
                        <Checkbox.Root
                            className="w-6 h-6 p-1 rounded bg-zinc-900"
                            onCheckedChange={(checked) => checked ? setVoiceChannel(true) : setVoiceChannel(false)}
                            name="voiceChannel"
                        >
                            <Checkbox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        I often connect to the voice chat
                    </label>

                    {/* BUTTONS */}
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
    );
}