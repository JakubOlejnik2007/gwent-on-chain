import gameBoardStore from "../game_board_store";
import { GameBoardState, Player } from "../types";

const calcSumOfPlayer = (player: Player): number => {
    return player.units.reduce((acc1, row) => acc1 + row.reduce((acc2, card) => acc2 + card.baseStrength, 0), 0);
}

const handleBothFolded = (gameKey: string) => {
    const game = gameBoardStore.get(gameKey).Some as GameBoardState;
    const [player1, player2] = game.players as [Player, Player];

    const sumOfPlayer1 = calcSumOfPlayer(player1);
    const sumOfPlayer2 = calcSumOfPlayer(player2);

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

    player1.rejected.push(...player1.units[0], ...player1.units[1], ...player1.units[2]);
    player2.rejected.push(...player2.units[0], ...player2.units[1], ...player2.units[2]);

    player1.units = [[], [], []];
    player2.units = [[], [], []];

    game.weatherEffectRow = [];

    gameBoardStore.insert(gameKey, game);
}

export default handleBothFolded;