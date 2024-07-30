import { ic, text, update, Variant } from "azle";
import gameBoardStore from "../game_board_store";
import { Player } from "../types";

const changeReadinessResponse = Variant({
    Ok: text,
    Err: text,
});

const change_readiness = update([text],
    changeReadinessResponse,
    (gameKey: string): typeof changeReadinessResponse.tsType => {
        const address = ic.caller().toString();
        const gameOption = gameBoardStore.get(gameKey);

        if (gameOption.None || !gameOption.Some) {
            return { Err: "No game found for the given key" };
        }

        const game = gameOption.Some;
        const player1 = game.players[0];
        const player2 = game.players[1];

        let updated = false;

        if (player1.address === address && !player1.ready) {
            player1.ready = true;
            updated = true;
        } else if (player2?.address === address && !player2.ready) {
            player2.ready = true;
            updated = true;
        } else if (player1.address === address || (player2 && player2.address === address)) {
            return { Err: "Player is already ready" };
        } else {
            return { Err: "This address is not in this game" };
        }

        if (player1.ready && player2 && player2.ready) game.whichPlayerTurn = (game.players[Math.floor(Math.random() * 2)] as Player).name

        if (updated) {
            gameBoardStore.insert(gameKey, game);
            return { Ok: "Player readiness status updated successfully" };
        }

        return { Err: "Failed to update player readiness status" };
    }
);

export default change_readiness;
