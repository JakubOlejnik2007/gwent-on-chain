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

        myData = {
            address: player1.address,
            name: player1.name,
            avatar_url: player1.avatar_url,
            units: player1.units,
            commander: player1.commander,
            rejected: player1.rejected,
            nondrawed: player1.nondrawed,
            ready: player1.ready,
            cardsChanged: player1.cardsChanged
        };
        if (player2) {
            opponentData = {
                address: player2.address,
                name: player2.name,
                avatar_url: player2.avatar_url,
                units: player2.units,
                commander: player2.commander,
                ready: player2.ready
            };
        }
        if (player2) {
            if (player2.address === address) {
                myData = {
                    address: player2.address,
                    name: player2.name,
                    avatar_url: player2.avatar_url,
                    units: player2.units,
                    commander: player2.commander,
                    rejected: player2.rejected,
                    nondrawed: player2.nondrawed,
                    ready: player2.ready,
                    cardsChanged: player2.cardsChanged
                }
                opponentData = {
                    address: player1.address,
                    name: player1.name,
                    avatar_url: player1.avatar_url,
                    units: player1.units,
                    commander: player1.commander,
                    ready: player1.ready
                }
            }
        } else opponentData = undefined;
        const response: GameMetaContextData = {
            GameKey: gameKey,
            opponentData: opponentData,
            myData: myData,
            whichPlayerTurn: game.whichPlayerTurn
        }
        return { Ok: JSON.stringify(response) };
    }
)

export default get_game_state;