import { ic, nat32, text, update, Variant } from "azle";
import gameBoardStore from "../game_board_store";
import { GameBoardState, Player } from "../types";
import handleBothFolded from "./handle_both_folded";

const playCardResponse = Variant({
    Ok: text,
    Err: text,
});

const changeTurn = (gameKey: string): void => {
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

        if (playedCard.ability !== "spy") {
            player.units[
                cardRow === "melee" ? 0 :
                    cardRow === "ranged" ? 1 : 2
            ].push(playedCard);
        } else {
            for (let i = 0; i < 2; i++) {
                const card = player.pickable[Math.floor(Math.random() * player.pickable.length)];
                player.nondrawed.push(card);
                player.pickable = player.pickable.filter(c => c !== card);
            }
            opponent.units[
                cardRow === "melee" ? 0 :
                    cardRow === "ranged" ? 1 : 2
            ].push(playedCard);
        }

        if (player.nondrawed.length === 0) player.isFolded = true;
        if (player.isFolded && opponent.isFolded) handleBothFolded(gameKey);
        gameBoardStore.insert(gameKey, game);
        changeTurn(gameKey);

        return { Ok: "Card played." };
    }
);

export default play_card;
