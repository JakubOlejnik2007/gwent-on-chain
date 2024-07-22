import { query, text, Variant, Vec } from "azle";
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
                const isPlayerInGame = game.players.some(player => player.id === userId);
                if (isPlayerInGame) {
                    games.push(key);
                }
            }
        });

        return {Ok: games};
    }
)