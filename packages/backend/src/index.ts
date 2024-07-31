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
import get_game_state from "./service/get_game_state";
import get_deck from "./service/get_deck";
import change_readiness from "./service/change_readiness";
import change_cards from "./service/change_cards";
import play_card from "./service/play_card";
import fold from "./service/fold";

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
  join_game,
  get_game_state,
  get_deck,
  change_readiness,
  change_cards,
  play_card,
  fold
});
