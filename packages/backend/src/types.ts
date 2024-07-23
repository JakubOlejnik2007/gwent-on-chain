export type GwentRow = "melee" | "ranged" | "siege" | "every";
export type GwentCardAbility = null | "spy" | "bond" | "brotherhood" | "morale" | "resurrection" | "horn" | "agility" | "purge" | "dummy"

export type GwentCard = {
    row: GwentRow,
    imageUrl: string,
    baseStrength: number,
    isHero: boolean,
    isWeather: boolean,
    ability: GwentCardAbility,
}

export interface Player {
    address: string,
    name: string,
    avatar_url: string,
    units: [GwentCard[], GwentCard[], GwentCard[]],
    commander: GwentCard | undefined,
    rejected: GwentCard[],
    nondrawed: GwentCard[]
}

export interface GameBoardState {
    players: [Player, Player | undefined]
    weatherEffectRow: GwentRow[]
}