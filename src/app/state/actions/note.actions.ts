import { Action } from '@ngrx/store';
import { Note } from '../interfaces/note.model';

export enum ActionTypes {
  createNote = '[Notes Service] Create note',
  deleteNote = '[Notes Service] Delete note',
}
export class CreateNote implements Action {
  readonly type = ActionTypes.createNote;
  constructor(public payload: { note: Note }) {}
}
export class DeleteNote implements Action {
  readonly type = ActionTypes.deleteNote;
  constructor(public payload: { note: Note }) {}
}
export type ActionsUnion = CreateNote | DeleteNote;
