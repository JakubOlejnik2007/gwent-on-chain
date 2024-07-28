import React, { useContext, useState } from 'react';
import Button from '../ui/Button';
import { useActor } from '../../ic/Actors';
import { GameMetaContext } from './GameMeta';

type Deck = {
    name: string,
    imageUrl: string
}

const SelectDeck = () => {

    const { actor } = useActor();
    const { data } = useContext(GameMetaContext);

    const [isError, setIsError] = useState<boolean>(false);

    const handleSelectDeck = async (deckName: string) => {
        try {
            if (!actor) throw new Error("Actor not found");
            if (data === null) throw new Error("GameKey not set");
            console.log(`Selecting deck: ${deckName}`);
            const response = await actor.get_deck(data.GameKey, deckName);
            if ("Ok" in response) console.log(response.Ok);
            if (!response) throw new Error("Undefined object");
            if ("Err" in response) throw new Error(response.Err);
        } catch (error) {
            setIsError(true);
            console.error("Failed to select deck:", error);
        }

    }

    const decks: Deck[] = [
        {
            name: "Northern Realms",
            imageUrl: "/cards/northern_realms.png"
        },
        {
            name: "Scoia'tael",
            imageUrl: "/cards/scoiatael.png"
        },
        {
            name: "Monsters",
            imageUrl: "/cards/monsters.png"
        },
        {
            name: "Nilfgaard",
            imageUrl: "/cards/nilfgaard.png"
        },
    ]

    return (
        <div className="flex flex-col items-center w-full gap-10 py-8 md:px-8">
            <div className="text-2xl font-bold">Wybierz talię</div>
            <div className="flex items-stretch justify-center flex-wrap gap-5">
                {
                    decks.map((deck, index) => (
                        <div key={index} className='flex flex-col gap-3'>
                            <img className="w-40" src={deck.imageUrl} />
                            <Button onClick={async () => await handleSelectDeck(deck.name)}>{deck.name}</Button>
                        </div>
                    ))
                }
            </div>
            {isError ? <div className='bg-red-700 rounded-xl px-4 py-2 drop-shadow-lg'>
                    Błąd podczas pobierania kart.
                </div> : ""}
        </div>
    )
}

export default SelectDeck;