import { GwentCard, GwentCardState, GwentRow } from "../types";

export const getCardName = ((card: GwentCard) => {
    let cardName = card.imageUrl.split("/")[3].split(".")[0];
    return cardName.substring(0, cardName.length - 1);
})

export const calcValueOfCardsInRow = (row: [boolean, GwentCard[]], weatherEffectRow: GwentCard[], cardRow: GwentRow): GwentCardState[] => {
    const [isHorn, cards] = row;

    let howManyMoraleInRows = 0;
    cards.forEach(card => howManyMoraleInRows += (card.ability === "morale" ? 1 : 0));

    return cards.map((card, i) => {
        const thisCardName = getCardName(card);

        let { isHero, baseStrength, ability } = card;
        if (isHero) return {
            ...card,
            calculatedStrength: card.baseStrength
        };

        weatherEffectRow.forEach((card) => card.row === cardRow ? baseStrength = (baseStrength === 0 ? 0 : 1) : 0);

        if (ability === "bond") {
            let howManyOccurs = 0;

            cards.forEach(card => {
                const cardName = getCardName(card)
                howManyOccurs += (cardName === thisCardName ? 1 : 0)
            })

            baseStrength = baseStrength * howManyOccurs;
        }

        baseStrength += howManyMoraleInRows;
        if (ability === "morale" && howManyMoraleInRows > 0) baseStrength--;
        if (isHorn) baseStrength *= 2
        return {
            ...card,
            calculatedStrength: baseStrength
        }
    })

}

export const rowNameToIndex = (row: "melee" | "ranged" | "siege" | "every"): 0 | 1 | 2 => row === "melee" ? 0 : row === "ranged" ? 1 : 2;
export const rowIndexToName = (index: 0 | 1 | 2): "melee" | "ranged" | "siege" => index === 0 ? "melee" : index === 1 ? "ranged" : "siege";
