import { StableBTreeMap, text } from "azle";
import { GameBoardState } from "./types";
const GameKey = text;

type GameKey = typeof GameKey.tsType;

let gameBoardStore = StableBTreeMap<GameKey, GameBoardState>(0);
export default gameBoardStore;