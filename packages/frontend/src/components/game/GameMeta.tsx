import React, { createContext, useState, useEffect } from "react";
import { useActor } from "../../ic/Actors";
import CreateGame from "./CreateGame";
import Game from "./Game";
import { GameMetaContextData, GameMetaContextType } from "./gamesTypes.helper";

const testObject: GameMetaContextData = {
    GameKey: "asdas",
    opponentData: {
        address: "123",
        name: "opponent",
        avatar_url: "https://tenco.waw.pl/img.png",
        units: [[], [], []],
        commander: undefined,
        ready: false,
        points: 2,
        isFolded: false
    },
    myData: {
        address: "456",
        name: "player1",
        avatar_url: "https://tenco.waw.pl/img.",
        units: [[], [], []],
        commander: undefined,
        rejected: [],
        nondrawed: [],
        ready: true,
        cardsChanged: 1,
        points: 2,
        isFolded: false,
    },
    whichPlayerTurn: null,
};

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
