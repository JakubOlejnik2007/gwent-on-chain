import React, { createContext, ReactNode, useState } from "react";
import { GwentCard } from "../../assets/gwentTypes.helper";
import { useActor } from "../../ic/Actors";
import CreateGame from "./CreateGame";

interface PlayerData {
    id: string,
    name: string
}

interface MyData extends PlayerData {
    units: [GwentCard[], GwentCard[], GwentCard[]],
    commander: GwentCard | null,
    rejected: GwentCard[],
    nondrawed: GwentCard[]
}

type GameMetaContextData = {
    GameKey: string;
    opponentData: PlayerData;
    myData: MyData
    wchichPlayerTurn: string;
}

type GameMetaContextType = {
    data: GameMetaContextData | null;
    
}

const testObject: GameMetaContextData = {
    GameKey: "asdas",
    opponentData: {
        id: "123",
        name: "opponent"
    },
    myData: {
        id: "456",
        name: "player1",
        units: [[], [], []],
        commander: null,
        rejected: [],
        nondrawed: []
    },
    wchichPlayerTurn: "player1"
};

export const GameMetaContext = createContext<GameMetaContextType | null>(null);

const GameMeta = () => {
    const { actor }= useActor()
    let [data, setData] = useState<GameMetaContextData | null>(
        null //testObject
    )
    


    return (
        <>
            <GameMetaContext.Provider value={{ data }}>
                { data === null ? <CreateGame /> : "<Game />" }
            </GameMetaContext.Provider>
        </>
    )
}

export default GameMeta;