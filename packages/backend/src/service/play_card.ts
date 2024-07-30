import { ic, nat32, text, update, Variant } from "azle";
import gameBoardStore from "../game_board_store";
import { GameBoardState, Player } from "../types";

const playCardResponse = Variant({
    Ok: text,
    Err: text,
});

const changeTurn = (gameKey: string) => {
    const game = gameBoardStore.get(gameKey).Some as GameBoardState;
    game.whichPlayerTurn = game.whichPlayerTurn === game.players[0].name ?
        (game.players[1] as Player).name : game.players[0].name;

    gameBoardStore.insert(gameKey, game);
}

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

        if (player.name !== game.whichPlayerTurn) return { Err: "Not your turn" };

        const playedCard = player.nondrawed[cardIndex];
        player.nondrawed = player.nondrawed.filter(card => card.imageUrl !== playedCard.imageUrl)

        if (playedCard.ability !== "spy") {
            player.units[
                cardRow === "melee" ? 0 :
                    cardRow === "ranged" ? 1 : 2
            ].push(playedCard);
        }

        gameBoardStore.insert(gameKey, game);
        changeTurn(gameKey);

        return { Ok: "Card played." };
    }
);

export default play_card;
