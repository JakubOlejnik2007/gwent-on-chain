import { StableBTreeMap, text } from "azle";

const GameKey = text;
type GameKey = typeof GameKey.tsType;
type GwentRow = "melee" | "ranged" | "siege" | "every";
type GwentCardAbility = null | "spy" | "bond" | "brotherhood" | "morale" | "resurrection" | "horn" | "agility" | "purge" | "dummy"

type GwentCard = {
    row: GwentRow,
    imageUrl: string,
    baseStrength: number,
    isHero: boolean,
    isWeather: boolean,
    ability: GwentCardAbility,
}

// 0 - melee, 1 - ranged, 2 - siege
interface Player {
    id: string,
    name: string,
    units: [GwentCard[], GwentCard[], GwentCard[]],
    commander: GwentCard,
    rejected: GwentCard[],
    nondrawed: GwentCard[]
}

export interface GameBoardState {
    player1: Player,
    player2: Player,
    weatherEffectRow: GwentRow[]
}

export let gameBoardStore = StableBTreeMap<GameKey, GameBoardState>(0);
