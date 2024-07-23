import React, { useState } from 'react';
import Button from '../ui/Button';
import { useActor } from '../../ic/Actors';

const CreateGame = () => {
    const [isError, setIsError] = useState<boolean | null>(null);
    const { actor } = useActor();

    const handleCreateGame = async () => {
        try {
            if(!actor) throw new Error("Actor not found");
            const response = await actor.create_game();
            if(response === undefined) throw new Error("Undefined object");
            if("Err" in response) throw new Error(response.Err);
            console.log(response.Ok)
        } catch (error) {
            console.log(error)
            setIsError(true);
        }
        
    }

    return (
        <div className="w-full max-w-4xl border-zinc-700/50 border-[1px] bg-zinc-900 px-5 py-5 drop-shadow-xl rounded-3xl flex flex-col items-center">
          <div className="flex flex-col items-center w-full gap-10 py-8 md:px-8">
            <div className="text-2xl font-bold">Stwórz lub dołącz do gry</div>
                <Button onClick={handleCreateGame}>Stwórz grę</Button>
                {isError ? <div className='bg-red-700 rounded-xl px-4 py-2 drop-shadow-lg'>
                    Błąd podczas tworzenia gry. Spróbuj ponownie później.
                </div> : ""}
          </div>
        </div>
    )
}

export default CreateGame;