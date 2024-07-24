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

        const player: Player = {
            address: callerAddress,
            name: callerData.Some.name,
            avatar_url: callerData.Some.avatar_url,
            units: [[], [], []],
            commander: undefined,
            rejected: [],
            nondrawed: []
        };

        game.players[1] = player;

        gameBoardStore.insert(gameId, game);

        return { Ok: `Player added/updated in game ${gameId}` };
    }
);

export default join_game;
