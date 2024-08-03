import { ic, text, update, Variant } from "azle";
import { GwentCard, GwentDeck, Player } from "../types";
import gameBoardStore from "../game_board_store";
import { monstersCards, nilfgaardCards, northernRealmsCards, scoiataelCards } from "../assets/gwentCards.helper";

const isGwentDeck = (deck: string): deck is GwentDeck => ["Northern Realms", "Scoia'tael", "Monsters", "Nilfgaard"].includes(deck);

const getDeckResponse = Variant({
    Ok: text,
    Err: text,
})

const get_deck = update([text, text],
    getDeckResponse,
    (gameKey: string, deck: string): typeof getDeckResponse.tsType => {
        const address = ic.caller().toString();
        const game = gameBoardStore.get(gameKey).Some;
        if (!game) {
            return { Err: "No game found for the given key" };
        }
        if (!isGwentDeck(deck)) {
            return { Err: "Invalid deck" };
        }
        if (game.players[1] === undefined) {
            return { Err: "No opponent found in this game" };
        }


        let playerIndex: 0 | 1;

        if (game.players[0].address === address) playerIndex = 0;
        else if ((game.players[1] as Player).address === address) playerIndex = 1;
        else {
            return { Err: "Address not found in this game" };
        }

        let cards: GwentCard[] = [];
        let selectedCards: GwentCard[] = [];

        const player = game.players[playerIndex] as Player;

        switch (deck) {
            case "Northern Realms": cards = northernRealmsCards; break;
            case "Monsters": cards = monstersCards; break;
            case "Nilfgaard": cards = nilfgaardCards; break;
            case "Scoia'tael": cards = scoiataelCards; break;
        }

        for (let i = 0; i < 10; i++) {
            const card = cards[Math.floor(Math.random() * cards.length)];
            selectedCards.push(card);
            cards = cards.filter(c => c !== card);
        }

        player.deck = deck;

        player.pickable = cards;
        player.nondrawed = selectedCards;
        gameBoardStore.insert(gameKey, game);
        return { Ok: "Cards are chosen" };
    }
)

export default get_deck;