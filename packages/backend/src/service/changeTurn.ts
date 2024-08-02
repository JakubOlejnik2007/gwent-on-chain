import gameBoardStore from "../game_board_store";
import { GameBoardState, Player } from "../types";

export const changeTurn = (gameKey: string): void => {
    const game = gameBoardStore.get(gameKey).Some as GameBoardState;
    const [player1, player2] = game.players;

    const currentPlayer = (game.whichPlayerTurn === player1.name ? player1 : player2) as Player;
    const otherPlayer = (game.whichPlayerTurn === player1.name ? player2 : player1) as Player;

    if (currentPlayer?.isFolded) {
        console.log(`${currentPlayer.name} has passed. Turn does not change.`);
        return;
    }

    if (!otherPlayer?.isFolded) {
        game.whichPlayerTurn = otherPlayer.name;
    }


    gameBoardStore.insert(gameKey, game);
};