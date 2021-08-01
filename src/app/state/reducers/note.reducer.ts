/* eslint-disable prefer-arrow/prefer-arrow-functions */
import * as fromNote from '../actions/note.actions';
import { Note } from '../interfaces/note.model';

export interface NoteState {
  data: Note[];
}
export const initialState: NoteState = {
  data: [],
};
export function reducer(
  state = initialState,
  action: fromNote.ActionsUnion,
): NoteState {
  switch (action.type) {
    case fromNote.ActionTypes.createNote: {
      return {
        ...state,
        data: [...state.data, action.payload.note],
      };
    }
    case fromNote.ActionTypes.deleteNote: {
      return {
        ...state,
        ...state.data.splice(state.data.indexOf(action.payload.note), 1),
      };
    }
    default: {
      return state;
    }
  }
}

export const getNotes = (state: NoteState) => state.data;
export const getNoteById = (state: NoteState, props: { id: string }) =>
  state.data.find((note) => note.id === props.id);
