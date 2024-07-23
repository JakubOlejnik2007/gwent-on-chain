export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'clear_game_board_store' : IDL.Func(
      [],
      [
        IDL.Variant({
          'Ok' : IDL.Text,
          'Err' : IDL.Text,
        }),
      ],
      []
    ),
    'create_game' : IDL.Func(
      [],
      [
        IDL.Variant({
          'Ok' : IDL.Text,
          'Err' : IDL.Text,
        }),
      ],
      []
    ),
    'get_my_profile' : IDL.Func(
      [],
      [
        IDL.Variant({
          'Ok' : IDL.Record({
            'avatar_url' : IDL.Text,
            'name' : IDL.Text,
            'address' : IDL.Text,
          }),
          'Err' : IDL.Text,
        }),
      ],
      ['query']
    ),
    'join_game' : IDL.Func(
      [IDL.Text],
      [
        IDL.Variant({
          'Ok' : IDL.Text,
          'Err' : IDL.Text,
        }),
      ],
      []
    ),
    'list_all_games' : IDL.Func(
      [],
      [
        IDL.Variant({
          'Ok' : IDL.Vec(IDL.Text),
          'Err' : IDL.Text,
        }),
      ],
      ['query']
    ),
    'list_games_for_user' : IDL.Func(
      [IDL.Text],
      [
        IDL.Variant({
          'Ok' : IDL.Vec(IDL.Text),
          'Err' : IDL.Text,
        }),
      ],
      ['query']
    ),
    'list_profiles' : IDL.Func(
      [],
      [
        IDL.Variant({
          'Ok' : IDL.Vec(
            IDL.Tuple(
              IDL.Text,
              IDL.Record({
                'avatar_url' : IDL.Text,
                'name' : IDL.Text,
                'address' : IDL.Text,
              })
            )
          ),
          'Err' : IDL.Text,
        }),
      ],
      ['query']
    ),
    'save_my_profile' : IDL.Func(
      [IDL.Text, IDL.Text],
      [
        IDL.Variant({
          'Ok' : IDL.Record({
            'avatar_url' : IDL.Text,
            'name' : IDL.Text,
            'address' : IDL.Text,
          }),
          'Err' : IDL.Text,
        }),
      ],
      []
    ),
  });
};

export const init = ({ IDL }) => { return [IDL.Principal]; };
