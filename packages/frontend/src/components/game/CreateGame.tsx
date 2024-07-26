import React, { useContext, useState } from 'react';
import Button from '../ui/Button';
import { useActor } from '../../ic/Actors';
import Pill from '../ui/Pill';
import { GameMetaContext } from './GameMeta';

const CreateGame = () => {
    const [isError, setIsError] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [gameId, setGameId] = useState<string>("");
    const { actor } = useActor();
    const { data, assignGameKeyToData } = useContext(GameMetaContext);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGameId(prevState => e.target.value)
    }
    const handleCreateGame = async () => {
        try {
            if (!actor) throw new Error("Actor not found");
            const response = await actor.create_game();
            if (response === undefined) throw new Error("Undefined object");
            if ("Err" in response) throw new Error(response.Err);
            console.log(response.Ok)
            assignGameKeyToData(response.Ok);
        } catch (error) {
            console.log(error)
            setIsError(true);
            setErrorMessage(error);
        }
    }

    const handleJoinGame = async () => {
        try {
            if (!actor) throw new Error("Actor not found");
            const response = await actor.join_game(gameId);
            if (response === undefined) throw new Error("Undefined object");
            if ("Err" in response) throw new Error(response.Err);
            console.log(response.Ok)
            assignGameKeyToData(response.Ok);
        } catch (error) {
            console.log(error)
            setIsError(true);
            setErrorMessage(error);
        }

    }

    return (
        <div className="w-full max-w-4xl border-zinc-700/50 border-[1px] bg-zinc-900 px-5 py-5 drop-shadow-xl rounded-3xl flex flex-col items-center">
            <div className="flex flex-col items-center w-full gap-10 py-8 md:px-8">
                <div className="text-2xl font-bold">Stwórz lub dołącz do gry</div>
                <Button onClick={handleCreateGame}>Stwórz grę</Button>
                <p className="text-center">lub</p>
                <div className='flex gap-3'>
                    <Pill>
                        <input className='bg-transparent border-2 border-zinc-700 rounded-xl p-2' type="text" placeholder='Id gry:' onChange={handleInputChange} />
                    </Pill>
                    <Button onClick={handleJoinGame}>Dołącz do gry</Button>
                </div>
                {isError ? <div className='bg-red-700 rounded-xl px-4 py-2 drop-shadow-lg'>
                    Błąd podczas tworzenia gry lub dołączania do niej. Spróbuj ponownie później.<br /> {errorMessage}
                </div> : ""}
            </div>
        </div>
    )
}

export default CreateGame;