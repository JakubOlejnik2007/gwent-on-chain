import { calcValueOfCardsInRow, getCardName, rowIndexToName } from "../assets/utils.helper";
import gameBoardStore from "../game_board_store";
import { GameBoardState, GwentCard, GwentCardState, GwentRow, Player } from "../types";



const calcSumOfPlayer = (playerCards: [GwentCardState[], GwentCardState[], GwentCardState[]]): number => {
    return playerCards.reduce((acc1, row) => acc1 + row.reduce((acc2, card) => acc2 + card.baseStrength, 0), 0);
}


const handleBothFolded = (gameKey: string) => {
    const game = gameBoardStore.get(gameKey).Some as GameBoardState;
    const [player1, player2] = game.players as [Player, Player];

    const calcStrenghOfCards: [
        [GwentCardState[], GwentCardState[], GwentCardState[]], [GwentCardState[], GwentCardState[], GwentCardState[]]
    ] = [[[], [], []], [[], [], []]]

    for (let i = 0; i < 2; i++)
        for (let j = 0; j < 3; j++) {
            calcStrenghOfCards[i][j] = calcValueOfCardsInRow((game.players[i] as Player).units[j], game.weatherEffectRow, rowIndexToName(j as 0 | 1 | 2));
        }

    const sumOfPlayer1 = calcSumOfPlayer(calcStrenghOfCards[0]);
    const sumOfPlayer2 = calcSumOfPlayer(calcStrenghOfCards[1]);

    if (sumOfPlayer1 > sumOfPlayer2) {
        player2.points--;
    } else if (sumOfPlayer1 < sumOfPlayer2) {
        player1.points--;
    } else {
        player1.points--;
        player2.points--;
    }


    player1.isFolded = false;
    player2.isFolded = false;

    player1.rejected.push(...player1.units[0][1], ...player1.units[1][1], ...player1.units[2][1]);
    player2.rejected.push(...player2.units[0][1], ...player2.units[1][1], ...player2.units[2][1]);

    player1.units = [[false, []], [false, []], [false, []]];
    player2.units = [[false, []], [false, []], [false, []]];

    game.weatherEffectRow = [];

    gameBoardStore.insert(gameKey, game);
}

export default handleBothFolded;