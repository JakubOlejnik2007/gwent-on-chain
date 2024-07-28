import React from 'react';
import Button from '../ui/Button';

type Deck = {
    name: string,
    imageUrl: string
}

const SelectDeck = () => {
    
    
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
                                        <Button>{deck.name}</Button>
                                      </div>
                                    ))
                }
            </div>
          </div>
    )
}

export default SelectDeck;