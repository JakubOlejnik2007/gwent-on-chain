export type GwentRow = "melee" | "ranged" | "siege" | "every";
export type GwentCardAbility = null | "spy" | "bond" | "brotherhood" | "morale" | "resurrection" | "horn" | "agility" | "purge" | "dummy";
export type GwentDeck = "Northern Realms" | "Scoia'tael" | "Monsters" | "Nilfgaard";

export type GwentCard = {
    row: GwentRow,
    imageUrl: string,
    baseStrength: number,
    isHero: boolean,
    isWeather: boolean,
    ability: GwentCardAbility,
}

export interface GwentCardState extends GwentCard {
    calculatedStrength: number;
}

export interface Player {
    address: string,
    name: string,
    avatar_url: string,
    units: [[boolean, GwentCard[]], [boolean, GwentCard[]], [boolean, GwentCard[]]],
    commander: GwentCard | undefined,
    rejected: GwentCard[],
    nondrawed: GwentCard[],
    pickable: GwentCard[],
    ready: boolean;
    cardsChanged: 0 | 1 | 2;
    points: 2 | 1 | 0;
    isFolded: boolean;
    deck: GwentDeck | null;
}

export interface GameBoardState {
    players: [Player, Player | null];
    weatherEffectRow: GwentCard[];
    whichPlayerTurn: string | null;
}

export interface PlayerData {
    address: string | undefined,
    name: string | undefined,
    avatar_url: string | undefined,
    units: [[boolean, GwentCard[]], [boolean, GwentCard[]], [boolean, GwentCard[]]],
    commander: GwentCard | undefined,
    ready: boolean,
    points: 2 | 1 | 0,
    isFolded: boolean;
    deck: GwentDeck | null;
}

export interface MyData extends PlayerData {
    rejected: GwentCard[],
    nondrawed: GwentCard[]
    cardsChanged: 0 | 1 | 2;
}

export type GameMetaContextData = {
    GameKey: string;
    opponentData: PlayerData | undefined;
    myData: MyData | undefined;
    whichPlayerTurn: string | null;
    weatherEffectRow: GwentCard[];
}