import React, { createContext, useState, useEffect } from "react";
import { useActor } from "../../ic/Actors";
import CreateGame from "./CreateGame";
import Game from "./Game";
import { GameMetaContextData, GameMetaContextType } from "./gamesTypes.helper";
import { toast } from "react-hot-toast";
import { GwentCard } from "../../assets/gwentTypes.helper";

export const GameMetaContext = createContext<GameMetaContextType>({
    data: null,
    assignGameKeyToData: () => { },
});

const GameMeta = () => {
    const { actor } = useActor();
    const [data, setData] = useState<GameMetaContextData | null>(null);

    const assignGameKeyToData = (GameKey: string) => {
        setData({
            GameKey: GameKey,
            opponentData: undefined,
            myData: undefined,
            whichPlayerTurn: null,
            weatherEffectRow: [],
            lastPlayedCard: null
        });
    };

    const getCardName = ((card: GwentCard) => {
        let cardName = card.imageUrl.split("/")[3].split(".")[0];
        return cardName.substring(0, cardName.length - 1);
    })

    useEffect(() => {
        if (data?.GameKey) {
            const interval = setInterval(async () => {
                try {
                    const updatedData = await actor?.get_game_state(data.GameKey);

                    if (updatedData === undefined) throw new Error("Undefined object");
                    if ("Err" in updatedData) throw new Error(updatedData.Err);
                    console.log(JSON.parse(updatedData.Ok))
                    setData((prevData) => {
                        const newData = JSON.parse(updatedData.Ok)
                        if (
                            prevData?.lastPlayedCard !== null &&
                            prevData?.lastPlayedCard.imageUrl !== newData.lastPlayedCard.imageUrl
                        ) {
                            toast.success(getCardName(newData.lastPlayedCard));
                        }
                        return {
                            ...prevData,
                            ...newData,

                        }
                    });

                } catch (error) {
                    console.error("Failed to update data:", error);
                }
            }, 2500);
            return () => clearInterval(interval);
        }
    }, [data?.GameKey]);

    return (
        <GameMetaContext.Provider value={{ data, assignGameKeyToData }}>
            {data === null ? <CreateGame /> : <Game />}
        </GameMetaContext.Provider>
    );
};

export default GameMeta;
