import { ic, nat32, text, update, Variant } from "azle";
import gameBoardStore from "../game_board_store";

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
        if (!game.players[1]) return { Err: "Game doesn't have two players" };
        if (game.players[0].address === address) {
            const player = game.players[0];
            player.isFolded = true;
            gameBoardStore.insert(gameKey, game);
            return { Ok: "Player folded" };
        } else if (game.players[1] && game.players[1].address === address) {
            const player = game.players[1];
            player.isFolded = true;
            gameBoardStore.insert(gameKey, game);
            return { Ok: "Player folded" };
        } else {
            return { Err: "Address not found in this game" };
        }
    }
);

export default fold;
