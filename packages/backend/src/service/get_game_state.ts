import { ic, text, update, Variant } from "azle";
import { PlayerData, MyData, GameMetaContextData } from "../types";
import gameBoardStore from "../game_board_store";

const getGameStateResponce = Variant({
    Ok: text,
    Err: text,
})

const get_game_state = update([text],
    getGameStateResponce,
    (gameKey: string): typeof getGameStateResponce.tsType => {
        const address = ic.caller().toString();
        const game = gameBoardStore.get(gameKey).Some;
        if (!game) {
            return { Err: "No game found for the given key" };
        }
        const player1 = game.players[0];
        const player2 = game.players[1];

        let myData: MyData;
        let opponentData: PlayerData | undefined;

        if (!(player1.address === address || player2?.address === address)) {
            return { Err: "This address is not in this game" }
        }

        myData = { ...player1 };
        if (player2) {
            opponentData = { ...player2 };
        }
        if (player2) {
            if (player2.address === address) {
                myData = { ...player2 }
                opponentData = { ...player1 }
            }
        } else opponentData = undefined;
        const response: GameMetaContextData = {
            GameKey: gameKey,
            opponentData: opponentData,
            myData: myData,
            whichPlayerTurn: game.whichPlayerTurn,
            weatherEffectRow: game.weatherEffectRow
        }
        return { Ok: JSON.stringify(response) };
    }
)

export default get_game_state;