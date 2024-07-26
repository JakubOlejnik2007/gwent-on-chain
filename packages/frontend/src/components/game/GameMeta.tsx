import React, { createContext, ReactNode, useState } from "react";
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
        commander: undefined
    },
    myData: {
        address: "456",
        name: "player1",
        avatar_url: "https://tenco.waw.pl/img.",
        units: [[], [], []],
        commander: undefined,
        rejected: [],
        nondrawed: []
    },
    wchichPlayerTurn: undefined,
};

export const GameMetaContext = createContext<GameMetaContextType>({
    data: null,
    assignGameKeyToData: () => {}
});

const GameMeta = () => {
    const { actor }= useActor()
    const [data, setData] = useState<GameMetaContextData | null>(
        testObject
    )

    const assignGameKeyToData = (GameKey: string) => {
        setData({
            GameKey: GameKey,
            opponentData: undefined,
            myData: undefined,
            wchichPlayerTurn: undefined
        })
    }
    
    return (
        <>
            <GameMetaContext.Provider value={{ data, assignGameKeyToData }}>
                { data === null ? <CreateGame /> : <Game /> }
            </GameMetaContext.Provider>
        </>
    )
}

export default GameMeta;