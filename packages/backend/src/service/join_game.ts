import { Variant, ic, text, update } from "azle";
import gameBoardStore from './../game_board_store';
import { Player } from '../types';
import { profileStore } from '../user_profiles';

const JoinGameResponse = Variant({
    Ok: text,
    Err: text,
});

const join_game = update(
    [text],
    JoinGameResponse,
    (gameId: string): typeof JoinGameResponse.tsType => {
        const callerAddress = ic.caller().toString();
        const callerData = profileStore.get(callerAddress);

        if (callerData.None || !callerData.Some) {
            return { Err: "No profile found for the given address" };
        }

        const gameOption = gameBoardStore.get(gameId);

        if (gameOption.None || !gameOption.Some) {
            return { Err: "Game not found" };
        }


        const game = gameOption.Some;

        if (callerAddress === game.players[0].address || (game.players[1] !== null && game.players[1] !== undefined && callerAddress === game.players[1].address)) return { Ok: gameId };
        if (game.players[1] !== null) throw new Error("Game already has 2 players");

        const player: Player = {
            address: callerAddress,
            name: callerData.Some.name,
            avatar_url: callerData.Some.avatar_url,
            units: [[], [], []],
            commander: undefined,
            rejected: [],
            nondrawed: [],
            pickable: [],
            ready: false,
            cardsChanged: 0,
            points: 2,
            isFolded: false,
        };

        game.players[1] = player;

        gameBoardStore.insert(gameId, game);

        return { Ok: gameId };
    }
);

export default join_game;
