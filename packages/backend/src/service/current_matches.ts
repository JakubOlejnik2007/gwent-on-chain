import { query, text, update, Variant, Vec } from "azle";
import gameBoardStore from "../game_board_store";

const ListGamesForUserResponse = Variant({
    Ok: Vec(text),
    Err: text
})

export type ListGamesForUserResponse = typeof ListGamesForUserResponse.tsType;

export const list_games_for_user = query(
    [text],
    ListGamesForUserResponse,
    (userId): ListGamesForUserResponse => {
        const games: string[] = [];

        gameBoardStore.keys().forEach((key: string) => {
            const game = gameBoardStore.get(key).Some;
            if (game) {
                const isPlayerInGame = game.players.some(player => player !== undefined && player.id === userId);
                if (isPlayerInGame) {
                    games.push(key);
                }
            }
        });

        return {Ok: games};
    }
)

const ListAllGamesResponse = Variant({
    Ok: Vec(text),
    Err: text
});

export type ListAllGamesResponse = typeof ListAllGamesResponse.tsType;

export const list_all_games = query(
    [],
    ListAllGamesResponse,
    () => {
        try {
            const allGames: string[] = [];

            gameBoardStore.keys().forEach((key: string) => {
                const gameOption = gameBoardStore.get(key);

                if (gameOption !== undefined) {
                    const game = gameOption.Some;
                    if (game) {
                        const object = {
                            ...game,
                            key: key
                        }
                        const jsonValue = JSON.stringify(object);

                        allGames.push(jsonValue);
                    }
                }
            });

            return { Ok: allGames };
        } catch (error) {
            return { Err: `Error listing games: ${error}` };
        }
    }
);

const ClearMapResponse = Variant({
    Ok: text,
    Err: text,
});

export const clear_game_board_store = update(
    [],
    ClearMapResponse,
    () => {
        try {
            const keys = gameBoardStore.keys();

            keys.forEach((key: string) => {
                gameBoardStore.remove(key);
            });

            return { Ok: "All entries have been cleared from the game board store." };
        } catch (error) {
            return { Err: `Error clearing the game board store: ${error}` };
        }
    }
);