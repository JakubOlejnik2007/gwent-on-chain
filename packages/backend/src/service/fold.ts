import { ic, nat32, text, update, Variant } from "azle";
import gameBoardStore from "../game_board_store";
import handleBothFolded from "./handle_both_folded";

const foldResponse = Variant({
    Ok: text,
    Err: text,
});

const fold = update([text],
    foldResponse,
    (gameKey: string): typeof foldResponse.tsType => {
        const address = ic.caller().toString();
        const gameOption = gameBoardStore.get(gameKey);

        if (gameOption.None || !gameOption.Some) {
            return { Err: "No game found for the given key" };
        }

        const game = gameOption.Some;

        const [player1, player2] = game.players;

        if (!player2) return { Err: "Game doesn't have two players" };
        if (player1.address === address) {
            player1.isFolded = true;
            gameBoardStore.insert(gameKey, game);
        } else if (player2 && player2.address === address) {
            player2.isFolded = true;
            gameBoardStore.insert(gameKey, game);
        } else {
            return { Err: "Address not found in this game" };
        }

        if (player1.isFolded && player2.isFolded) handleBothFolded(gameKey);

        return { Ok: "Player folded" };
    }
);

export default fold;
