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
    id: string,
    name: string,
    units: [GwentCard[], GwentCard[], GwentCard[]],
    commander: GwentCard,
    rejected: GwentCard[],
    nondrawed: GwentCard[]
}

export interface GameBoardState {
    players: [Player, Player]
    weatherEffectRow: GwentRow[]
}