import { ic, nat32, text, update, Variant } from "azle";
import gameBoardStore from "../game_board_store";
import { GameBoardState, GwentCard, GwentCardState, Player } from "../types";
import handleBothFolded from "./handle_both_folded";
import { changeTurn } from "./changeTurn";
import { calcValueOfCardsInRow, getCardName } from "../assets/utils.helper";

const playCardResponse = Variant({
    Ok: text,
    Err: text,
});

const rowNameToIndex = (row: "melee" | "ranged" | "siege" | "every"): 0 | 1 | 2 => row === "melee" ? 0 : row === "ranged" ? 1 : 2;
const rowIndexToName = (index: 0 | 1 | 2): "melee" | "ranged" | "siege" => index === 0 ? "melee" : index === 1 ? "ranged" : "siege";

const play_card = update([text, text, nat32],
    playCardResponse,
    (gameKey: string, cardRow: string, cardIndex: number): typeof playCardResponse.tsType => {
        const address = ic.caller().toString();
        const gameOption = gameBoardStore.get(gameKey);

        if (gameOption.None || !gameOption.Some) {
            return { Err: "No game found for the given key" };
        }

        const game = gameOption.Some;
        let playerIndex = 0;


        if (!game.players[1]) return { Err: "Game doesn't have two players" };

        if (game.players[0].address === address) playerIndex = 0;
        else if (game.players[1].address === address) playerIndex = 1;
        else return { Err: "Address not found in this game" };

        let opponentIndex = playerIndex === 0 ? 1 : 0;

        const player = game.players[playerIndex] as Player;
        const opponent = game.players[opponentIndex] as Player;

        if (player.name !== game.whichPlayerTurn) return { Err: "Not your turn" };

        const playedCard = player.nondrawed[cardIndex];
        player.nondrawed = player.nondrawed.filter(card => card.imageUrl !== playedCard.imageUrl)

        if (playedCard.row === "every" && playedCard.ability === "horn") {
            player.units[
                rowNameToIndex(cardRow as "melee" | "ranged" | "siege" | "every")
            ][0] = true;
        }
        else if (playedCard.ability === "purge") {
            const calcStrenghOfCards: [
                [GwentCardState[], GwentCardState[], GwentCardState[]], [GwentCardState[], GwentCardState[], GwentCardState[]]
            ] = [[[], [], []], [[], [], []]]

            let maxValueOfCard: number = 0;
            if (playedCard.row === "every") {
                for (let i = 0; i < 2; i++)
                    for (let j = 0; j < 3; j++) {
                        calcStrenghOfCards[i][j] = calcValueOfCardsInRow((game.players[i] as Player).units[j], game.weatherEffectRow, rowIndexToName(j as 0 | 1 | 2));
                        calcStrenghOfCards[i][j].forEach(card => card.calculatedStrength > maxValueOfCard && !card.isHero ? maxValueOfCard = card.calculatedStrength : "");
                    }

                for (let i = 0; i < 2; i++) {
                    const player = (game.players[i] as Player)
                    for (let j = 0; j < 3; j++) {
                        const indiciesToRemove: number[] = []
                        calcStrenghOfCards[i][j].forEach((card, index) => card.calculatedStrength === maxValueOfCard ? indiciesToRemove.push(index) : "");

                        indiciesToRemove.sort((a, b) => b - a).forEach(index => {
                            if (!player.units[j][1][index].isHero) {
                                const removedCard = player.units[j][1].splice(index, 1)[0];
                                player.rejected.push(removedCard);
                            }
                        })

                    }
                }
            } else {
                const opponentRowCalc = calcValueOfCardsInRow(opponent.units[rowNameToIndex(playedCard.row)], game.weatherEffectRow, playedCard.row);
                const sumOfRow = opponentRowCalc.reduce((sum, card) => {
                    if (card.calculatedStrength > maxValueOfCard && !card.isHero) maxValueOfCard = card.calculatedStrength;
                    return sum + card.calculatedStrength
                }, 0);
                if (sumOfRow >= 10) {
                    const indiciesToRemove: number[] = []
                    opponentRowCalc.forEach((card, index) => card.calculatedStrength === maxValueOfCard ? indiciesToRemove.push(index) : "");

                    indiciesToRemove.sort((a, b) => b - a).forEach(index => {
                        if (!opponent.units[rowNameToIndex(playedCard.row)][1][index].isHero) {
                            const removedCard = opponent.units[rowNameToIndex(playedCard.row)][1].splice(index, 1)[0];
                            opponent.rejected.push(removedCard);
                        }
                    })
                }
            }




        }
        else if (playedCard.isWeather) {
            if (playedCard.row === "every") game.weatherEffectRow = [];
            else {
                game.weatherEffectRow.push(playedCard);
                game.weatherEffectRow = [...new Set(game.weatherEffectRow)];
            }
        } else if (playedCard.ability !== "spy") {

            if (playedCard.ability === "horn") player.units[
                rowNameToIndex(cardRow as "melee" | "ranged" | "siege" | "every")
            ][0] = true;

            if (playedCard.ability === "brotherhood") {
                const brotherhoodCards: GwentCard[] = [];
                brotherhoodCards.push(playedCard);
                const playedCardName = getCardName(playedCard)

                const addBrotherhoodCards = (cardList: GwentCard[], playedCardName: string) => {
                    return cardList.filter(card => {
                        const cardName = getCardName(card);
                        if (cardName === playedCardName) {
                            brotherhoodCards.push(card);
                            return false;
                        }
                        return true;
                    });
                };

                player.nondrawed = addBrotherhoodCards(player.nondrawed, playedCardName);
                player.pickable = addBrotherhoodCards(player.pickable, playedCardName);
                brotherhoodCards.forEach(card => player.units[rowNameToIndex(card.row)][1].push(card));

            } else {
                player.units[
                    rowNameToIndex(cardRow as "melee" | "ranged" | "siege" | "every")
                ][1].push(playedCard);
            }
        } else {
            for (let i = 0; i < 2; i++) {
                const card = player.pickable[Math.floor(Math.random() * player.pickable.length)];
                player.nondrawed.push(card);
                player.pickable = player.pickable.filter(c => c !== card);
            }
            opponent.units[
                rowNameToIndex(cardRow as "melee" | "ranged" | "siege" | "every")
            ][1].push(playedCard);
        }

        if (player.nondrawed.length === 0) player.isFolded = true;
        if (player.isFolded && opponent.isFolded) handleBothFolded(gameKey);
        gameBoardStore.insert(gameKey, game);
        changeTurn(gameKey);

        const calcStrenghOfCards: [
            [GwentCardState[], GwentCardState[], GwentCardState[]], [GwentCardState[], GwentCardState[], GwentCardState[]]
        ] = [[[], [], []], [[], [], []]]

        calcStrenghOfCards[0][0] = calcValueOfCardsInRow(player.units[0], game.weatherEffectRow, "melee");
        calcStrenghOfCards[0][1] = calcValueOfCardsInRow(player.units[1], game.weatherEffectRow, "ranged");
        calcStrenghOfCards[0][2] = calcValueOfCardsInRow(player.units[2], game.weatherEffectRow, "siege");
        calcStrenghOfCards[1][0] = calcValueOfCardsInRow(opponent.units[0], game.weatherEffectRow, "melee");
        calcStrenghOfCards[1][1] = calcValueOfCardsInRow(opponent.units[1], game.weatherEffectRow, "ranged");
        calcStrenghOfCards[1][2] = calcValueOfCardsInRow(opponent.units[2], game.weatherEffectRow, "siege");

        console.log(calcStrenghOfCards)

        return { Ok: "Card played." };
    }
);

export default play_card;
