import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import * as fromCharacterActions from './character.actions';

export const characterFeatureKey = 'character';

export interface CharacterState {
  list: EntityState<[]>;
  error: boolean;
}

export const characterAdapter = createEntityAdapter<any>();

export const characterInitialState: any = {
  list: characterAdapter.getInitialState(),
};

const reducer = createReducer(
  characterInitialState,
  on(fromCharacterActions.fetchCharacters, (state) => ({
    ...state,
    error: false,
  })),
  on(fromCharacterActions.fetchCharactersSuccess, (state, action) => ({
    ...state,
    list: action.characters,
    error: false,
  })),
  on(fromCharacterActions.fetchCharactersFailure, (state) => ({
    ...state,
    error: true,
  })),
);

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function characterReducer(
  state: CharacterState | undefined,
  action: Action,
): CharacterState {
  return reducer(state, action);
}
