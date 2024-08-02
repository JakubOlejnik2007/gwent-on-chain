import React, { createContext, useState, useEffect } from "react";
import { useActor } from "../../ic/Actors";
import CreateGame from "./CreateGame";
import Game from "./Game";
import { GameMetaContextData, GameMetaContextType } from "./gamesTypes.helper";

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
        });
    };

    useEffect(() => {
        if (data?.GameKey) {
            const interval = setInterval(async () => {
                try {
                    const updatedData = await actor?.get_game_state(data.GameKey);

                    if (updatedData === undefined) throw new Error("Undefined object");
                    if ("Err" in updatedData) throw new Error(updatedData.Err);
                    console.log(JSON.parse(updatedData.Ok))
                    setData((prevData) => ({
                        ...prevData,
                        ...JSON.parse(updatedData.Ok),
                    }));
                } catch (error) {
                    console.error("Failed to update data:", error);
                }
            }, 1000);
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
