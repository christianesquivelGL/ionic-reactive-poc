import { createAction, props } from '@ngrx/store';

export const fetchCharacters = createAction('[SWAPI] Fetch Characters');

export const fetchCharactersSuccess = createAction(
  '[SWAPI] Fetch Characters Success',
  props<{ characters: Parse.Object[] }>(),
);
export const fetchCharactersFailure = createAction(
  '[SWAPI] Fetch Characters Failiure',
);
