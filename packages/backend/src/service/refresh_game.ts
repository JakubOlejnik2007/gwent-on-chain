import { StableBTreeMap } from "azle";
import { GameBoardState, PlayerData, MyData, GameMetaContextData } from "../types";

let gameBoardStore = StableBTreeMap<string, GameBoardState>(1);
export default gameBoardStore;

function fetchGameMetaContextData(gameKey: string, userId: string): GameMetaContextData | null {
    const game = gameBoardStore.get(gameKey).Some;
    if (!game) {
        return null;
    }

    const player1 = game.players[0];
    const player2 = game.players[1];

    let myData: MyData;
    let opponentData: PlayerData;

    if (player1.address === userId && player2)  {
    myData = {
        address: player1.address,
        name: player1.name,
        avatar_url: player1.avatar_url,
        units: player1.units,
        commander: player1.commander,
        rejected: player1.rejected,
        nondrawed: player1.nondrawed
    };
    opponentData = {
        address: player2.address,
        name: player2.name,
        avatar_url: player2.avatar_url,
        units: player2.units,
        commander: player2.commander,
    };
} else if (player2 && player2.address === userId) {
    myData = {
        address: player2.address,
        name: player2.name,
        avatar_url: player2.avatar_url,
        units: player2.units,
        commander: player2.commander,
        rejected: player2.rejected,
        nondrawed: player2.nondrawed
    };
    opponentData = {
        address: player1.address,
        name: player1.name,
        avatar_url: player1.avatar_url,
        units: player1.units,
        commander: player1.commander
    };
} else {
    return null;
}

    return {
        GameKey: gameKey,
        opponentData: opponentData,
        myData: myData,
        whichPlayerTurn: undefined
    };
}

function sendDataToBackend(data: GameMetaContextData) {
    console.log("Wysyłanie danych do backendu:", data);
}

const gameKey: string = "asdas";
const userId: string = "456";

setInterval(() => {
    const data = fetchGameMetaContextData(gameKey, userId);
    if (data) {
        sendDataToBackend(data);
    }
}, 2000);
