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
    opponentData: PlayerData | undefined;
    myData: MyData | undefined;
    whichPlayerTurn: string | undefined;
}

type GameMetaContextType = {
    data: GameMetaContextData | null;
    assignGameKeyToData: (GameKey: string) => void;
    
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
    whichPlayerTurn: "player1"
};

export const GameMetaContext = createContext<GameMetaContextType>({
    data: null,
    assignGameKeyToData: () => {}
});

const GameMeta = () => {
    const { actor }= useActor()
    const [data, setData] = useState<GameMetaContextData | null>(
        null
    )

    const assignGameKeyToData = (GameKey: string) => {
        setData({
            GameKey: GameKey,
            opponentData: undefined,
            myData: undefined,
            whichPlayerTurn: undefined
        })
    }
    


    return (
        <>
            <GameMetaContext.Provider value={{ data, assignGameKeyToData }}>
                { data === null ? <CreateGame /> : `<Game /> ${data.GameKey}` }
            </GameMetaContext.Provider>
        </>
    )
}

export default GameMeta;