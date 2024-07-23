import { Canister, Principal, init } from "azle";
import {
  SiweProviderCanister,
  initializeSiweProviderCanister,
} from "./siwe_provider";

import { get_my_profile } from "./service/get_my_profile";
import { list_profiles } from "./service/list_profiles";
import { save_my_profile } from "./service/save_my_profile";
import { clear_game_board_store, list_all_games, list_games_for_user } from "./service/current_matches";
import create_game from "./service/create_game";
import join_game from "./service/join_game";

export default Canister({
  init: init([Principal], (siweProviderPrincipal) => {
    initializeSiweProviderCanister(SiweProviderCanister(siweProviderPrincipal));
  }),

  get_my_profile,
  save_my_profile,
  list_profiles,
  list_games_for_user,
  create_game,
  list_all_games,
  clear_game_board_store,
  join_game
});
