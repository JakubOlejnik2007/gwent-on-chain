import { StableBTreeMap } from "azle";
import { GameBoardState } from "./types";

let gameBoardStore = StableBTreeMap<string, GameBoardState>(1);
export default gameBoardStore;