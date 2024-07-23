import { update, text, Variant, ic } from 'azle';
import gameBoardStore from './../game_board_store';
import { GameBoardState } from '../types';
import { profileStore } from '../user_profiles';

const CreateGameResponse = Variant({
    Ok: text,
    Err: text,
  });

const create_game = update(
    [],
    CreateGameResponse,
    (): typeof CreateGameResponse.tsType => {
        const callerData = profileStore.get(ic.caller().toString());
        if (callerData.None || !callerData.Some)
            return { Err: "No profile found for the given address" };
        const gameBoardState: GameBoardState = {
            players: [
                {
                    address: ic.caller().toString(),
                    name: callerData.Some.name,
                    avatar_url: callerData.Some.avatar_url,
                    units: [[], [], []],
                    commander: undefined,
                    rejected: [],
                    nondrawed: []
                }, 
                undefined
            ],
            weatherEffectRow: []
        }
        const gameId = Math.random().toString();

        gameBoardStore.insert(gameId, gameBoardState);

        return { Ok: gameId };
    }
)

export default create_game;