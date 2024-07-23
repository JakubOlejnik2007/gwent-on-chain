import React, { createContext, ReactNode, useState } from "react";
import { GwentCard } from "../../assets/gwentTypes.helper";
import { useActor } from "../../ic/Actors";
import CreateGame from "./CreateGame";

interface PlayerData {
    address: string | undefined,
    name: string | undefined,
    avatar_url: string | undefined,
    units: [GwentCard[], GwentCard[], GwentCard[]],
    commander: GwentCard | undefined
}

interface MyData extends PlayerData {
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
        address: "123",
        name: "opponent",
        avatar_url: "https://tenco.waw.pl/img.png",
        units: [[], [], []],
        commander: undefined
    },
    myData: {
        address: "456",
        name: "player1",
        avatar_url: "https://tenco.waw.pl/img.png",
        units: [[], [], []],
        commander: undefined,
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