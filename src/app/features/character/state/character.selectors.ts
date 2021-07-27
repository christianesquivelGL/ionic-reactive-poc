import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  characterFeatureKey,
  CharacterState,
  characterAdapter,
} from './character.reducer';

export const selectCharacterState =
  createFeatureSelector<CharacterState>(characterFeatureKey);
const { selectAll } = characterAdapter.getSelectors();

export const getCharacterList = createSelector(
  selectCharacterState,
  (characterState: CharacterState) => selectAll(characterState.list),
);

export const selectTypesError = createSelector(
  selectCharacterState,
  (characterState: CharacterState) => characterState.error,
);
