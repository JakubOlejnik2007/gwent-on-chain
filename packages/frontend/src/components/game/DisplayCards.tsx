import React from 'react';
import { northernRealmsCards } from '../../assets/gwentCards.helper';


const DisplayCards = () => {
    return (
        <div className="w-full max-w-4xl border-zinc-700/50 border-[1px] bg-zinc-900 px-5 py-5 drop-shadow-xl rounded-3xl flex flex-col items-center">
          <div className="flex flex-col items-center w-full gap-10 py-8 md:px-8">
            <div className="text-2xl font-bold">Podstawowe zasady gry</div>
            <div className="flex items-stretch justify-center flex-wrap gap-5">
                {
                  northernRealmsCards.map((card, index) => (
                                      <div key={index}>
                                        <img className="w-20" src={card.imageUrl} />
                                        <p className={card.isHero ? "text-orange-900" : ""}>{JSON.stringify(card)}</p>
                                      </div>
                                    ))
                }
            </div>
          </div>
        </div>
      );
}

export default DisplayCards;