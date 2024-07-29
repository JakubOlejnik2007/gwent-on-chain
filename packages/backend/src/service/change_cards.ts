import { ic, nat32, text, update, Variant } from "azle";
import { Player } from "../types";
import gameBoardStore from "../game_board_store";


const changeCardResponse = Variant({
    Ok: text,
    Err: text,
})

const change_cards = update([text, nat32],
    changeCardResponse,
    (gameKey: string, cardIndex: number): typeof changeCardResponse.tsType => {
        const address = ic.caller().toString();
        const game = gameBoardStore.get(gameKey).Some;

        if (!game) {
            return { Err: "No game found for the given key" };
        }
        if (game.players[1] === undefined) {
            return { Err: "No opponent found in this game" };
        }

        let playerIndex: 0 | 1;

        if (game.players[0].address === address) playerIndex = 0;
        else if (game.players[1].address === address) playerIndex = 1;
        else {
            return { Err: "Address not found in this game" };
        }

        const player = game.players[playerIndex] as Player;

        if (!player.pickable || !player.nondrawed) throw new Error("No deck found");
        if (player.ready) throw new Error("Player is already ready");

        if (!(player.cardsChanged < 2)) {
            player.ready = true;
            game.players[playerIndex] = player;
            gameBoardStore.insert(gameKey, game);
            throw new Error("Player has already changed 2 cards");
        }
        let cardsToChange = player.pickable;
        const card = player.nondrawed[cardIndex];
        let nondrawed = player.nondrawed.filter((c, index) => index !== cardIndex);
        let newCardIndex = Math.floor(Math.random() * cardsToChange.length);
        nondrawed = [...nondrawed, cardsToChange[newCardIndex]];

        cardsToChange = cardsToChange.filter((_, index) => index !== newCardIndex);

        cardsToChange.push(card);

        player.pickable = cardsToChange;

        player.pickable = cardsToChange;
        player.nondrawed = nondrawed;

        player.cardsChanged = player.cardsChanged + 1 as 0 | 1 | 2;

        game.players[playerIndex] = player;
        if (!(player.cardsChanged < 2)) {
            player.ready = true;
            game.players[playerIndex] = player;
            gameBoardStore.insert(gameKey, game);
        }
        gameBoardStore.insert(gameKey, game);
        return { Ok: "Cards are swapped" };
    }
)

export default change_cards;