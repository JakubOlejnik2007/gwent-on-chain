import { GwentCard } from "../../assets/gwentTypes.helper";

export interface PlayerData {
    address: string | undefined,
    name: string | undefined,
    avatar_url: string | undefined,
    units: [GwentCard[], GwentCard[], GwentCard[]],
    commander: GwentCard | undefined,
    ready: boolean
}

export interface MyData extends PlayerData {
    rejected: GwentCard[],
    nondrawed: GwentCard[]
}

export type GameMetaContextData = {
    GameKey: string;
    opponentData: PlayerData | undefined;
    myData: MyData | undefined;
    whichPlayerTurn: string | undefined;
}

export type GameMetaContextType = {
    data: GameMetaContextData | null;
    assignGameKeyToData: (GameKey: string) => void;
    
}