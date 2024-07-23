import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'clear_game_board_store' : ActorMethod<
    [],
    { 'Ok' : string } | { 'Err' : string }
  >,
  'create_game' : ActorMethod<
    [],
    { 'Ok' : string } | { 'Err' : string }
  >,
  'get_my_profile' : ActorMethod<
    [],
    { 'Ok' : { 'avatar_url' : string, 'name' : string, 'address' : string } } |
    { 'Err' : string }
  >,
  'join_game' : ActorMethod<
    [string],
    { 'Ok' : string } | { 'Err' : string }
  >,
  'list_all_games' : ActorMethod<
    [],
    { 'Ok' : string[] } | { 'Err' : string }
  >,
  'list_games_for_user' : ActorMethod<
    [string],
    { 'Ok' : string[] } | { 'Err' : string }
  >,
  'list_profiles' : ActorMethod<
    [],
    {
      'Ok' : Array<
        [
          string,
          { 'avatar_url' : string, 'name' : string, 'address' : string }
        ]
      >
    } | { 'Err' : string }
  >,
  'save_my_profile' : ActorMethod<
    [string, string],
    { 'Ok' : { 'avatar_url' : string, 'name' : string, 'address' : string } } |
    { 'Err' : string }
  >,
}

export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL.Type }) => IDL.Type[];
